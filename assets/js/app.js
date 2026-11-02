/* =====================================================================
   Event website behaviour. You normally don't need to edit this file:
   all text and photos come from content.js.
   ===================================================================== */
(function () {
  "use strict";

  var E = window.EVENT;
  if (!E) {
    document.getElementById("main").innerHTML =
      '<div class="wrap noscript"><h1>Content file not found</h1><p>The file content.js is missing or has an error. Open it in a text editor and check for a missing quote or comma near the line you last changed.</p></div>';
    return;
  }

  /* ---------- Helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var person = function (id) { return (E.people && E.people[id]) || null; };
  var paras = function (list) { return (list || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join(""); };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Times: "13:05" -> Date in event time zone
  var at = function (hhmm) { return new Date(E.date + "T" + hhmm + ":00" + (E.utcOffset || "+04:00")); };
  var fmt = function (hhmm, suffix) {
    var p = hhmm.split(":"), h = +p[0], m = p[1];
    var t = (h % 12 || 12) + ":" + m;
    return suffix === false ? t : t + (h >= 12 ? " PM" : " AM");
  };
  var range = function (a, b) {
    var samePeriod = (+a.slice(0, 2) >= 12) === (+b.slice(0, 2) >= 12);
    return (samePeriod ? fmt(a, false) : fmt(a)) + " – " + fmt(b);
  };
  var initials = function (name) {
    var clean = String(name).split(",")[0].replace(/^(Dr|Prof|Professor|Ms|Mr|Mrs|Eng)\.?\s+/i, "").trim().split(/\s+/);
    return ((clean[0] || "")[0] + (clean.length > 1 ? clean[clean.length - 1][0] : "")).toUpperCase();
  };
  var avatar = function (p, opts) {
    opts = opts || {};
    if (p.photo && !opts.monogram) {
      return '<img src="' + esc(p.photo) + '" alt="' + esc(opts.alt != null ? opts.alt : "") + '" loading="lazy" decoding="async">';
    }
    return '<span class="monogram" aria-hidden="true">' + esc(initials(p.name)) + "</span>";
  };

  var ICONS = {
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 13l2 2 4-4"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>',
    screen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8M7 12l3-3 2 2 4-4"/></svg>',
    people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.4"/><path d="M3 19.5c.6-3.4 3-5.2 6-5.2s5.4 1.8 6 5.2M15.5 14.6c2.6-.3 4.8 1.2 5.5 4.4"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 9V3h10v6M7 17H4.5A1.5 1.5 0 0 1 3 15.5v-5A1.5 1.5 0 0 1 4.5 9h15a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H17"/><rect x="7" y="14" width="10" height="7"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5L9 4zM9 4v13.5M15 6.5V20"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    google: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M12 13v4M10 15h4"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>'
  };

  /* ---------- Derived data ---------- */
  var keynoteItems = [];
  (E.agenda || []).forEach(function (s) {
    (s.items || []).forEach(function (it) { if (it.keynote) keynoteItems.push(it); });
  });
  var panel = E.panel || null;
  var panelIds = panel ? (panel.panelists || []) : [];

  // People who have a biography, in page order: keynote speakers, then panelists
  var bioOrder = [];
  keynoteItems.forEach(function (it) { (it.people || []).forEach(function (id) { if (bioOrder.indexOf(id) < 0) bioOrder.push(id); }); });
  panelIds.forEach(function (id) { if (bioOrder.indexOf(id) < 0) bioOrder.push(id); });
  bioOrder = bioOrder.filter(function (id) { var p = person(id); return p && p.bio && p.bio.length; });

  var hasReg = !!(E.registration && E.registration.url);
  var hasContact = !!(E.contact && E.contact.email);

  /* ---------- Calendar ---------- */
  var pageUrl = function () { return location.protocol.indexOf("http") === 0 ? location.href.split("#")[0] : ""; };
  var utcStamp = function (d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); };
  var location_ = [E.venue && E.venue.name, E.venue && E.venue.detail, E.host && E.host.name].filter(Boolean).join(", ");
  var calDetails = function () {
    var lines = [E.organizedBy || ""];
    if (pageUrl()) lines.push("Agenda and speakers: " + pageUrl());
    return lines.filter(Boolean).join("\n");
  };
  var googleCalUrl = function () {
    var q = new URLSearchParams({
      action: "TEMPLATE",
      text: E.title,
      dates: utcStamp(at(E.start)) + "/" + utcStamp(at(E.end)),
      details: calDetails(),
      location: location_
    });
    return "https://calendar.google.com/calendar/render?" + q.toString();
  };
  var icsEscape = function (s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); };
  var icsFold = function (line) {
    var out = [], s = line;
    while (s.length > 74) { out.push(s.slice(0, 74)); s = " " + s.slice(74); }
    out.push(s);
    return out.join("\r\n");
  };
  var downloadIcs = function () {
    var slug = E.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    var lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Event website//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:" + E.date.replace(/-/g, "") + "-" + slug + "@" + (location.hostname || "event.local"),
      "DTSTAMP:" + utcStamp(new Date()),
      "DTSTART:" + utcStamp(at(E.start)),
      "DTEND:" + utcStamp(at(E.end)),
      "SUMMARY:" + icsEscape(E.title),
      "LOCATION:" + icsEscape(location_),
      "DESCRIPTION:" + icsEscape(calDetails())
    ];
    if (pageUrl()) lines.push("URL:" + pageUrl());
    lines.push("END:VEVENT", "END:VCALENDAR");
    var blob = new Blob([lines.map(icsFold).join("\r\n") + "\r\n"], { type: "text/calendar;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = slug + ".ics";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };
  var calMenu = function (extraClass) {
    return '<details class="cal-menu">' +
      '<summary class="btn ' + (extraClass || "") + '">' + ICONS.calendar + "Add to calendar</summary>" +
      '<div class="cal-pop">' +
        '<a href="' + esc(googleCalUrl()) + '" target="_blank" rel="noopener">' + ICONS.google + "<span>Google Calendar<small>Opens in a new tab</small></span></a>" +
        '<button type="button" data-ics>' + ICONS.download + "<span>Outlook, Apple or other<small>Downloads a calendar file (.ics)</small></span></button>" +
      "</div></details>";
  };

  /* ---------- Navigation ---------- */
  function renderNav() {
    var links = [
      ["about", "About"], ["agenda", "Agenda"],
      keynoteItems.length ? ["speakers", "Speakers"] : null,
      panel ? ["panel", "Panel"] : null,
      ["organizers", "Organizers"],
      hasReg ? ["register", "Register"] : null,
      ["venue", hasContact ? "Venue & contact" : "Venue"]
    ].filter(Boolean);
    $("#nav-list").innerHTML = links.map(function (l) {
      return '<li><a href="#' + l[0] + '">' + esc(l[1]) + "</a></li>";
    }).join("");
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    var host = E.host || {};
    var lines = String(E.heroTitle || E.title).split("\n").map(function (l) { return '<span class="line">' + esc(l) + "</span>"; }).join("");
    var html = "";
    if (host.showLogo && host.logo) {
      html += '<div class="hero-host"><img src="' + esc(host.logo) + '" alt="' + esc(host.name) + '" width="230" height="56"></div>';
    }
    html += '<h1 id="hero-title" class="hero-title">' + lines + "</h1>";
    html += '<div><span class="hero-rule" aria-hidden="true"></span><p class="hero-org">' + esc(E.organizedBy) + "</p></div>";
    var fact = function (icon, label, value) {
      return '<li><span class="fact-icon">' + icon + '</span><span class="fact-label">' + label + '</span><span class="fact-value">' + esc(value) + "</span></li>";
    };
    html += '<ul class="hero-facts">' +
      fact(ICONS.calendar, "Date", E.dateLabel) +
      fact(ICONS.clock, "Time", E.timeLabel) +
      fact(ICONS.pin, "Venue", [E.venue.name, E.venue.detail].filter(Boolean).join(", ")) +
      "</ul>";
    html += '<div class="hero-actions">' +
      (hasReg ? '<a class="btn btn-primary" href="' + esc(E.registration.url) + '" target="_blank" rel="noopener">' + esc(E.registration.label || "Register") + "</a>" : "") +
      '<a class="btn ' + (hasReg ? "" : "btn-primary") + '" href="#agenda">View the agenda</a>' +
      calMenu() + "</div>";
    html += '<div class="countdown" id="countdown"></div>';
    $("#hero-content").innerHTML = html;
  }

  /* ---------- Countdown and live agenda ---------- */
  function updateTime() {
    var now = Date.now(), start = at(E.start).getTime(), end = at(E.end).getTime();
    var el = $("#countdown");
    if (el) {
      if (now < start) {
        var diff = start - now, d = Math.floor(diff / 864e5), h = Math.floor(diff % 864e5 / 36e5), m = Math.floor(diff % 36e5 / 6e4);
        var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
        el.innerHTML = '<span>Starts in</span><span class="countdown-units" role="text" aria-label="' + d + " days, " + h + " hours, " + m + ' minutes">' +
          "<span><b>" + pad(d) + "</b>" + (d === 1 ? "day" : "days") + "</span>" +
          "<span><b>" + pad(h) + "</b>" + (h === 1 ? "hour" : "hours") + "</span>" +
          "<span><b>" + pad(m) + "</b>min</span></span>";
      } else if (now < end) {
        el.innerHTML = '<span class="live-pill">Happening now</span><a href="#agenda">See what\'s on</a>';
      } else {
        el.innerHTML = "<span>This forum took place on " + esc(E.dateLabel) + ". Thank you to everyone who joined.</span>";
      }
    }
    var during = now >= start && now < end;
    $$(".item[data-start]").forEach(function (li) {
      var s = at(li.dataset.start).getTime(), e = at(li.dataset.end).getTime();
      var live = now >= s && now < e;
      li.classList.toggle("is-live", live);
      li.classList.toggle("is-past", during && now >= e);
      var badge = $(".now-badge", li);
      if (live && !badge) { $(".item-title", li).insertAdjacentHTML("beforeend", '<span class="now-badge">Now</span>'); }
      if (!live && badge) badge.remove();
    });
  }

  /* ---------- About ---------- */
  function renderAbout() {
    var glance = E.glance || [];
    var html = '<div class="wrap"><div class="about-grid">' +
      '<h2 id="about-title" class="h2">About the forum</h2>' +
      '<div class="prose">' + paras(E.about) + "</div></div>";
    if (glance.length) {
      html += '<figure class="glance"><figcaption class="glance-cap">The day at a glance</figcaption>' +
        '<ol class="glance-rail" style="--n:' + glance.length + '">' +
        glance.map(function (g) { return '<li><time datetime="' + E.date + "T" + g.time + '">' + fmt(g.time) + "</time><span>" + esc(g.label) + "</span></li>"; }).join("") +
        "</ol></figure>";
    }
    html += "</div>";
    $("#about").innerHTML = html;
  }

  /* ---------- Agenda ---------- */
  function whoHtml(it) {
    var rows = (it.people || []).map(function (id) {
      var p = person(id); if (!p) return "";
      return '<span class="who-row"><span class="who-name">' + esc(p.name) + "</span>" +
        (it.who ? "" : (p.role ? '<span class="role">' + esc(p.role) + "</span>" : "")) + "</span>";
    }).join("");
    if (it.who) rows += '<span class="who-row role">' + esc(it.who) + "</span>";
    return rows ? '<p class="item-who">' + rows + "</p>" : "";
  }

  function keynoteHtml(it, idx) {
    var p = person((it.people || [])[0]) || { name: "" };
    var aid = "abs-" + idx;
    return '<div class="kn-person">' + (p.photo ? avatar(p) : "") +
      '<div><p class="kn-name">' + esc(p.name) + '</p><p class="role">' + esc(p.role || "") + "</p></div></div>" +
      '<p class="kn-title item-title">' + esc(it.title) + "</p>" +
      '<div class="item-actions">' +
        (it.abstract && it.abstract.length ? '<details class="abstract" id="' + aid + '"><summary class="link-btn">Read abstract ' + ICONS.chev + '</summary><div class="prose">' + paras(it.abstract) + "</div></details>" : "") +
        (p.bio && p.bio.length ? '<button type="button" class="link-btn" data-person="' + esc(it.people[0]) + '">Speaker biography</button>' : "") +
      "</div>";
  }

  function renderAgenda() {
    var k = 0;
    var sessions = (E.agenda || []).map(function (s) {
      var items = s.items || [];
      var first = items[0], last = items[items.length - 1];
      var head = '<header class="session-head"><div class="session-head-inner">' +
        '<span class="session-icon">' + (ICONS[s.icon] || ICONS.calendar) + "</span>" +
        '<h3 class="session-title">' + esc(s.title) + "</h3>" +
        (first ? '<p class="session-time">' + range(first.start, last.end) + "</p>" : "") +
        "</div></header>";

      var body = "";
      if (s.id === "panel" && panel && panel.theme) {
        body += '<div class="panel-theme-row"><p class="label">Panel theme</p><p class="theme">' + esc(panel.theme) + "</p></div>";
      }
      body += '<ol class="items-list">' + items.map(function (it) {
        var main = it.keynote ? keynoteHtml(it, k++) :
          '<p class="item-title">' + esc(it.title) + "</p>" +
          (it.detail ? '<p class="item-detail">' + esc(it.detail) + "</p>" : "") + whoHtml(it);
        return '<li class="item' + (it.keynote ? " item-keynote" : "") + '" data-start="' + it.start + '" data-end="' + it.end + '">' +
          '<p class="item-time"><time datetime="' + E.date + "T" + it.start + '">' + range(it.start, it.end) + "</time></p>" +
          '<div class="item-main">' + main + "</div></li>";
      }).join("") + "</ol>";

      if (s.id === "panel" && panelIds.length) {
        body += '<div class="panelist-strip"><p class="label">Panelists, in speaking order</p><ol>' +
          panelIds.map(function (id, i) {
            var p = person(id); if (!p) return "";
            return '<li><span class="order-badge">' + (i + 1) + "</span>" + avatar(p) +
              '<span><span class="name">' + esc(p.name) + '</span><br><span class="role">' + esc(p.org || p.role) + "</span></span></li>";
          }).join("") + "</ol></div>";
      }
      return '<article class="session" id="session-' + esc(s.id) + '" aria-labelledby="session-' + esc(s.id) + '-t">' +
        head.replace('class="session-title"', 'class="session-title" id="session-' + esc(s.id) + '-t"') +
        '<div class="items">' + body + "</div></article>";
    }).join("");

    $("#agenda").innerHTML = '<div class="wrap">' +
      '<div class="section-head"><div><h2 id="agenda-title" class="h2">Agenda</h2>' +
      '<p class="lede">' + esc(E.dateLabel) + ". All times are UAE time (GST, UTC+4).</p></div>" +
      '<div class="agenda-tools">' + calMenu() +
      '<button type="button" class="btn" data-print>' + ICONS.print + "Print agenda</button></div></div>" +
      '<div class="sessions">' + sessions + "</div></div>";
    $("#agenda").setAttribute("data-print-title", E.title + " — " + E.dateLabel);
  }

  /* ---------- Keynote speakers ---------- */
  function renderSpeakers() {
    if (!keynoteItems.length) { $("#speakers").hidden = true; return; }
    var cards = keynoteItems.map(function (it) {
      var id = (it.people || [])[0], p = person(id); if (!p) return "";
      var clickable = p.bio && p.bio.length;
      return '<li class="speaker-card">' +
        '<figure class="speaker-photo">' + avatar(p, { alt: "Portrait of " + p.name }) + "</figure>" +
        '<div class="speaker-meta">' +
          '<p class="speaker-time"><time datetime="' + E.date + "T" + it.start + '">' + fmt(it.start) + "</time></p>" +
          '<h3 class="speaker-name">' + (clickable ? '<button type="button" data-person="' + esc(id) + '">' + esc(p.name) + "</button>" : esc(p.name)) + "</h3>" +
          '<p class="role">' + esc(p.role) + "</p>" +
          '<p class="speaker-talk">' + esc(it.title) + "</p>" +
          (clickable ? '<span class="speaker-more" aria-hidden="true">Biography and abstract</span>' : "") +
        "</div></li>";
    }).join("");
    $("#speakers").innerHTML = '<div class="wrap">' +
      '<div class="section-head"><div><h2 id="speakers-title" class="h2">Keynote speakers</h2>' +
      '<p class="lede">' + keynoteItems.length + " keynote talks, " + range(keynoteItems[0].start, keynoteItems[keynoteItems.length - 1].end) + ". Select a speaker to read the biography and talk abstract.</p></div></div>" +
      '<ol class="speaker-grid">' + cards + "</ol></div>";
  }

  /* ---------- Panel ---------- */
  function ppHtml(id, opts) {
    var p = person(id); if (!p) return "";
    var clickable = p.bio && p.bio.length;
    return '<div class="pp">' +
      '<div class="pp-photo">' + avatar(p, { alt: "Portrait of " + p.name }) + (opts.order ? '<span class="order-badge" aria-label="Speaking order ' + opts.order + '">' + opts.order + "</span>" : "") + "</div>" +
      '<p class="pp-name">' + (clickable ? '<button type="button" data-person="' + esc(id) + '">' + esc(p.name) + "</button>" : esc(p.name)) + "</p>" +
      '<p class="pp-role">' + esc(p.role) + "</p>" +
      (clickable ? '<span class="pp-more" aria-hidden="true">Biography</span>' : "") +
      "</div>";
  }
  function renderPanel() {
    if (!panel) { $("#panel").hidden = true; return; }
    var rounds = (panel.rounds || []).map(function (r) {
      var parts = String(r.title).split(":");
      var n = parts.length > 1 ? parts.shift().trim() : "";
      return "<li>" + (n ? '<span class="round-n">' + esc(n) + "</span>" : "") +
        '<h3 class="round-title">' + esc(parts.join(":").trim()) + "</h3>" +
        '<p class="round-text">' + esc(r.text) + "</p>" +
        '<time class="round-time" datetime="' + E.date + "T" + r.start + '">' + range(r.start, r.end) + "</time></li>";
    }).join("");
    var html = '<svg class="network bg-network" id="panel-network" aria-hidden="true" preserveAspectRatio="xMidYMid slice"></svg>' +
      '<div class="wrap">' +
      '<h2 id="panel-title" class="panel-heading"><span class="panel-kicker">Panel discussion, <span class="tnum">' + range(panel.start, panel.end) + "</span></span>" +
      '<span class="panel-theme">' + esc(panel.theme) + "</span></h2>" +
      (rounds ? '<ol class="rounds">' + rounds + "</ol>" : "") +
      '<div class="panel-people">' +
        (panel.moderator ? '<div class="moderator"><p class="group-label">Moderator</p>' + ppHtml(panel.moderator, {}) + "</div>" : "") +
        '<div><p class="group-label">Panelists, in speaking order</p><ol class="panelists">' +
          panelIds.map(function (id, i) { return "<li>" + ppHtml(id, { order: i + 1 }) + "</li>"; }).join("") +
        "</ol></div></div></div>";
    $("#panel").innerHTML = html;
  }

  /* ---------- Organizers ---------- */
  function renderOrganizers() {
    var list = (E.organizers || []).map(function (id) {
      var p = person(id); if (!p) return "";
      return "<li>" + avatar(p, { monogram: true }) +
        '<div><p class="org-name">' + esc(p.name) + '</p><p class="role">' + esc(p.role) + "</p></div></li>";
    }).join("");
    $("#organizers").innerHTML = '<div class="wrap org-grid">' +
      '<div><h2 id="organizers-title" class="h2">Organizing committee</h2>' +
      '<p class="org-units">' + esc(E.organizedBy) + "</p></div>" +
      '<ul class="org-list">' + list + "</ul></div>";
  }

  /* ---------- Registration ---------- */
  function renderRegister() {
    if (!hasReg) return;
    var r = E.registration;
    var sec = $("#register");
    sec.hidden = false;
    sec.innerHTML = '<div class="wrap register-inner"><div>' +
      '<h2 id="register-title" class="h2">Registration</h2>' +
      (r.note ? '<p class="lede">' + esc(r.note) + "</p>" : "") + "</div>" +
      '<a class="btn btn-primary" href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.label || "Register") + "</a></div>";
  }

  /* ---------- Venue and contact ---------- */
  function renderVenue() {
    var v = E.venue || {};
    var reg = null;
    (E.agenda || []).some(function (s) { return (s.items || []).some(function (it) { if (/registration/i.test(it.title)) { reg = it; return true; } return false; }); });
    var facts = '<div><dt>Date</dt><dd>' + esc(E.dateLabel) + "</dd></div>" +
      "<div><dt>Time</dt><dd>" + esc(E.timeLabel) + " (UAE time)</dd></div>" +
      (reg ? "<div><dt>" + esc(reg.title) + "</dt><dd>" + range(reg.start, reg.end) + "</dd></div>" : "");
    if (hasContact) {
      facts += "<div><dt>Contact</dt><dd><a href=\"mailto:" + esc(E.contact.email) + '">' + esc(E.contact.email) + "</a>" +
        (E.contact.note ? '<p class="role">' + esc(E.contact.note) + "</p>" : "") + "</dd></div>";
    }
    $("#venue").innerHTML = '<div class="wrap venue-grid"><div>' +
      '<h2 id="venue-title" class="venue-h">' + (hasContact ? "Venue and contact" : "Venue") + "</h2>" +
      '<p class="venue-name">' + esc(v.name) + "</p>" +
      (v.detail ? '<p class="venue-detail">' + esc(v.detail) + "</p>" : "") +
      (E.host && E.host.name ? '<p class="venue-host">' + esc(E.host.name) + "</p>" : "") +
      '<div class="venue-actions">' +
        (v.mapUrl ? '<a class="btn" href="' + esc(v.mapUrl) + '" target="_blank" rel="noopener">' + ICONS.map + "Open in Google Maps</a>" : "") +
        calMenu() +
        (hasContact ? '<a class="btn" href="mailto:' + esc(E.contact.email) + '">' + ICONS.mail + "Email the organizers</a>" : "") +
      "</div></div>" +
      '<dl class="venue-facts">' + facts + "</dl></div>";
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var d = E.date.split("-");
    $("#footer").innerHTML = '<div class="footer-band">' +
      '<div class="footer-main"><p class="footer-title">' + esc(E.title) + "</p>" +
      '<p class="footer-org">' + esc(E.organizedBy) + "</p></div>" +
      '<p class="footer-date" aria-label="' + esc(E.dateLabel) + '">' + d[2] + " • " + d[1] + " • " + d[0] + "</p></div>" +
      '<div class="wrap footer-note"><p>' + esc(E.disclaimer || "") + '</p><a href="#home">Back to top</a></div>';
  }

  /* ---------- Network motif (SVG) ---------- */
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  function buildNetwork(svg, opts) {
    if (!svg) return null;
    var W = opts.w, H = opts.h, r = rng(opts.seed), pts = [], tries = 0;
    while (pts.length < opts.n && tries < 5000) {
      tries++;
      var p = { x: 30 + r() * (W - 60), y: 30 + r() * (H - 60) };
      if (pts.every(function (q) { return Math.hypot(p.x - q.x, p.y - q.y) > opts.min; })) pts.push(p);
    }
    var edges = {}, list = [];
    pts.forEach(function (p, i) {
      var near = pts.map(function (q, j) { return { j: j, d: Math.hypot(p.x - q.x, p.y - q.y) }; })
        .filter(function (o) { return o.j !== i; }).sort(function (a, b) { return a.d - b.d; }).slice(0, opts.k);
      near.forEach(function (o) {
        if (o.d > opts.maxEdge) return;
        var key = Math.min(i, o.j) + "-" + Math.max(i, o.j);
        if (!edges[key]) { edges[key] = 1; list.push([i, o.j]); }
      });
    });
    // Farthest-point sampling for highlighted nodes
    var hubs = [];
    if (opts.hubs) {
      var inner = pts.map(function (p, i) { return i; }).filter(function (i) {
        var p = pts[i]; return p.x > W * (opts.hubMinX || .14) && p.x < W * .94 && p.y > H * .1 && p.y < H * .9;
      });
      hubs.push(inner[Math.floor(r() * inner.length)]);
      while (hubs.length < opts.hubs && hubs.length < inner.length) {
        var best = -1, bestD = -1;
        inner.forEach(function (i) {
          if (hubs.indexOf(i) >= 0) return;
          var d = Math.min.apply(null, hubs.map(function (h) { return Math.hypot(pts[i].x - pts[h].x, pts[i].y - pts[h].y); }));
          if (d > bestD) { bestD = d; best = i; }
        });
        hubs.push(best);
      }
    }
    var origin = opts.origin || { x: W, y: 0 };
    var delay = function (p) { return (Math.hypot(p.x - origin.x, p.y - origin.y) / Math.hypot(W, H) * 1.2).toFixed(2); };
    var ns = "http://www.w3.org/2000/svg";
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    var g = "";
    list.forEach(function (e) {
      var a = pts[e[0]], b = pts[e[1]];
      g += '<line class="edge" pathLength="1" x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.x.toFixed(1) + '" y2="' + b.y.toFixed(1) + '" style="--d:' + delay(a) + 's"/>';
    });
    pts.forEach(function (p, i) {
      if (hubs.indexOf(i) >= 0) return;
      var big = r() < .22;
      g += '<circle class="dot' + (big ? " big" : "") + '" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + (big ? 5 : 3.4) + '" style="--d:' + (+delay(p) + .3).toFixed(2) + 's"/>';
    });
    hubs.forEach(function (i, n) {
      var p = pts[i];
      g += '<g class="hub" data-hub="' + n + '" style="--d:' + (+delay(p) + .55).toFixed(2) + 's">' +
        '<circle class="hub-ring" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="16"/>' +
        '<circle class="hub-core" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="7.5"/></g>';
    });
    svg.innerHTML = g;
    void ns;
    return { pts: pts, hubs: hubs };
  }

  function initHeroNetwork() {
    var svg = $("#hero-network"), wrap = $(".hero"), tip = $("#node-tip");
    // Highlighted (red) nodes represent the forum's speakers and panelists
    var featured = bioOrder.slice();
    var net = buildNetwork(svg, { w: 900, h: 760, n: 46, min: 64, k: 3, maxEdge: 210, seed: 1111, hubs: featured.length, hubMinX: .42, origin: { x: 900, y: 0 } });
    if (!net) return;
    if (!reduceMotion) svg.classList.add("animate");
    $$(".hub", svg).forEach(function (g) {
      var id = featured[+g.dataset.hub], p = person(id);
      if (!p) return;
      g.addEventListener("pointerenter", function () {
        var c = g.querySelector(".hub-core").getBoundingClientRect(), b = wrap.getBoundingClientRect();
        tip.innerHTML = (p.photo ? '<img src="' + esc(p.photo) + '" alt="">' : "") + "<div><strong>" + esc(p.name) + "</strong><span>" + esc(p.org || "") + "</span></div>";
        tip.hidden = false;
        var half = tip.offsetWidth / 2, x = c.left + c.width / 2 - b.left;
        tip.style.left = Math.max(half + 8, Math.min(x, b.width - half - 8)) + "px";
        tip.style.top = (c.top - b.top) + "px";
      });
      g.addEventListener("pointerleave", function () { tip.hidden = true; });
      g.addEventListener("click", function () { tip.hidden = true; openPerson(id); });
    });
  }

  /* ---------- Person dialog ---------- */
  var dlg = $("#person-dialog"), current = -1;
  function talksFor(id) {
    return keynoteItems.filter(function (it) { return (it.people || []).indexOf(id) >= 0; });
  }
  function openPerson(id, fromHash) {
    var p = person(id); if (!p || !dlg) return;
    current = bioOrder.indexOf(id);
    var tags = "";
    var talks = talksFor(id);
    if (talks.length) tags += '<span class="tag">Keynote speaker</span>';
    if (panelIds.indexOf(id) >= 0) tags += '<span class="tag navy">Panelist</span>';
    var html = '<div class="dlg-grid">' +
      '<figure class="dlg-photo">' + (p.photo ? '<img src="' + esc(p.photo) + '" alt="Portrait of ' + esc(p.name) + '">' : "") + "</figure>" +
      '<div class="dlg-text">' +
        (tags ? '<p class="dlg-tags">' + tags + "</p>" : "") +
        '<h2 id="dlg-name" class="dlg-name">' + esc(p.name) + "</h2>" +
        '<p class="dlg-role">' + esc(p.role) + "</p>" +
        (p.also && p.also.length ? '<ul class="dlg-also">' + p.also.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul>" : "");
    talks.forEach(function (t) {
      html += '<section class="dlg-block"><h3>Keynote talk, ' + range(t.start, t.end) + "</h3>" +
        '<p class="dlg-talk-title">' + esc(t.title) + "</p>" +
        (t.abstract ? '<div class="prose">' + paras(t.abstract) + "</div>" : "") + "</section>";
    });
    if (panel && panelIds.indexOf(id) >= 0) {
      html += '<section class="dlg-block"><h3>Panel discussion, ' + range(panel.start, panel.end) + "</h3>" +
        '<p class="dlg-talk-title">' + esc(panel.theme) + "</p></section>";
    }
    if (p.bio && p.bio.length) html += '<section class="dlg-block"><h3>Biography</h3><div class="prose">' + paras(p.bio) + "</div></section>";
    html += "</div></div>";
    $("#dlg-body").innerHTML = html;
    $("#dlg-body").scrollTop = 0;
    $("#dlg-count").textContent = current >= 0 ? (current + 1) + " of " + bioOrder.length : "";
    $$(".dlg-nav [data-step]").forEach(function (b) { b.hidden = current < 0 || bioOrder.length < 2; });
    if (!dlg.open) {
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    }
    if (!fromHash && history.replaceState) history.replaceState(null, "", "#people/" + id);
  }
  function closePerson() {
    if (dlg.open) { if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open"); }
  }
  if (dlg) {
    dlg.addEventListener("close", function () {
      if (/^#people\//.test(location.hash) && history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    });
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) closePerson();                       // click on backdrop
      if (e.target.closest("[data-close]")) closePerson();
      var step = e.target.closest("[data-step]");
      if (step && current >= 0) {
        var n = (current + (+step.dataset.step) + bioOrder.length) % bioOrder.length;
        openPerson(bioOrder[n]);
      }
    });
    dlg.addEventListener("keydown", function (e) {
      if (current < 0) return;
      if (e.key === "ArrowRight") openPerson(bioOrder[(current + 1) % bioOrder.length]);
      if (e.key === "ArrowLeft") openPerson(bioOrder[(current - 1 + bioOrder.length) % bioOrder.length]);
    });
  }

  /* ---------- Global interactions ---------- */
  function bindEvents() {
    document.addEventListener("click", function (e) {
      var pb = e.target.closest("[data-person]");
      if (pb) { e.preventDefault(); openPerson(pb.dataset.person); return; }
      if (e.target.closest("[data-ics]")) { downloadIcs(); var m = e.target.closest("details"); if (m) m.open = false; return; }
      if (e.target.closest("[data-print]")) {
        document.body.classList.add("print-agenda");
        $$(".abstract").forEach(function (d) { d.dataset.wasOpen = d.open; });
        window.print();
        return;
      }
      // Close any open calendar menu when clicking elsewhere
      $$(".cal-menu[open]").forEach(function (d) { if (!d.contains(e.target)) d.open = false; });
    });
    window.addEventListener("afterprint", function () { document.body.classList.remove("print-agenda"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") $$(".cal-menu[open]").forEach(function (d) { d.open = false; d.querySelector("summary").focus(); });
    });

    // Mobile menu
    var toggle = $(".nav-toggle"), list = $("#nav-list");
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      list.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
    list.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && list.classList.contains("is-open")) { setMenu(false); toggle.focus(); } });

    // Header border once scrolled
    var header = $(".site-header");
    var onScroll = function () { header.classList.toggle("is-stuck", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

    // Highlight the current section in the menu
    if ("IntersectionObserver" in window) {
      var links = {};
      $$("#nav-list a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
          if (links[en.target.id]) links[en.target.id].setAttribute("aria-current", "true");
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }

    // Open a biography from a shared link such as  .../#people/tarabalka
    var m = location.hash.match(/^#people\/([\w-]+)/);
    if (m && person(m[1])) openPerson(m[1], true);
  }

  /* ---------- Structured data for search engines ---------- */
  function addStructuredData() {
    var performers = bioOrder.map(function (id) { var p = person(id); return { "@type": "Person", name: p.name.replace(/,.*$/, ""), jobTitle: p.role }; });
    var data = {
      "@context": "https://schema.org", "@type": "Event",
      name: E.title,
      startDate: E.date + "T" + E.start + ":00" + E.utcOffset,
      endDate: E.date + "T" + E.end + ":00" + E.utcOffset,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: { "@type": "Place", name: [E.venue.name, E.venue.detail].filter(Boolean).join(", "), address: E.host && E.host.name },
      description: (E.about || [])[0] || "",
      organizer: { "@type": "Organization", name: E.host && E.host.name },
      performer: performers
    };
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ---------- Go ---------- */
  document.title = E.title + " | " + E.dateLabel.replace(/^\w+,\s*/, "");
  renderNav();
  renderHero();
  renderAbout();
  renderAgenda();
  renderSpeakers();
  renderPanel();
  renderOrganizers();
  renderRegister();
  renderVenue();
  renderFooter();
  initHeroNetwork();
  buildNetwork($("#panel-network"), { w: 900, h: 640, n: 34, min: 70, k: 3, maxEdge: 220, seed: 2026, hubs: 0 });
  updateTime();
  setInterval(updateTime, 30000);
  bindEvents();
  addStructuredData();
})();

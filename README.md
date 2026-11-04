# 3rd Women in AI Forum — event website

The website for the 3rd Women in AI Forum (Wednesday, 11 November 2026, ADU Auditorium, Abu Dhabi Campus).

It is a plain HTML, CSS and JavaScript site with no build step, hosted free on GitHub Pages.

## Change the content

All text on the site comes from one file, **`content.js`**. To edit it on GitHub:

1. Click `content.js` in the file list.
2. Click the pencil icon (Edit this file).
3. Change the text between the quotes. Keep the quotes and the commas at the line ends.
4. Click **Commit changes…**, then **Commit changes**.
5. Wait about a minute and refresh the website.

| To change… | Look for this in `content.js` |
|---|---|
| Date, time, venue | `dateLabel`, `timeLabel`, `start`, `end`, `venue` |
| About text | `about` |
| A speaker's name, role or biography | `people` → the speaker's id (for example `tarabalka`) |
| Agenda times and titles | `agenda` |
| Panel theme, moderator, panelists | `panel` |
| Registration link and QR code | `registration.url` (the QR code is made from this link automatically; empty hides registration) |
| "Past events" menu link | `pastEvents.url` (points to the hub's past-events page) |
| Contact email | `contact.email` (hidden while empty) |
| University logo on or off | `host.showLogo` (`true` or `false`) |
| Footer notice | `disclaimer` |

If the page goes blank after an edit, a quote or comma is missing near the line you changed. Open the file's history (the clock icon) to compare with the previous version, or undo the commit.

## Replace a photo

Photos are in `assets/img/people/`. Use a portrait image (ratio 4:5, about 640 × 800 px, JPG under 150 KB).

* **Same file name:** click **Add file → Upload files** inside that folder and upload the new photo with the same name. It replaces the old one.
* **New file name:** upload it, then update the `photo:` path for that person in `content.js`.

## Folder structure

```
women-in-ai-forum-2026/
├── index.html            Page layout (rarely needs editing)
├── content.js            ← all event text: edit this
├── favicon.svg           Browser tab icon
├── .nojekyll             Tells GitHub Pages to serve files as they are
├── assets/
│   ├── css/styles.css    Colours, fonts, layout
│   ├── js/app.js         Builds the page from content.js; countdown, calendar, live agenda
│   ├── js/qrcode.min.js  Makes the registration QR code (MIT licence)
│   ├── fonts/            Archivo font (SIL Open Font License)
│   └── img/
│       ├── brand/adu-logo.png
│       ├── og-image.png  Preview image for links shared on WhatsApp, LinkedIn, Teams
│       └── people/       Speaker, panelist and moderator photos
└── README.md             This file
```

## Preview on your computer

* **Quickest:** double-click `index.html`. Everything works, but the browser shows a system font instead of Archivo (browsers block local font files).
* **Exact preview:** in Visual Studio Code, install the *Live Server* extension, open this folder and click **Go Live**. Or, in a terminal inside this folder, run `python -m http.server 8000` and open `http://localhost:8000`.

## Built-in features

* Registration section with a QR code, a Register button in the menu, and a Register button at the top. They hide themselves after the event ends
* Countdown to the start time, then "Happening now" during the event and a thank-you line afterwards
* On the event day, the agenda highlights the session that is running (UAE time)
* Add to calendar (Google Calendar, or a .ics file for Outlook and Apple Calendar)
* Print agenda button (prints only the agenda)
* Biography pop-ups with Previous and Next; each has its own link, for example `…/#people/tarabalka`
* The red dots in the opening network graphic are the speakers and panelists; hover to see who, click to open the biography
* Works on phones, tablets and desktops; respects "reduce motion" settings; keyboard accessible

## Reuse this site for another event

In **Settings → General**, tick **Template repository**. For a new event, click **Use this template → Create a new repository**, name it (for example `women-in-ai-forum-2027`), replace `content.js` details and the photos, then turn on GitHub Pages for the new repository.

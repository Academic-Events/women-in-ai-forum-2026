/* =====================================================================
   EVENT CONTENT FILE  —  this is the only file you need to edit
   ---------------------------------------------------------------------
   Everything shown on the website (names, times, bios, talks) comes
   from this file. Change the text between the quotes, save, refresh.

   Simple rules
   • Keep the quotes "..." around text. If your text contains a double
     quote, write it as \"  (or use curly quotes “ ”).
   • Keep the commas at the end of lines inside lists and objects.
   • Times use 24-hour format "HH:MM" (e.g. "13:05" = 1:05 PM).
   • Leave a value as "" (empty) to hide that part of the website.
   • Photos live in  assets/img/people/  — use a portrait (4:5 ratio,
     about 640 × 800 px, JPG under 150 KB works best).

   Sources used for this edition (all from the organizers' files)
   • Women in AI Forum_Agenda Flyer.png       (agenda, titles, roles)
   • Women_in_AI_Forum_2026_-_Stage_Deck.pptx (opening session roles)
   • Speaker Abstract and Bio_*.docx / *-bio.docx (talks and bios)
   • Panel_Discussion_3rd_Women_in_AI_Forum_Final.docx (panel format)
   ===================================================================== */

window.EVENT = {

  /* ---------- Basic details ---------- */
  title: "3rd Women in AI Forum",
  // How the title breaks onto lines in the big heading (use \n for a new line)
  heroTitle: "3rd Women in AI\nForum",
  date: "2026-11-11",                 // YYYY-MM-DD
  start: "09:30",                     // event start (UAE time)
  end: "15:00",                       // event end   (UAE time)
  utcOffset: "+04:00",                // UAE time zone offset (no daylight saving)
  dateLabel: "Wednesday, 11 November 2026",
  timeLabel: "9:30 AM – 3:00 PM",

  venue: {
    name: "ADU Auditorium",
    detail: "Abu Dhabi Campus",
    // Link for the "Open in Google Maps" button. Replace with the exact
    // campus pin if you have one, or set to "" to hide the button.
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Abu%20Dhabi%20University%20Abu%20Dhabi%20Campus"
  },

  organizedBy: "Organized by the College of Engineering and the Research Institute for AI & Emerging Technologies (RAIET), Abu Dhabi University",

  host: {
    name: "Abu Dhabi University",
    logo: "assets/img/brand/adu-logo.png",
    // Set to false to hide the university logo (e.g. until logo use
    // on this site is approved by the university).
    showLogo: true
  },

  /* ---------- About ---------- */
  about: [
    "The 3rd Women in AI Forum is a one-day forum at Abu Dhabi University, organized by the College of Engineering and the Research Institute for AI & Emerging Technologies (RAIET).",
    "The programme features four keynote talks by speakers from Space42, EVA.ai and the University of Birmingham Dubai, covering Earth intelligence, AI-driven weather forecasting, AI-native engineering and trustworthy AI. It continues with a panel discussion on the theme “Generative AI: Opportunity or Threat for the Next Generation?”, with panelists from UAE University, the University of Dubai, 10Pearls and EVA.ai."
  ],

  // "The day at a glance" timeline
  glance: [
    { time: "09:30", label: "Registration and welcome" },
    { time: "10:00", label: "Opening session" },
    { time: "11:00", label: "Keynote talks" },
    { time: "13:00", label: "Panel discussion" },
    { time: "13:45", label: "Appreciation and closing" },
    { time: "14:10", label: "Refreshments and networking" }
  ],

  /* ---------- People ----------
     Each person has an id (the word before the colon). The agenda,
     panel and organizer lists refer to people by this id.
     photo: path to the photo, or "" to show initials instead.
     bio:   list of paragraphs, or [] if no biography was provided.     */
  people: {
    tarabalka: {
      name: "Dr. Yuliya Tarabalka, HDR",
      role: "Vice-President of Geospatial Solutions, Space42",
      org: "Space42",
      photo: "assets/img/people/tarabalka.jpg",
      bio: [
        "Dr. Yuliya Tarabalka is the Vice President of Geospatial Solutions at Space42, where she leads the development of advanced geospatial platforms and AI-driven applications for government and commercial markets. Her work focuses on transforming remote sensing data into actionable insights, building scalable systems that support critical decision-making across environmental monitoring, infrastructure, mobility, and national resilience.",
        "Prior to the merger between Bayanat and Yahsat, Dr. Tarabalka served as Vice President of Geospatial Platforms at Bayanat. Her previous roles include Head of R&D at LuxCarta, spearheading the development of automated cartography solutions and the creation of a Digital Earth Twin, and senior research positions at INRIA and NASA Goddard, where she pioneered AI tools for the reconstruction and update of the Digital Earth.",
        "She has authored more than 150 scientific publications, cited more than 10,000 times, and has contributed to the development of geospatial systems across Europe, the UAE, and the United States. Her work spans R&D leadership, platform development, and advisory roles for institutions shaping the future of autonomous systems and sustainable urban planning.",
        "Dr. Tarabalka holds a European PhD from the Institut Polytechnique of Grenoble and the University of Iceland (2010), and an Habilitation to Head Research (HdR) from the University Côte d’Azur (2017), focused on AI-driven classification of remote sensing imagery."
      ]
    },
    shyju: {
      name: "Dr. Naseema Shyju",
      role: "Senior Scientist, Geospatial Solutions, Space42",
      org: "Space42",
      photo: "assets/img/people/shyju.jpg",
      bio: [
        "Dr. Naseema Shyju is a Senior Scientist at Space42 with nearly two decades of experience in atmospheric science, Earth system modelling, and environmental prediction, with expertise in weather and environmental challenges relevant to the UAE and Middle East. She holds a PhD in Physics from Space Physics Laboratory, VSSC, ISRO, India. Her work combines physics-based modelling, AI, satellite Earth observations, and geospatial data for high-resolution weather and environmental prediction. Her research interests include hybrid physics-AI modelling, extreme weather, hydrology and floods, dust/air quality, and environmental hazards. She has contributed extensively to the scientific and technical literature through peer-reviewed journal articles, conference proceedings, book chapters, and technical blogs."
      ]
    },
    parshina: {
      name: "Ms. Tatiana Parshina",
      role: "AI Technical Lead, EVA.ai",
      org: "EVA.ai",
      photo: "assets/img/people/parshina.jpg",
      bio: [
        "Tatiana Parshina is an AI Technical Lead at EVA.ai, where she has spent the past seven years taking AI from prototype to production for enterprise HR. Her work includes an AI-powered platform that helps the UN Development Programme match and deploy crisis-response consultants across 170 countries, and an agentic skills-intelligence system for LVMH. Across 15 years in technology product companies, she has led engineering teams in Russia and India, including telecommunications projects for clients such as NTT DOCOMO and Etisalat. She holds a Master's degree in Mathematics and Computer Science and is the author of 11 registered educational software programs for teaching applied mathematics."
      ]
    },
    naik: {
      name: "Dr. Shraddha Naik",
      role: "Assistant Professor, Department of Computer Science, University of Birmingham Dubai",
      org: "University of Birmingham Dubai",
      photo: "assets/img/people/naik.jpg",
      bio: [
        "Dr. Shraddha M. Naik is an Assistant Professor in the Department of Computer Science at the University of Birmingham Dubai. She holds a PhD in Computer Science and Engineering from NIT Goa, India, and has conducted research at Khalifa University, Kyungpook National University, and Sorbonne University Abu Dhabi. Her research focuses on artificial intelligence and machine learning, with applications in autonomous systems, blockchain security, and digital finance. In 2026, she was recognized as an Expert on the UAE Research Map. She is passionate about advancing responsible AI, teaching and mentoring students, and inspiring the next generation of researchers and innovators."
      ]
    },
    alkaabi: {
      name: "Dr. Khaula Alkaabi",
      role: "Professor and Assistant Dean for Research and Graduate Studies, Department of Geography and Urban Sustainability, UAE University",
      org: "UAE University",
      photo: "assets/img/people/alkaabi.jpg",
      bio: [
        "Khaula Alkaabi is a Full Professor in the Department of Geography and Urban Sustainability at United Arab Emirates University (UAEU). She holds a BA in Geography from UAEU, an MA and PhD in Geography from the University of North Carolina at Greensboro (UNCG), USA, and a Public Sector Innovation Diploma from the University of Cambridge, UK.",
        "Her research interests include transportation and land-use planning, spatial analysis, GIS applications, drone applications, tourism, urban geography, economic geography, smart cities, entrepreneurship and innovation, and teaching and learning.",
        "Professor Alkaabi served as Chair of the Geography Department from 2013 to 2017 and as Chief Innovation Officer at UAEU from 2015 to 2022. Since 2025, she has served as Assistant Dean for Research and Graduate Studies."
      ]
    },
    wahbah: {
      name: "Dr. Maisam Wahbah",
      role: "Associate Professor, College of Engineering & IT, University of Dubai",
      org: "University of Dubai",
      photo: "assets/img/people/wahbah.jpg",
      also: ["Chair, Awards & Recognition, IEEE UAE Section"],
      bio: [
        "Dr. Maisam Wahbah received her Ph.D. in Electrical Engineering and Computer Science from Khalifa University, UAE, and later joined KU’s Healthcare Engineering Innovation Center as a Postdoctoral Fellow. She is currently an Associate Professor at the College of Engineering and Information Technology, University of Dubai. A long-standing IEEE member, she serves as Chair of the Awards and Recognition for the IEEE UAE Section, promoting professional growth and excellence. Her research spans renewable energy, statistical modeling, and biomedical systems, with recognized contributions, including receiving the QUWA: For Women in Research grant – a funded research grant aligned with the UAE’s D33 vision and the UN SDGs."
      ]
    },
    yousuf: {
      name: "Dr. Zainab Yousuf",
      role: "AI Solution Architect, 10Pearls, and Ambassador, Women in AI Pakistan",
      org: "10Pearls",
      photo: "assets/img/people/yousuf.jpg",
      also: ["AI Solution Architect and Practice Lead – AI/ML, 10Pearls", "Ambassador, Women in AI (Pakistan)"],
      bio: [
        "Dr. Zainab Yousuf is an AI Solution Architect and Practice Lead for AI/ML at 10Pearls, with extensive experience spanning Artificial Intelligence research, enterprise AI transformation, and intelligent system development. Her expertise includes Generative AI, Agentic AI, Machine Learning, Computer Vision, and AI applications in healthcare.",
        "With a PhD and a strong research background, she has contributed to scientific publications in AI and medical image analysis. She has led the architecture and implementation of AI solutions across healthcare, financial services, and enterprise environments, bridging academic innovation with real-world business impact.",
        "She also serves as the Ambassador for Women in AI (Pakistan), advocating for women's participation, leadership, and opportunities in Artificial Intelligence. She is passionate about mentoring emerging talent, advancing responsible AI, and empowering the next generation of innovators."
      ]
    },
    ahmed: {
      name: "Dr. Ramsha Ahmed",
      role: "Assistant Professor, Abu Dhabi University",
      org: "Abu Dhabi University",
      photo: "assets/img/people/ahmed.jpg",
      bio: []
    },
    basiouni: {
      name: "Dr. Azza Basiouni",
      role: "Forum Organizer",
      org: "Abu Dhabi University",
      photo: "",
      bio: []
    },
    ghazal: {
      name: "Prof. Mohammed Ghazal",
      role: "Director, Research Institute for AI and Emerging Technologies, Abu Dhabi University",
      org: "Abu Dhabi University",
      photo: "",
      bio: []
    },
    aouad: {
      name: "Prof. Ghassan Aouad",
      role: "Chancellor, Abu Dhabi University",
      photo: "", bio: []
    },
    sheibani: {
      name: "Dr. Hamdi Sheibani",
      role: "Dean, College of Engineering, Abu Dhabi University",
      photo: "", bio: []
    },
    qasymeh: {
      name: "Prof. Montasir Qasymeh",
      role: "Associate Provost for Research, Innovation and Academic Development, Abu Dhabi University",
      photo: "", bio: []
    }
  },

  /* ---------- Agenda ----------
     Sessions appear in this order. Inside each session, items appear
     in the order listed.
     people: list of person ids (shows names and roles automatically)
     who:    plain text instead of people, e.g. "All participants"
     talk:   for keynote talks — the abstract shown under "Read abstract"  */
  agenda: [
    {
      id: "registration",
      title: "Registration",
      icon: "clipboard",
      items: [
        { start: "09:30", end: "10:00", title: "Registration & Welcome", who: "All participants" }
      ]
    },
    {
      id: "opening",
      title: "Opening Session",
      icon: "mic",
      items: [
        { start: "10:00", end: "10:05", title: "UAE National Anthem" },
        { start: "10:05", end: "10:10", title: "ADU Welcome Remarks", people: ["aouad"] },
        { start: "10:10", end: "10:15", title: "College of Engineering Remarks", people: ["sheibani"] },
        { start: "10:15", end: "10:20", title: "Research & Innovation Remarks", people: ["qasymeh"] },
        { start: "10:20", end: "10:25", title: "Research Institute (RAIET) Remarks", people: ["ghazal"] },
        { start: "10:25", end: "10:40", title: "Forum Remarks", people: ["ahmed", "basiouni"], who: "Forum Organizers" },
        { start: "10:40", end: "11:00", title: "Photo Session", who: "All participants" }
      ]
    },
    {
      id: "keynotes",
      title: "Keynote Talks",
      icon: "screen",
      items: [
        {
          start: "11:00", end: "11:40", keynote: true, people: ["tarabalka"],
          title: "Earth Intelligence: Why AI Needs a Digital Nervous System for the Planet",
          abstract: [
            "Artificial Intelligence is becoming remarkably capable. But there is one thing it still lacks: a real-time understanding of the physical world. To make better decisions, intelligent systems need more than data. They need continuous awareness of what is happening across our planet. In this talk, we will explore how satellites, sensors, geospatial AI, and interconnected digital systems are coming together to create Earth Intelligence, a living digital nervous system for the planet. This emerging capability could fundamentally change how humanity manages resources, responds to crises, protects ecosystems, and understands a rapidly changing world. Because before machines can become truly intelligent, they must first learn to understand Earth."
          ]
        },
        {
          start: "11:40", end: "12:20", keynote: true, people: ["shyju"],
          title: "Redefining Weather Forecasting: Where AI Meets Satellite Vision",
          abstract: [
            "Weather forecasting is undergoing a major transformation driven by advances in satellite Earth observations, physics-based modelling, and artificial intelligence. Satellite observations and data assimilation have played a fundamental role in improving forecast skill, while emerging AI approaches are enabling faster and increasingly high-resolution prediction. The evolution toward AI-enabled weather and Earth system prediction brings together machine learning, physics-based models, satellite observations, and data-driven approaches. These advances also bring key scientific challenges, including the prediction of extreme events, physical consistency, uncertainty quantification, and generalization across different atmospheric conditions. Looking ahead, the integration of AI, physics-based modelling, data assimilation, and Earth observations offers a promising pathway toward more accurate, efficient, and high-resolution weather and environmental prediction."
          ]
        },
        {
          start: "12:20", end: "12:40", keynote: true, people: ["parshina"],
          title: "AI-Native Engineering: How AI Is Empowering Women to Build, Lead and Innovate",
          abstract: [
            "AI now writes much of the code behind real products, and software engineering practice is evolving just as quickly. In this talk, Tatiana Parshina, AI Technical Lead at EVA.ai, offers an inside view of how AI-native products are built and brought to production in 2026, and which skills matter most today.",
            "She then explores how these shifts are empowering women in technology to expand their expertise, start their own businesses, work flexibly, and build solutions that serve their communities."
          ]
        },
        {
          start: "12:40", end: "13:00", keynote: true, people: ["naik"],
          title: "Building AI We Can Trust",
          abstract: [
            "As artificial intelligence advances rapidly, our understanding of it must grow alongside its capabilities. How can we benefit from AI while ensuring it is safe, reliable, and accountable? This talk explores AI literacy and the importance of understanding both the potential and limitations of AI. Drawing on her research in autonomous driving and digital finance, Dr. Shraddha M. Naik will discuss how we can build and use AI responsibly. Through accessible real-world examples, the talk aims to provide practical insights and encourage students, particularly young women, to play an active role in shaping AI we can trust."
          ]
        }
      ]
    },
    {
      id: "panel",
      title: "Panel Discussion",
      icon: "people",
      items: [
        { start: "13:00", end: "13:05", title: "Panel Theme & Panelist Introductions", detail: "Moderator: Dr. Ramsha Ahmed" },
        { start: "13:05", end: "13:25", title: "Round 1: The Opportunity", detail: "How generative AI is changing learning, research and careers" },
        { start: "13:25", end: "13:45", title: "Round 2: The Threat", detail: "Risks, responsible use and preparing the next generation" }
      ]
    },
    {
      id: "closing",
      title: "Closing",
      icon: "award",
      items: [
        { start: "13:45", end: "14:05", title: "Appreciation Ceremony & Group Photo", who: "Organizing Committee & University Representatives" },
        { start: "14:05", end: "14:10", title: "Closing Remarks", who: "Organizing Committee" },
        { start: "14:10", end: "15:00", title: "Refreshments & Networking", who: "All participants" }
      ]
    }
  ],

  /* ---------- Panel discussion ---------- */
  panel: {
    theme: "Generative AI: Opportunity or Threat for the Next Generation?",
    start: "13:00",
    end: "13:45",
    moderator: "ahmed",
    // Listed in speaking order
    panelists: ["alkaabi", "wahbah", "yousuf", "parshina"],
    rounds: [
      { title: "Round 1: The Opportunity", start: "13:05", end: "13:25", text: "How generative AI is changing learning, research and careers" },
      { title: "Round 2: The Threat", start: "13:25", end: "13:45", text: "Risks, responsible use and preparing the next generation" }
    ]
  },

  /* ---------- Organizing committee ---------- */
  organizers: ["ahmed", "basiouni", "ghazal"],

  /* ---------- Registration (hidden while url is empty) ---------- */
  registration: {
    url: "",                 // e.g. a Microsoft Forms or Google Forms link
    label: "Register to attend",
    note: ""                 // e.g. "Registration closes on 9 November."
  },

  /* ---------- Contact (hidden while email is empty) ---------- */
  contact: {
    email: "",               // e.g. an organizer's university email
    note: ""                 // e.g. "For questions about the forum, email the organizing committee."
  },

  /* ---------- Footer notice ---------- */
  disclaimer: "This event page is maintained by the forum organizing committee. It is not an official Abu Dhabi University website."
};

/* =========================================================
   APNI SAARI DETAILS YAHAN BADLO — baaki files chhedne ki zaroorat nahi.
   (Edit everything about you in this one file.)
   ========================================================= */
window.PORTFOLIO = {
  name: "Amar Kushwaha",
  // Hero mein ek-ek karke type hone wale titles
  roles: ["Python Developer", "QA Engineer", "Video Editor"],
  tagline:
    "Fresher Python Developer & QA Engineer who also edits short-form video — I write clean code, test it properly, and cut videos that hold attention.",

  // Photo: portfolio/assets/photo.jpg
  photo: "assets/photo.jpg",
  resume: "", // e.g. "assets/resume.pdf" — khali chhodo to button nahi dikhega

  about: [
    "Hi! I'm Amar, a Computer Science graduate (B.Tech, 2021–2025) from Sagar, Madhya Pradesh. I'm a fresher Python Developer and QA Engineer who enjoys building practical projects with Python and object-oriented programming, and making sure software is reliable before it reaches users.",
    "Alongside code, I work as a freelance video editor with 1.5 years of experience in short-form vertical video for Instagram — storyboarding, beat-synced cuts, animated captions, audio clean-up and colour grading.",
    "I'm looking for my first opportunity where I can write code, test it thoroughly, and keep learning every day."
  ],

  stats: [
    { value: 2, suffix: "+", label: "Tech projects built" },
    { value: 6, suffix: "+", label: "Technologies learned" },
    { value: 30, suffix: "", label: "Videos delivered in 30 days" },
    { value: 100, suffix: "%", label: "Eager to learn" }
  ],

  // Levels andaze se rakhe hain — apne hisaab se badal lo
  skillGroups: [
    {
      title: "Development & QA",
      items: [
        { name: "Python", level: 85 },
        { name: "OOP Concepts", level: 80 },
        { name: "Software Testing / QA", level: 75 },
        { name: "SQL", level: 70 },
        { name: "HTML5", level: 80 },
        { name: "JavaScript", level: 60 },
        { name: "React", level: 45 },
        { name: "Git & GitHub", level: 65 }
      ]
    },
    {
      title: "Video Editing",
      items: [
        { name: "Adobe Premiere Pro", level: 85 },
        { name: "CapCut", level: 90 },
        { name: "Captions & Motion Graphics", level: 85 },
        { name: "Beat-synced Editing", level: 85 },
        { name: "Audio Clean-up", level: 80 },
        { name: "Colour Grading", level: 75 },
        { name: "Storyboarding", level: 80 }
      ]
    }
  ],

  // category se filter buttons bante hain
  projects: [
    {
      title: "Online Internship Platform",
      desc: "A learning platform where students can take any short-duration course completely free of cost and earn a certificate on completion.",
      tags: ["Python", "HTML", "CSS", "JavaScript"],
      category: "Web",
      image: "assets/project-internship.svg", // apna screenshot ho to yahan uska path daal do
      live: "",
      code: "https://github.com/iamamar-codes"
    },
    {
      title: "Console-Based Finance Tracker",
      desc: "A console-based app to record income and expenses and track your balance, built with Python using object-oriented programming concepts.",
      tags: ["Python", "OOP"],
      category: "Python",
      image: "assets/project-finance.svg",
      live: "",
      code: "https://github.com/iamamar-codes"
    }
  ],

  video: {
    role: "Freelance Video Editor",
    period: "May 2025 – Present · Sagar",
    handle: "@the.frame.soul",
    resume: "assets/Amar-Kushwaha-Video-Editor-Resume.pdf", // khali chhodo to button nahi dikhega
    summary:
      "1.5 years of short-form vertical video for Instagram. I take raw footage to a finished, captioned, ready-to-post video — and I delivered 30 short videos in 30 days for a daily content series.",
    highlights: [
      { icon: "🎬", title: "30 videos in 30 days", text: "A daily talking-head video series — every video captioned and ready to post." },
      { icon: "🎵", title: "Beat-synced music videos", text: "Song and devotional videos with a matching visual for every lyric phrase, cut on the beat." },
      { icon: "✂️", title: "Teasers, trailers & shorts", text: "Teasers, trailers, gameplay shorts and product-review videos, from raw footage to final export." },
      { icon: "💬", title: "Captions & motion graphics", text: "Animated captions and motion graphics that keep viewers watching." },
      { icon: "🎧", title: "Clean audio", text: "Dialogue clean-up, room-echo and noise removal, plus keyword-matched sound effects." },
      { icon: "⚙️", title: "Fast, checked workflow", text: "A reusable toolkit for captions, audio clean-up, beat detection and render checks — quality checks on every render." }
    ],
    samples: [
      { label: "@the.frame.soul", url: "https://www.instagram.com/the.frame.soul" },
      { label: "@be.withshree", url: "https://www.instagram.com/be.withshree" }
    ]
  },

  contact: {
    email: "kushwahaamar104@gmail.com",
    location: "Sagar, Madhya Pradesh",
    socials: [
      { label: "GitHub", url: "https://github.com/iamamar-codes" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/amar-kush" },
      { label: "Instagram", url: "https://www.instagram.com/the.frame.soul" }
    ]
  }
};

/* ============================================================
   PROGRAMS & WORKSHOPS — viewer entries
   Loads AFTER js/publications.js (it reuses the same viewer:
   rows with data-pub open the #pub dialog). Images live in
   images/workshops/.
   ============================================================ */

(window.PUBLICATIONS = window.PUBLICATIONS || []).push(
  {
    slug: "young-innovators",
    title: "Young Innovators Program",
    tag: "Hero MotoCorp \u00b7 VIDA",
    role: "Lead app designer \u00b7 Team Velociti",
    story: "Hero MotoCorp\u2019s fully funded Young Innovators Program picked 30 of us from over 400 applicants for a summer of building. In a cross-school team of five I worked on Velociti \u2014 'ride into the future' \u2014 a smart EV concept for teenage riders, and as the team\u2019s lead digital product designer I built the companion app in Figma: battery and charge telematics, remote lock, custom navigation and in-ride services. Between mentor sessions and visits to Hero\u2019s R&D centre and factory floor, we took the pitch to a leadership jury in a boardroom-style final.",
    images: [
      { file: "workshops/yip-pitch.jpg",        cap: "Opening our pitch" },
      { file: "workshops/yip-move.jpg",         cap: "How do we move today?" },
      { file: "workshops/yip-velociti.jpg",     cap: "Team Velociti, on stage" },
      { file: "workshops/yip-ev.jpg",           cap: "Walking through the EV concept" },
      { file: "workshops/yip-award.jpg",        cap: "Collecting our certificate" },
      { file: "workshops/yip-certificates.jpg", cap: "Team Velociti, certified" },
      { file: "workshops/yip-team.jpg",         cap: "With my teammates" },
      { file: "workshops/yip-cohort.jpg",       cap: "The 2025 cohort" }
    ]
  },
  {
    slug: "robotics-iitd",
    title: "Robotics Workshop",
    tag: "IIT Delhi",
    role: "Participant",
    story: "A hands-on robotics workshop at IIT Delhi. We built a small sensor-driven bot from a kit \u2014 IR sensors, motor drivers and all the wiring in between \u2014 and worked out how it senses an object, decides, and moves. The last two frames are my own annotated notes from the bench.",
    images: [
      { file: "workshops/rob-build.jpg",  cap: "Assembling the sensor kit" },
      { file: "workshops/rob-bench.jpg",  cap: "Bots on the benches" },
      { file: "workshops/rob-hall.jpg",   cap: "The workshop hall" },
      { file: "workshops/rob-notes1.jpg", cap: "How it thinks \u2014 my annotations" },
      { file: "workshops/rob-notes2.jpg", cap: "The sensors, explained" }
    ]
  },
  {
    slug: "u18-launchpad",
    title: "U18 Launchpad",
    tag: "ThinkStartup \u00b7 IIT Delhi",
    role: "Founder pitch \u00b7 2nd Runner-Up",
    story: "ThinkStartup\u2019s U18 Launchpad took a cohort of twenty under-18s through two weeks of startup incubation at IIT Delhi \u2014 makerspaces, mentors, and a structured route from idea to venture. It\u2019s where Weave Writers, my free platform for young storytellers, got its first real outing: a stall, a pitch, and a room full of questions \u2014 and the final showcase pitch took home the 2nd Runner-Up award.",
    images: [
      { file: "workshops/u18-mentors.jpg",   cap: "Working through an idea with mentors" },
      { file: "workshops/u18-classroom.jpg", cap: "Design-thinking session" },
      { file: "workshops/u18-debate.jpg",    cap: "Testing ideas on the cohort" },
      { file: "workshops/u18-ux.jpg",        cap: "UX deep-dive" },
      { file: "workshops/u18-marketing.jpg", cap: "Startup marketing session" },
      { file: "workshops/u18-pitch.jpg",     cap: "Pitching Weave Writers" },
      { file: "workshops/u18-stall.jpg",     cap: "The Weave Writers stall" },
      { file: "workshops/u18-group.jpg",     cap: "Cohort, with our mentor" }
    ]
  }
);

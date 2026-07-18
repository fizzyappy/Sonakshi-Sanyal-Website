# Publications + Workshops viewer — update for sonakshisanyal site

Clicking a row in "Words in print" or "Where I've been learning" now opens
a viewer (same look as the artwork lightbox) with photos, captions and a
short description.

## Rows with viewers
Publications: On Wings of Poems / Ink & Stardust / A Patchwork of Dreams
Workshops:    Young Innovators Program (NEW row, Hero MotoCorp) /
              Robotics Workshop / U18 Launchpad
Recognition:  "In Conversation with Student Authors" card (was the
              "World Book Fair 2025" card) now opens a viewer too

## What's in here
- `index.html` — your file with the changes below applied
- `css/publications.css` — viewer stylesheet (loads after style.css)
- `js/publications.js` — viewer logic + publication entries
- `js/workshops.js` — workshop entries (must load AFTER publications.js)
- `js/recognition.js` — recognition entries (same rule)
- `images/publications/` + `images/workshops/` + `images/recognition/` — photos
- `images/intro/` — the 9 snapshot-strip photos in the About section

`css/style.css`, `js/main.js` and `js/artworks.js` stay untouched.
NOTE: js/publications.js changed since the first drop (image paths are
now "publications/…" / "workshops/…"); always replace it together with
workshops.js.

## If your index.html has drifted, the edits are:
1. <head>: add  <link rel="stylesheet" href="css/publications.css">
2. Add data-pub to rows:
   publications: on-wings-of-poems / ink-and-stardust / a-patchwork-of-dreams
   workshops:    robotics-iitd / u18-launchpad
3. Add the "Young Innovators Program" row in the Programs section
   (data-pub="young-innovators", after Stanford Product Design)
3b. Recognition card 02: retitle to "In Conversation with Student
    Authors" and give the div data-pub="student-authors" tabindex="0"
    (copy from this index.html)
4. Paste the <div id="pub" …> modal block before the artworks.js script
4b. Paste the <div class="snaps …"> strip at the end of the About section
    (copy from this index.html)
5. After main.js:
   <script defer src="js/publications.js"></script>
   <script defer src="js/workshops.js"></script>
   <script defer src="js/recognition.js"></script>

## Editing content
Titles, roles, descriptions, image order and captions live in
window.PUBLICATIONS — publications at the top of js/publications.js,
workshops in js/workshops.js, recognition in js/recognition.js. Add a new entry + matching data-pub on any
row to give it a viewer.

## Photos deliberately left out
From the U18 Launchpad set: the Weave Writers business-card scan, the
brochure close-up and the poster close-up (they show a personal phone
number / email / home address). The full originals are still in your
PDFs — drop any of them into images/workshops/ and add a line in
workshops.js if you want them back.

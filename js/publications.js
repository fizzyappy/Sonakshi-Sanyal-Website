/* ============================================================
   PUBLICATIONS — data + viewer
   Loads after main.js. Rows with data-pub="<slug>" open the viewer.
   In the single-file preview, window.PUB_IMG maps filenames to
   embedded data URIs; on the real site images live under images/.
   ============================================================ */

window.PUBLICATIONS = [
  {
    slug: "on-wings-of-poems",
    title: "On Wings of Poems",
    tag: "The Write Order",
    role: "Author \u00b7 Illustrator",
    story: "My debut collection \u2014 thirty poems I conceptualised, wrote and illustrated, published with The Write Order and available worldwide on Amazon, where it holds a 5-star reader rating. The poems roam wherever curiosity took me \u2014 a stray dog\u2019s life, a caged bird and the idea of freedom, witches, dinosaurs, a butterfly mid-change. Launched at the World Book Fair 2023, it earned me the Promising Young Authors certificate from the National Council of Teachers of English, USA.",
    images: [
      { file: "publications/on-wings-front.jpg", cap: "Front cover" },
      { file: "publications/on-wings-back.jpg",  cap: "Back cover" }
    ]
  },
  {
    slug: "ink-and-stardust",
    title: "Ink & Stardust",
    tag: "Scholastic India",
    role: "Contributing poet",
    story: "Stories told entirely in verse \u2014 a 120-page Scholastic India anthology, released in March 2024 for middle-grade readers. Twelve young poets from across the country share its pages, and my poems sit among them, built on rhythm, imagery and a slightly sideways way of looking at the world.",
    images: [
      { file: "publications/ink-stardust-front.jpg", cap: "Front cover" },
      { file: "publications/ink-stardust-back.jpg",  cap: "Back cover" }
    ]
  },
  {
    slug: "a-patchwork-of-dreams",
    title: "A Patchwork of Dreams",
    tag: "Scholastic Writers' Academy",
    role: "Contributing author",
    story: "An illustrated anthology of short fiction from Scholastic India \u2014 twenty young authors, twenty stories, developed through the Scholastic Writers\u2019 Academy with mentorship from industry experts. My story appears alongside nineteen other young writers from across the country, all of us published between the same covers.",
    images: [
      { file: "publications/patchwork-front.jpg",   cap: "Front cover" },
      { file: "publications/patchwork-back.jpg",    cap: "Back cover" },
      { file: "publications/patchwork-holding.jpg", cap: "First copy in hand" },
      { file: "publications/patchwork-reading.jpg", cap: "Reading my author copy" }
    ]
  }
];

(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var pubs = window.PUBLICATIONS || [];
  var PIMG = window.PUB_IMG || null;
  function srcOf(file) { return PIMG ? PIMG[file] : "images/" + file; }

  var pub = $("#pub");
  if (!pub || !pubs.length) return;

  var pImg = $("#pub-img"), pTag = $("#pub-tag"), pTitle = $("#pub-title"),
      pRole = $("#pub-role"), pStory = $("#pub-story"), pCap = $("#pub-cap"),
      pThumbs = $("#pub-thumbs"), pCur = $("#pub-cur"), pTot = $("#pub-tot");

  var cur = null, idx = 0, lastFocus = null;
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function showImg(i) {
    idx = (i + cur.images.length) % cur.images.length;
    var im = cur.images[idx];
    pImg.src = srcOf(im.file);
    pImg.alt = cur.title + " \u2014 " + im.cap;
    pCap.textContent = im.cap;
    pCur.textContent = pad(idx + 1);
    pTot.textContent = pad(cur.images.length);
    $$("button", pThumbs).forEach(function (b, n) {
      b.classList.toggle("active", n === idx);
    });
  }

  function openPub(slug) {
    cur = null;
    for (var i = 0; i < pubs.length; i++) if (pubs[i].slug === slug) { cur = pubs[i]; break; }
    if (!cur) return;
    pTag.textContent = cur.tag;
    pTitle.textContent = cur.title;
    pRole.textContent = cur.role;
    pStory.textContent = cur.story;
    pThumbs.innerHTML = cur.images.map(function (im, n) {
      return '<button type="button" aria-label="' + im.cap + '">' +
             '<img src="' + srcOf(im.file) + '" alt=""></button>';
    }).join("");
    $$("button", pThumbs).forEach(function (b, n) {
      b.addEventListener("click", function (e) { e.stopPropagation(); showImg(n); });
    });
    showImg(0);
    lastFocus = document.activeElement;
    pub.classList.add("open");
    document.body.classList.add("no-scroll");
    $("#pub-close").focus();
  }

  function closePub() {
    pub.classList.remove("open");
    document.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* wire up the rows */
  $$(".row[data-pub], .card[data-pub]").forEach(function (row) {
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    row.setAttribute("aria-haspopup", "dialog");
    row.addEventListener("click", function () { openPub(row.getAttribute("data-pub")); });
    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPub(row.getAttribute("data-pub")); }
    });
  });

  $("#pub-close").addEventListener("click", closePub);
  $("#pub-next").addEventListener("click", function () { showImg(idx + 1); });
  $("#pub-prev").addEventListener("click", function () { showImg(idx - 1); });
  pub.addEventListener("click", function (e) {
    if (e.target === pub || e.target.classList.contains("lb-inner")) closePub();
  });
  document.addEventListener("keydown", function (e) {
    if (!pub.classList.contains("open")) return;
    if (e.key === "Escape") closePub();
    else if (e.key === "ArrowRight") showImg(idx + 1);
    else if (e.key === "ArrowLeft") showImg(idx - 1);
  });
})();

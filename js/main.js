/* ============================================================
   SONAKSHI SANYAL - interactions
   ============================================================ */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Preloader ---------- */
  window.addEventListener("load", function () {
    setTimeout(function () {
      var l = $("#loader");
      if (l) l.classList.add("done");
      document.body.classList.remove("no-scroll");
      startHero();
    }, reduceMotion ? 100 : 1500);
  });
  document.body.classList.add("no-scroll");

  /* ---------- Hero reveal ---------- */
  function startHero() {
    $$(".hero-title .word").forEach(function (w, i) {
      w.style.transition = "transform 1s cubic-bezier(.16,1,.3,1)";
      w.style.transitionDelay = (0.05 + i * 0.09) + "s";
      requestAnimationFrame(function () { w.style.transform = "translateY(0)"; });
    });
    setTimeout(function () {
      var s = $(".hero-sub"), c = $(".hero-cue");
      [s, c].forEach(function (el) {
        if (!el) return;
        el.style.transition = "opacity .9s ease, transform .9s ease";
        el.style.opacity = "1"; el.style.transform = "translateY(0)";
      });
    }, reduceMotion ? 50 : 650);
  }
  if (reduceMotion) document.body.classList.remove("no-scroll");

  /* ---------- Nav ---------- */
  var nav = $(".nav");
  var progressBar = $("#progress");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
    if (progressBar) {
      var de = document.documentElement;
      var max = de.scrollHeight - de.clientHeight;
      progressBar.style.width = (max > 0 ? (de.scrollTop / max) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var toggle = $(".nav-toggle");
  if (toggle) toggle.addEventListener("click", function () { nav.classList.toggle("open"); });
  $$(".nav-links a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("open"); });
  });

  /* ---------- Cursor glow ---------- */
  var glow = $("#glow");
  if (glow && !isTouch && !reduceMotion) {
    var gx = window.innerWidth / 2, gy = window.innerHeight / 2, cx = gx, cy = gy, shown = false;
    window.addEventListener("mousemove", function (e) {
      gx = e.clientX; gy = e.clientY;
      if (!shown) { glow.style.opacity = "1"; shown = true; }
    });
    (function loop() {
      cx += (gx - cx) * 0.12; cy += (gy - cy) * 0.12;
      glow.style.transform = "translate(" + cx + "px," + cy + "px)";
      requestAnimationFrame(loop);
    })();
  }

  /* ============================================================
     PARTICLE FIELD - leaves + ink dots drifting like the sketch
     ============================================================ */
  (function field() {
    var canvas = $("#field");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var W, H, particles = [];
    var mouse = { x: -9999, y: -9999, active: false };
    var scrollY = window.scrollY;

    var palette = [[95,138,114],[193,95,56],[133,122,103],[176,133,60]];
    var ACC = [226,163,86];   // warm highlight leaves shift toward, near the cursor

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
    }

    function build() {
      var area = W * H;
      var count = Math.round(area / 8500);
      count = Math.max(34, Math.min(count, isTouch ? 72 : 190));
      particles = [];
      for (var i = 0; i < count; i++) particles.push(makeP());
    }

    function makeP() {
      var depth = Math.random();            // 0 far .. 1 near
      var leaf = Math.random() > 0.28;      // mostly petals, a few ink dots
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        bx: 0, by: 0,                       // displacement from cursor
        z: depth,
        size: leaf ? (4 + depth * 13) : (0.7 + depth * 2.0),
        leaf: leaf,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.004,
        vx: (Math.random() - 0.5) * (0.12 + depth * 0.18),
        vy: (Math.random() - 0.5) * (0.12 + depth * 0.18) - 0.04,
        a: 0.07 + depth * 0.19,
        rgb: palette[(Math.random() * palette.length) | 0],
        tint: 0,                              // 0..1 cursor colour influence
        py: Math.random() * 1000             // parallax phase
      };
    }

    // petal colour: its base tone, nudged toward a warm highlight by its cursor tint
    function petalColor(p, extraA) {
      var tn = p.tint, b = p.rgb;
      var r = (b[0] + (ACC[0] - b[0]) * tn * 0.62) | 0;
      var g = (b[1] + (ACC[1] - b[1]) * tn * 0.62) | 0;
      var bl = (b[2] + (ACC[2] - b[2]) * tn * 0.62) | 0;
      return "rgba(" + r + "," + g + "," + bl + "," + (p.a + tn * 0.09 + (extraA || 0)) + ")";
    }

    function drawLeaf(p, x, y) {
      var s = p.size;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(p.rot);
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(s * 0.62, -s * 0.2, 0, s);
      ctx.quadraticCurveTo(-s * 0.62, -s * 0.2, 0, -s);
      ctx.fillStyle = petalColor(p);
      ctx.fill();
      ctx.restore();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      var sy = window.scrollY;
      var parY = (sy - scrollY);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // drift
        p.x += p.vx; p.y += p.vy;
        if (p.leaf) p.rot += p.spin;

        // wrap
        if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;

        // cursor influence: nearby petals drift away and warm in colour
        var tTarget = 0;
        if (mouse.active) {
          var dx = p.x - mouse.x, dy = p.y - mouse.y;
          var d2 = dx * dx + dy * dy;
          var R = 200;
          if (d2 < R * R) {
            var d = Math.sqrt(d2) || 1;
            var prox = 1 - d / R;
            tTarget = prox;
            var force = prox * (1.8 + p.z * 3);
            p.bx += (dx / d) * force * 0.45;   // visible, soft drift
            p.by += (dy / d) * force * 0.45;
          }
        }
        p.tint += (tTarget - p.tint) * (tTarget > p.tint ? 0.16 : 0.05); // catch fast, release slow
        // ease displacement back to rest (settle)
        p.bx *= 0.9; p.by *= 0.9;

        // parallax by depth (near layers move more with scroll)
        var off = parY * (0.04 + p.z * 0.22);

        var x = p.x + p.bx;
        var y = p.y + p.by - off * 0.0; // scroll handled by element flow; keep subtle internal motion
        // gentle vertical parallax shimmer
        y += Math.sin((p.py + Date.now() * 0.0002)) * (p.z * 1.2);

        if (p.leaf) drawLeaf(p, x, y);
        else {
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = petalColor(p, 0.05);
          ctx.fill();
        }
      }
      scrollY = sy;
      raf = requestAnimationFrame(tick);
    }

    var raf;
    function play() { if (!raf) raf = requestAnimationFrame(tick); }
    function pause() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    window.addEventListener("resize", resize);
    if (!isTouch) {
      window.addEventListener("mousemove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; });
      window.addEventListener("mouseout", function () { mouse.active = false; });
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) pause(); else play();
    });

    resize();
    if (reduceMotion) {
      // draw a single static frame
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (p.leaf) drawLeaf(p, p.x, p.y);
        else { ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 6.28); ctx.fillStyle = petalColor(p); ctx.fill(); }
      }
    } else play();
  })();

  /* ============================================================
     GALLERY build
     ============================================================ */
  var data = window.ARTWORKS || [];
  var IMG = window.IMG || {};
  if (!window.IMG) data.forEach(function (a) { IMG[a.slug] = "images/artwork/" + a.slug + "_t.jpg"; });
  var masonry = $("#masonry");
  if (masonry) {
    var html = "";
    data.forEach(function (a, i) {
      html +=
        '<figure class="tile" data-med="' + medGroup(a.medium) + '" data-i="' + i + '">' +
        '<img loading="lazy" decoding="async" width="' + a.w + '" height="' + a.h + '"' +
        ' src="' + IMG[a.slug] + '" alt="' + esc(a.title) + ' - ' + esc(a.medium) + '">' +
        '<figcaption class="tile-cap"><h4>' + esc(a.title) + '</h4><span>' + esc(a.medium) + '</span></figcaption>' +
        '</figure>';
    });
    masonry.innerHTML = html;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function medGroup(m) {
    m = (m || "").toLowerCase();
    if (m.indexOf("alcohol marker") === 0 || m.indexOf("marker") === 0) return "marker";
    if (m.indexOf("acrylic") === 0) return "acrylic";
    if (m.indexOf("watercolour") === 0) return "watercolour";
    if (m.indexOf("coloured pencil") === 0 || m.indexOf("graphite") === 0) return "pencil";
    if (m.indexOf("ink") === 0) return "ink";
    if (m.indexOf("oil pastel") === 0) return "pastel";
    return "mixed"; /* digital, mixed media, coffee / tea / salt / ink */
  }

  /* ---------- Filters ---------- */
  $$(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      $$(".filter").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      $$(".tile").forEach(function (t) {
        var show = (f === "all" || t.getAttribute("data-med") === f);
        t.classList.toggle("tile-hidden", !show);
        if (show && !t.classList.contains("in")) t.classList.add("in");
      });
    });
  });

  /* ============================================================
     Reveal on scroll
     ============================================================ */
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });

    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, idx) {
        if (e.isIntersecting) {
          var t = e.target;
          var delay = (parseInt(t.getAttribute("data-i"), 10) % 4) * 70;
          setTimeout(function () { t.classList.add("in"); }, delay);
          tio.unobserve(t);
        }
      });
    }, { threshold: 0.08 });
    $$(".tile").forEach(function (el) { tio.observe(el); });
  } else {
    $$(".reveal,.tile").forEach(function (el) { el.classList.add("in"); });
  }

  /* ============================================================
     LIGHTBOX
     ============================================================ */
  var lb = $("#lb"), lbImg = $("#lb-img"), lbNum = $("#lb-num"),
    lbTitle = $("#lb-title"), lbMed = $("#lb-med"), lbStory = $("#lb-story"),
    lbCur = $("#lb-cur"), lbTot = $("#lb-tot");
  var current = 0;

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function openLB(i) {
    current = (i + data.length) % data.length;
    var a = data[current];
    lbImg.src = IMG[a.slug];
    lbImg.alt = a.title + " - " + a.medium;
    lbTitle.textContent = a.title;
    lbMed.textContent = a.medium;
    lbStory.textContent = a.story;
    lbNum.textContent = pad(current + 1);
    if (lbCur) lbCur.textContent = pad(current + 1);
    if (lbTot) lbTot.textContent = pad(data.length);
    lb.classList.add("open");
    document.body.classList.add("no-scroll");
  }
  function closeLB() { lb.classList.remove("open"); document.body.classList.remove("no-scroll"); }
  function next() { openLB(current + 1); }
  function prev() { openLB(current - 1); }

  document.addEventListener("click", function (e) {
    var tile = e.target.closest && e.target.closest(".tile");
    if (tile) { openLB(parseInt(tile.getAttribute("data-i"), 10)); return; }
    var feat = e.target.closest && e.target.closest("[data-open]");
    if (feat) {
      var slug = feat.getAttribute("data-open");
      for (var i = 0; i < data.length; i++) if (data[i].slug === slug) { openLB(i); break; }
    }
  });
  if (lb) {
    $("#lb-close").addEventListener("click", closeLB);
    $("#lb-next").addEventListener("click", next);
    $("#lb-prev").addEventListener("click", prev);
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-inner")) closeLB(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLB();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    });
  }

  /* ---------- To top ---------- */
  $$("[data-totop]").forEach(function (b) {
    b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });
  });

  /* ---------- year ---------- */
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  /* ---------- count-up on the stats ---------- */
  function countUp(el) {
    var raw = el.textContent.trim(), m = raw.match(/^(\d+)(.*)$/);
    if (!m) return;
    var target = parseInt(m[1], 10), suffix = m[2] || "", dur = 1100, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(e * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && !reduceMotion) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); so.unobserve(e.target); } });
    }, { threshold: 0.6 });
    $$(".about-meta .stat b").forEach(function (el) { so.observe(el); });
  }
})();

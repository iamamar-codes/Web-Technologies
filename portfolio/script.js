/* Vanilla JavaScript: content fill + all animations */
(function () {
  const D = window.PORTFOLIO;
  const $ = (s) => document.querySelector(s);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Fill content from data.js ---------- */
  const initials = D.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  document.title = D.name + " — Portfolio";
  $("#logoText").textContent = initials;
  $("#initials").textContent = initials;
  $("#tagline").textContent = D.tagline;
  $("#footName").textContent = D.name;
  $("#year").textContent = new Date().getFullYear();

  // Name: letter-by-letter rise animation
  const nameEl = $("#heroName");
  nameEl.setAttribute("aria-label", D.name);
  let i = 0;
  D.name.split(" ").forEach((word, wi, arr) => {
    const w = document.createElement("span");
    w.style.whiteSpace = "nowrap";
    w.style.display = "inline-block";
    for (const ch of word) {
      const s = document.createElement("span");
      s.className = "ch";
      s.textContent = ch;
      s.style.animationDelay = 0.25 + i++ * 0.045 + "s";
      w.appendChild(s);
    }
    nameEl.appendChild(w);
    if (wi < arr.length - 1) nameEl.appendChild(document.createTextNode(" "));
  });

  // Photo with fallback to initials
  const photo = $("#photo");
  const frame = photo.parentElement;
  photo.onerror = () => frame.classList.add("no-photo");
  if (D.photo) photo.src = D.photo; else frame.classList.add("no-photo");

  if (D.resume) { const r = $("#resumeBtn"); r.href = D.resume; r.hidden = false; }

  $("#aboutText").innerHTML = "";
  D.about.forEach((t) => { const p = document.createElement("p"); p.textContent = t; $("#aboutText").appendChild(p); });

  // Download resume button under the About text (main resume, else the video editing one)
  const aboutResume = D.resume || (D.video && D.video.resume);
  if (aboutResume) {
    const a = document.createElement("a");
    a.className = "btn btn-primary resume-btn";
    a.href = aboutResume;
    a.setAttribute("download", "");
    a.innerHTML = "Download resume <span>↓</span>";
    $("#aboutText").appendChild(a);
  }

  D.stats.forEach((s, n) => {
    const el = document.createElement("div");
    el.className = "stat card reveal";
    el.style.setProperty("--d", n * 0.12 + "s");
    el.innerHTML = '<b data-count="' + Number(s.value) + '" data-suffix="' + (s.suffix || "").replace(/[^+%kK]/g, "") + '">0</b><span></span>';
    el.querySelector("span").textContent = s.label;
    $("#stats").appendChild(el);
  });

  const mq = $("#marquee");
  const words = D.skillGroups.flatMap((g) => g.items.map((s) => s.name));
  for (let k = 0; k < 2; k++) words.forEach((w) => { const s = document.createElement("span"); s.textContent = w; mq.appendChild(s); });

  $("#mailBtn").href = "mailto:" + D.contact.email;
  $("#location").textContent = "📍 " + D.contact.location + "  ·  ✉ " + D.contact.email;
  D.contact.socials.forEach((s) => {
    const a = document.createElement("a");
    a.textContent = s.label; a.href = s.url;
    if (s.url !== "#") { a.target = "_blank"; a.rel = "noopener"; }
    $("#socials").appendChild(a);
  });

  /* ---------- 2. Typing effect ---------- */
  const typed = $("#typed");
  if (reduced) typed.textContent = D.roles[0];
  else {
    let r = 0, c = 0, del = false;
    (function type() {
      const word = D.roles[r];
      c += del ? -1 : 1;
      typed.textContent = word.slice(0, c);
      let wait = del ? 45 : 95;
      if (!del && c === word.length) { del = true; wait = 1500; }
      else if (del && c === 0) { del = false; r = (r + 1) % D.roles.length; wait = 350; }
      setTimeout(type, wait);
    })();
  }

  /* ---------- 3. Particle network (canvas) ---------- */
  const cv = $("#particles"), ctx = cv.getContext("2d");
  let W, H, pts = [], mouse = { x: -999, y: -999 };
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(90, Math.floor((W * H) / 16000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.6
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let a = 0; a < pts.length; a++) {
      const p = pts[a];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (dm < 130) { p.x += (p.x - mouse.x) / dm * 1.2; p.y += (p.y - mouse.y) / dm * 1.2; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = "rgba(110,231,183,.8)"; ctx.fill();
      for (let b = a + 1; b < pts.length; b++) {
        const q = pts[b], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 130) {
          ctx.strokeStyle = "rgba(34,197,94," + (1 - d / 130) * 0.35 + ")";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    if (!reduced && heroVisible) requestAnimationFrame(draw);
  }
  let heroVisible = true;
  new IntersectionObserver(([e]) => {
    const was = heroVisible; heroVisible = e.isIntersecting;
    if (heroVisible && !was && !reduced) requestAnimationFrame(draw);
  }).observe(cv);
  addEventListener("resize", resize);
  $("#home").addEventListener("pointermove", (e) => { const b = cv.getBoundingClientRect(); mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top; });
  $("#home").addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
  resize(); draw();

  /* ---------- 4. Scroll reveal (also catches React-rendered elements) ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
      const cnt = e.target.querySelector("[data-count]");
      if (cnt) countUp(cnt);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  const watch = (root) => root.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
  watch(document);
  new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => {
    if (n.nodeType !== 1) return;
    if (n.matches(".reveal:not(.in)")) io.observe(n);
    watch(n);
  }))).observe(document.body, { childList: true, subtree: true });

  /* ---------- 5. Counters ---------- */
  function countUp(el) {
    const end = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now(), dur = 1600;
    if (reduced) { el.textContent = end + suf; return; }
    (function tick(t) {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(end * e) + suf;
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }

  /* ---------- 6. Nav state, progress bar, active link ---------- */
  const nav = $("#nav"), bar = $("#progress");
  const links = [...document.querySelectorAll(".nav-links a")];
  const secs = links.map((a) => document.querySelector(a.getAttribute("href")));
  function onScroll() {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("scrolled", y > 30);
    bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    let cur = 0;
    secs.forEach((s, n) => { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) cur = n; });
    if (max > 0 && y >= max - 2) cur = secs.length - 1;
    links.forEach((a, n) => a.classList.toggle("active", n === cur));
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 7. Mobile menu ---------- */
  const menuBtn = $("#menuBtn"), navLinks = $("#navLinks");
  menuBtn.addEventListener("click", () => { menuBtn.classList.toggle("open"); navLinks.classList.toggle("open"); });
  navLinks.addEventListener("click", (e) => { if (e.target.tagName === "A") { menuBtn.classList.remove("open"); navLinks.classList.remove("open"); } });

  /* ---------- 8. Cursor glow + 3D tilt cards ---------- */
  if (!reduced && matchMedia("(hover: hover)").matches) {
    const glow = $("#cursorGlow");
    let tilted = null;
    addEventListener("pointermove", (e) => {
      glow.style.opacity = 1;
      glow.style.transform = "translate(" + (e.clientX - 210) + "px," + (e.clientY - 210) + "px)";
      const card = e.target.closest && e.target.closest(".tilt");
      if (tilted && tilted !== card) { tilted.style.transform = ""; tilted = null; }
      if (card) {
        const b = card.getBoundingClientRect();
        const px = (e.clientX - b.left) / b.width - 0.5, py = (e.clientY - b.top) / b.height - 0.5;
        card.style.transform = "perspective(900px) rotateY(" + px * 9 + "deg) rotateX(" + -py * 9 + "deg) translateY(-6px)";
        tilted = card;
      }
    });
    document.addEventListener("pointerleave", () => { glow.style.opacity = 0; if (tilted) { tilted.style.transform = ""; tilted = null; } });
  }
})();

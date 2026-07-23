/* ============================================================
   MoveMinds — Interactions
   ============================================================ */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initReveal();
    initTimeline();
    initGallery();
    initContactForm();
    initYear();
  });

  /* ---------- Sticky navbar ---------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector(".nav__toggle");
    var menu = document.querySelector(".mobile-menu");

    function onScroll() {
      if (!nav) return;
      if (window.scrollY > 30) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
        // staggered link reveal
        var links = menu.querySelectorAll("a");
        links.forEach(function (a, i) {
          a.style.transitionDelay = open ? (0.08 + i * 0.05) + "s" : "0s";
        });
      });
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          menu.classList.remove("open");
          toggle.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Timeline animated progress + item reveal ---------- */
  function initTimeline() {
    var timeline = document.querySelector(".timeline");
    if (!timeline) return;
    var progress = timeline.querySelector(".timeline__progress");
    var itemsEls = timeline.querySelectorAll(".tl-item");

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("in", "visible");
      });
    }, { threshold: 0.3 });
    itemsEls.forEach(function (el) { io.observe(el); });

    function update() {
      var rect = timeline.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = rect.height;
      var scrolled = Math.min(Math.max(vh * 0.6 - rect.top, 0), total);
      var pct = total > 0 ? (scrolled / total) * 100 : 0;
      if (progress) progress.style.height = Math.min(pct, 100) + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Gallery filter + lightbox ---------- */
  function initGallery() {
    var filters = document.querySelectorAll(".filter-btn");
    var items = document.querySelectorAll(".gitem");
    if (filters.length) {
      filters.forEach(function (btn) {
        btn.addEventListener("click", function () {
          filters.forEach(function (b) { b.classList.remove("active"); });
          btn.classList.add("active");
          var cat = btn.getAttribute("data-filter");
          items.forEach(function (item) {
            var show = cat === "all" || item.getAttribute("data-cat") === cat;
            item.style.display = show ? "" : "none";
          });
        });
      });
    }

    var lightbox = document.querySelector(".lightbox");
    if (!lightbox) return;
    var lbLabel = lightbox.querySelector(".lightbox__label");
    var lbBadge = lightbox.querySelector(".lightbox__badge");

    function open(label, badge) {
      if (lbLabel) lbLabel.textContent = label || "MoveMinds";
      if (lbBadge) lbBadge.textContent = badge || "Coming soon";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
    items.forEach(function (item) {
      item.addEventListener("click", function () {
        open(item.getAttribute("data-label"), item.getAttribute("data-badge"));
      });
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- Contact form (static, no backend) ---------- */
  function initContactForm() {
    var form = document.querySelector("#contact-form");
    if (!form) return;
    var success = form.querySelector(".form-success");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (success) success.classList.add("show");
      form.reset();
      setTimeout(function () { if (success) success.classList.remove("show"); }, 6000);
    });
  }

  /* ---------- Auto year in footer ---------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }
})();

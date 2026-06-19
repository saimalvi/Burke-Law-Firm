/* ==========================================================================
   BURKE LAW FIRM — main.js
   All interactive behavior. Pure vanilla JS, no dependencies.
   --------------------------------------------------------------------------
   1.  Sticky navbar
   2.  Mobile menu
   3.  Consultation form validation + success state
   4.  Smooth scroll (with sticky-nav offset)
   5.  FAQ accordion
   6.  Scroll-reveal animations
   7.  Stats counter animation
   8.  Mobile sticky CTA bar
   9.  Active nav link
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initStickyNavbar();
    initMobileMenu();
    initFormValidation();
    initSmoothScroll();
    initFaqAccordion();
    initScrollReveal();
    initStatsCounter();
    initMobileCta();
    initActiveNavLink();
  });

  /* Returns the current navbar height (varies when scrolled). */
  function navbarHeight() {
    var navbar = document.getElementById("navbar");
    return navbar ? navbar.offsetHeight : 0;
  }

  /* ========================================================================
     1. STICKY NAVBAR
     ===================================================================== */
  function initStickyNavbar() {
    var navbar = document.getElementById("navbar");
    if (!navbar) return;

    var onScroll = function () {
      if (window.scrollY > 80) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ========================================================================
     2. MOBILE MENU
     ===================================================================== */
  function initMobileMenu() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    var open = function () {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      document.body.style.overflow = "hidden";
    };

    var close = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      document.body.style.overflow = "";
    };

    var isOpen = function () {
      return nav.classList.contains("is-open");
    };

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      isOpen() ? close() : open();
    });

    // Close when a nav link is tapped
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });

    // Close on outside click
    document.addEventListener("click", function (e) {
      if (isOpen() && !nav.contains(e.target) && !toggle.contains(e.target)) {
        close();
      }
    });

    // Close on ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) {
        close();
        toggle.focus();
      }
    });

    // Reset state if resized up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 992 && isOpen()) close();
    });
  }

  /* ========================================================================
     3. CONSULTATION FORM VALIDATION
     ===================================================================== */
  function initFormValidation() {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var validateField = function (field) {
      var valid = true;
      var type = (field.getAttribute("type") || field.tagName).toLowerCase();
      var value = (field.value || "").trim();

      if (type === "checkbox") {
        valid = field.checked;
      } else if (value === "") {
        valid = false;
      } else if (field.type === "email") {
        valid = emailRe.test(value);
      } else if (field.type === "tel") {
        var digits = value.replace(/\D/g, "");
        valid = digits.length === 10 || (digits.length === 11 && digits[0] === "1");
      }

      setFieldValidity(field, valid);
      return valid;
    };

    var setFieldValidity = function (field, valid) {
      if (field.type === "checkbox") {
        // Mark the wrapping consent label
        var label = field.closest(".form-consent");
        if (label) label.classList.toggle("is-invalid", !valid);
      } else {
        field.classList.toggle("is-invalid", !valid);
      }
    };

    var forms = document.querySelectorAll(".consultation-form");

    forms.forEach(function (form) {
      var fields = form.querySelectorAll("[required]");

      // Clear error state as the user corrects a field
      fields.forEach(function (field) {
        var evt = field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "input";
        field.addEventListener(evt, function () {
          validateField(field);
        });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var firstInvalid = null;

        fields.forEach(function (field) {
          var ok = validateField(field);
          if (!ok && !firstInvalid) firstInvalid = field;
        });

        if (firstInvalid) {
          firstInvalid.focus();
          return;
        }

        showSuccess(form);
      });
    });
  }

  function showSuccess(form) {
    // The success block is a sibling of the form, inside the same card
    var card = form.parentElement;
    var success = card ? card.querySelector(".form-success") : null;

    form.style.display = "none";
    if (success) {
      success.classList.add("is-active");
      success.setAttribute("tabindex", "-1");
      success.focus();
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /* ========================================================================
     4. SMOOTH SCROLL (internal anchors, offset for sticky nav)
     ===================================================================== */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var href = link.getAttribute("href");
      if (!href || href === "#") return;

      var target = document.getElementById(href.slice(1));
      if (!target) return;

      e.preventDefault();
      var top =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight() -
        12;

      window.scrollTo({ top: top, behavior: "smooth" });

      // Move focus for accessibility without re-jumping
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  }

  /* ========================================================================
     5. FAQ ACCORDION
     ===================================================================== */
  function initFaqAccordion() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    var closeItem = function (item) {
      var answer = item.querySelector(".faq-answer");
      var question = item.querySelector(".faq-question");
      item.classList.remove("active");
      if (answer) answer.style.maxHeight = null;
      if (question) question.setAttribute("aria-expanded", "false");
    };

    var openItem = function (item) {
      var answer = item.querySelector(".faq-answer");
      var question = item.querySelector(".faq-question");
      item.classList.add("active");
      if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
      if (question) question.setAttribute("aria-expanded", "true");
    };

    items.forEach(function (item) {
      var question = item.querySelector(".faq-question");
      if (!question) return;

      question.addEventListener("click", function () {
        var isActive = item.classList.contains("active");
        // One open at a time
        items.forEach(closeItem);
        if (!isActive) openItem(item);
      });
    });

    // Keep an open answer correctly sized on resize
    window.addEventListener("resize", function () {
      var active = document.querySelector(".faq-item.active .faq-answer");
      if (active) active.style.maxHeight = active.scrollHeight + "px";
    });
  }

  /* ========================================================================
     6. SCROLL-REVEAL ANIMATIONS
     ===================================================================== */
  function initScrollReveal() {
    var els = document.querySelectorAll(".animate-on-scroll");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ========================================================================
     7. STATS COUNTER ANIMATION
     ===================================================================== */
  function initStatsCounter() {
    var numbers = document.querySelectorAll(".stat__number[data-target]");
    if (!numbers.length) return;

    var formatNumber = function (n) {
      return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    var animate = function (el) {
      var target = parseFloat(el.getAttribute("data-target")) || 0;
      var prefix = el.getAttribute("data-prefix") || "";
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 2000;
      var start = null;

      var step = function (timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + formatNumber(target * eased) + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = prefix + formatNumber(target) + suffix;
        }
      };

      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      numbers.forEach(animate);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    numbers.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ========================================================================
     8. MOBILE STICKY CTA BAR
     ===================================================================== */
  function initMobileCta() {
    var bar = document.querySelector(".mobile-cta");
    var hero = document.getElementById("hero") || document.querySelector(".hero");
    if (!bar) return;

    // No hero on a page → just show it once scrolled a bit
    if (!hero) {
      var onScrollNoHero = function () {
        bar.classList.toggle("is-visible", window.scrollY > 400);
      };
      onScrollNoHero();
      window.addEventListener("scroll", onScrollNoHero, { passive: true });
      return;
    }

    if (!("IntersectionObserver" in window)) {
      bar.classList.add("is-visible");
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          // Show the bar once the hero has scrolled out of view
          bar.classList.toggle("is-visible", !entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "-40% 0px 0px 0px" }
    );

    observer.observe(hero);
  }

  /* ========================================================================
     9. ACTIVE NAV LINK
     ===================================================================== */
  function initActiveNavLink() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".navbar__link");

    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      var file = href.split("/").pop();
      if (file === path) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }
})();

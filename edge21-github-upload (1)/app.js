/* ============================================
   EDGE21 + THE BOLD FACE CO — App JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---- Mobile Nav Toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll when nav open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Theme Toggle (Dark/Light) ---- */
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  // In-memory theme tracking (persists only within session)
  var currentTheme = null;

  if (themeToggle) {
    // Update icon based on current theme
    function updateIcon() {
      const isDark = root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.innerHTML = isDark
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }

    updateIcon();

    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const isDark = current === 'dark' ||
        (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      currentTheme = next;
      updateIcon();
    });
  }

  /* ---- Header Scroll Behavior ---- */
  const header = document.querySelector('.header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', () => {
      const current = window.scrollY;

      // Add shadow after scroll threshold
      if (current > 20) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      // Hide header on scroll down, show on scroll up (only after hero)
      if (current > 400) {
        if (current > lastScroll + 5) {
          header.style.transform = 'translateY(-100%)';
        } else if (current < lastScroll - 5) {
          header.style.transform = 'translateY(0)';
        }
      } else {
        header.style.transform = 'translateY(0)';
      }

      lastScroll = current;
    }, { passive: true });
  }

  /* ---- Popup / Lead Magnet ---- */
  const popup = document.getElementById('popup');
  const popupClose = document.getElementById('popup-close');
  var popupDismissed = false;
  const POPUP_DELAY = 45000;    // 45 seconds
  const POPUP_SCROLL = 0.55;    // 55% scroll depth

  function showPopup() {
    if (!popup) return;
    if (popupDismissed) return;
    popup.classList.add('active');
    // Trap focus inside popup
    const firstInput = popup.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function hidePopup() {
    if (!popup) return;
    popup.classList.remove('active');
    popupDismissed = true;
  }

  if (popup && popupClose) {
    popupClose.addEventListener('click', hidePopup);

    // Close on overlay click
    popup.addEventListener('click', (e) => {
      if (e.target === popup) hidePopup();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popup.classList.contains('active')) {
        hidePopup();
      }
    });

    // Trigger: time delay
    setTimeout(() => {
      if (!popupDismissed) showPopup();
    }, POPUP_DELAY);

    // Trigger: scroll depth
    function checkScrollDepth() {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPct >= POPUP_SCROLL) {
        showPopup();
        window.removeEventListener('scroll', checkScrollDepth);
      }
    }
    window.addEventListener('scroll', checkScrollDepth, { passive: true });
  }

  // Manual popup triggers (buttons with id popup-trigger-*)
  document.querySelectorAll('[id^="popup-trigger"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      popupDismissed = false; // Allow re-show
      showPopup();
    });
  });

  /* ---- Contact Form — Client-side validation feedback ---- */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Simple success state (replace with actual form handler later)
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Message Sent';
        btn.style.background = 'var(--color-success)';
        btn.style.borderColor = 'var(--color-success)';
        btn.style.color = '#fff';

        // Reset after a few seconds
        setTimeout(() => {
          contactForm.reset();
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 3000);
      }, 1000);
    });
  }

  /* ---- Scroll Progress Bar ---- */
  var scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  function updateScrollProgress() {
    var scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    scrollProgress.style.transform = 'scaleX(' + Math.min(scrollPct, 1) + ')';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ---- Enhanced IntersectionObserver for fade-in + stagger ---- */
  if (!CSS.supports('animation-timeline', 'scroll()')) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in, .reveal-up').forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });

    /* Staggered children */
    var staggerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var children = entry.target.children;
          for (var i = 0; i < children.length; i++) {
            (function(child, delay) {
              setTimeout(function() {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, delay);
            })(children[i], i * 80);
          }
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-stagger').forEach(function(el) {
      for (var i = 0; i < el.children.length; i++) {
        el.children[i].style.opacity = '0';
        el.children[i].style.transform = 'translateY(16px)';
        el.children[i].style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      }
      staggerObserver.observe(el);
    });
  }

  /* ---- Counter animation for numbers ---- */
  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var text = el.textContent;
        var match = text.match(/(\d+)/);
        if (match) {
          var target = parseInt(match[1]);
          var duration = 1200;
          var start = performance.now();
          function animate(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(target * eased);
            el.textContent = text.replace(match[1], current);
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.process-step__number').forEach(function(el) {
    counterObserver.observe(el);
  });

})();

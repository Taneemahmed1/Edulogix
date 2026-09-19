/* ============================================================
   EDULOGIX AUSTRALIA — MAIN JAVASCRIPT
   Handles:
     1. Navbar scroll states
     2. Mobile hamburger navigation
     3. Slide-out Cart Drawer
     4. Currency Switcher
     5. Hero Course Finder Jump & Highlight
     6. Course "Enroll Now" prefill helper
     7. Multi-item Testimonials Carousel
     8. Interactive Contact Form Submission & Alerts
     9. Scroll Reveal Animations
     10. Back-to-Top Button
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1. NAVBAR SHRINK ON SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  // ---- 2. MOBILE MENU DRAWER ----
  const hamburger = document.getElementById('hamburger-btn');
  const drawer    = document.getElementById('mobile-drawer');

  hamburger?.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    drawer.setAttribute('aria-hidden', !isOpen);
  });

  drawer?.querySelectorAll('.navbar__mobile-link, .navbar__enquire').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ---- 3. CART SLIDE-OUT DRAWER ----
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartDrawer    = document.getElementById('cart-drawer');
  const cartOverlay   = document.getElementById('cart-overlay');
  const cartCloseBtn  = document.getElementById('cart-close-btn');
  const cartBrowseBtn = document.getElementById('cart-browse-btn');

  function openCart() {
    cartDrawer?.classList.add('is-open');
    cartOverlay?.classList.add('is-open');
    cartDrawer?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer?.classList.remove('is-open');
    cartOverlay?.classList.remove('is-open');
    cartDrawer?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cartToggleBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  });
  cartCloseBtn?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);
  cartBrowseBtn?.addEventListener('click', closeCart);

  // ---- 4. CURRENCY SWITCHER ----
  const currencyBtn     = document.getElementById('currency-btn');
  const currencyMenu    = document.getElementById('currency-menu');
  const currFlagEl      = document.getElementById('current-currency-flag');
  const currLabelEl     = document.getElementById('current-currency-label');

  currencyBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currencyMenu?.classList.toggle('is-open');
  });

  document.querySelectorAll('.currency-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.currency-option').forEach(o => o.classList.remove('active'));
      option.classList.add('active');

      const curr = option.getAttribute('data-curr') || 'AUD';
      const flag = option.getAttribute('data-flag') || '🇦🇺';
      const sym  = option.getAttribute('data-sym')  || 'A$';

      if (currFlagEl)  currFlagEl.textContent = flag;
      if (currLabelEl) currLabelEl.textContent = curr;

      currencyMenu?.classList.remove('is-open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!currencyBtn?.contains(e.target) && !currencyMenu?.contains(e.target)) {
      currencyMenu?.classList.remove('is-open');
    }
  });

  // ---- 5. HERO COURSE FINDER JUMP ----
  const heroSelect     = document.getElementById('course-select');
  const heroGetStarted = document.getElementById('hero-get-started-btn');

  heroGetStarted?.addEventListener('click', () => {
    const val = heroSelect?.value;
    if (!val) {
      heroSelect?.focus();
      return;
    }
    const target = document.getElementById(`course-${val}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
      target.style.boxShadow = '0 0 0 4px var(--orange), 0 20px 40px rgba(232, 119, 34, 0.25)';
      target.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        target.style.boxShadow = '';
        target.style.transform = '';
      }, 2500);
    }
  });

  // ---- 6. TESTIMONIALS CAROUSEL ----
  const track    = document.getElementById('testimonials-track');
  const prevBtn  = document.getElementById('testimonial-prev');
  const nextBtn  = document.getElementById('testimonial-next');

  if (track) {
    const cards = track.querySelectorAll('.tcard');
    let current = 0;

    const goTo = (index) => {
      current = (index + cards.length) % cards.length;
      const offset = cards[current].offsetLeft;
      track.style.transform = `translateX(-${offset}px)`;
    };

    prevBtn?.addEventListener('click', () => goTo(current - 1));
    nextBtn?.addEventListener('click', () => goTo(current + 1));

    // Auto advance every 6 seconds
    let autoSlide = setInterval(() => goTo(current + 1), 6000);

    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => goTo(current + 1), 6000);
    });
  }

  // ---- 7. CONTACT FORM SUBMISSION & FEEDBACK ----
  const contactForm = document.getElementById('home_contact_us_form');
  const alertMsg    = document.getElementById('c_messages');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('contact-submit-btn');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
    }

    setTimeout(() => {
      if (alertMsg) {
        alertMsg.style.display = 'flex';
        alertMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      contactForm.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Message Sent ✓';
        setTimeout(() => {
          submitBtn.innerHTML = 'Send message';
        }, 3000);
      }

      setTimeout(() => {
        if (alertMsg) alertMsg.style.display = 'none';
      }, 7000);
    }, 700);
  });

  // ---- 7b. MACOS LIVE CLOCK ----
  const macClockEl = document.getElementById('macClock');
  if (macClockEl) {
    const updateMacClock = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[now.getDay()];
      const dayNum = now.getDate();
      const monthName = months[now.getMonth()];
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      macClockEl.textContent = `${dayName} ${dayNum} ${monthName} ${hours}:${mins}`;
    };
    updateMacClock();
    setInterval(updateMacClock, 30000);
  }

  // ---- 8. SCROLL REVEAL ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const revealTargets = document.querySelectorAll(
    '.course-card, .promise-card, .country-card, .blog-card, .tcard, .section-header'
  );
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
    revealObserver.observe(el);
  });

  // ---- 9. BACK TO TOP ----
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '↑';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---- 10. HERO COURSE SELECTOR (REDESIGN) ----
  const heroCourseSelect = document.getElementById('course-select');
  if (heroCourseSelect) {
    heroCourseSelect.addEventListener('change', (e) => {
      const targetId = e.target.value;
      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetEl.classList.add('card-highlight');
          setTimeout(() => targetEl.classList.remove('card-highlight'), 2500);
        } else {
          // Fallback scroll to courses section
          const coursesSection = document.getElementById('courses');
          if (coursesSection) {
            coursesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  }

  // ---- 11. MODERN SERVICE SHOWCASE CARD (INTERACTIVE PATHWAYS) ----
  const pathwayButtons = document.querySelectorAll('.msc-nav-item');
  const mscBgImg       = document.getElementById('mscBgImg');
  const mscTag         = document.getElementById('mscTag');
  const mscTitle       = document.getElementById('mscTitle');
  const mscDesc        = document.getElementById('mscDesc');
  const mscLink        = document.getElementById('mscLink');
  const mscLinkText    = document.getElementById('mscLinkText');

  const pathwayData = {
    australia: {
      tag: "Primary Healthcare Pathway",
      title: "Registration, Made Clear<br>and Simple",
      desc: "An overview of how intuitive guidance, ANMAC portfolio assessment, and dedicated RN mentorship remove friction from Australian nursing registration.",
      img: "assets/images/nursing-registration.png",
      link: "https://www.edulogix.com.au/services/australia/",
      btnText: "View Full Pathway"
    },
    canada: {
      tag: "Canadian Healthcare Pathway",
      title: "Canadian Licensing,<br>Made Clear and Simple",
      desc: "Streamlined document verification, NNAS advisory reports, and provincial nursing board registration across British Columbia, Alberta, and Ontario.",
      img: "assets/images/service-nursing.jpg",
      link: "https://www.edulogix.com.au/services/canada/",
      btnText: "View Canada Pathway"
    },
    "new-zealand": {
      tag: "Direct Pacific Pathway",
      title: "New Zealand Pathway,<br>Made Clear and Simple",
      desc: "End-to-end guidance with NCNZ requirements, competence assessment, MCQ examination prep, and direct nursing registration issuance.",
      img: "assets/images/service-education.jpg",
      link: "https://www.edulogix.com.au/services/new-zealand/",
      btnText: "View NZ Pathway"
    },
    streamlined: {
      tag: "2025/2026 Fast-Track Framework",
      title: "Streamlined Pathway,<br>Fast-Track Recognition",
      desc: "Accelerated AHPRA registration for nurses qualified in the UK, Ireland, USA, and Canada under the newly updated Australian regulatory guidelines.",
      img: "assets/images/card-expert.jpg",
      link: "https://www.edulogix.com.au/services/new-streamlined-assessment-pathway-2025/",
      btnText: "Learn About Streamlined"
    }
  };

  pathwayButtons.forEach(btn => {
    const handleSelect = () => {
      const key = btn.getAttribute('data-pathway');
      const data = pathwayData[key];
      if (!data) return;

      pathwayButtons.forEach(b => {
        b.classList.remove('is-active');
        b.removeAttribute('aria-current');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-current', 'true');

      // Smooth fade transition
      const showcaseBody = document.querySelector('.msc-showcase-body');
      if (showcaseBody) showcaseBody.style.opacity = '0.35';
      if (mscBgImg) mscBgImg.style.opacity = '0.4';

      setTimeout(() => {
        if (mscBgImg) {
          mscBgImg.src = data.img;
          mscBgImg.style.opacity = '1';
        }
        if (mscTag) mscTag.textContent = data.tag;
        if (mscTitle) mscTitle.innerHTML = data.title;
        if (mscDesc) mscDesc.textContent = data.desc;
        if (mscLink) mscLink.href = data.link;
        if (mscLinkText) mscLinkText.textContent = data.btnText;
        if (showcaseBody) showcaseBody.style.opacity = '1';
      }, 150);
    };

    btn.addEventListener('click', handleSelect);
    btn.addEventListener('mouseenter', handleSelect);
  });

  // ---- 12. NUMBER COUNTER ANIMATION (0 TO TARGET) ----
  const counterElements = document.querySelectorAll('[data-counter="true"]');
  if (counterElements.length > 0) {
    const animateCounter = (el) => {
      const target = parseFloat(el.getAttribute('data-target')) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const duration = 2000;
      const startTime = performance.now();

      const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

      const updateCount = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = Math.round(easeOutExpo(progress) * target);
        const formatted = currentVal.toLocaleString('en-US');
        el.textContent = `${prefix}${formatted}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = `${prefix}${target.toLocaleString('en-US')}${suffix}`;
        }
      };

      el.textContent = `${prefix}0${suffix}`;
      requestAnimationFrame(updateCount);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // ---- 13. EDULOGIX YOUTUBE VIDEO SLIDER & MODAL ----
  const ytTrack      = document.getElementById('ytSliderTrack');
  const ytViewport   = document.getElementById('ytSliderViewport');
  const ytPrevBtn    = document.getElementById('ytPrevBtn');
  const ytNextBtn    = document.getElementById('ytNextBtn');
  const ytDotsWrap   = document.getElementById('ytSliderDots');
  const ytModal      = document.getElementById('ytModal');
  const ytIframe     = document.getElementById('ytModalIframe');
  const ytCloseBtn   = document.getElementById('ytModalClose');
  const ytBackdrop   = document.getElementById('ytModalBackdrop');

  if (ytTrack && ytViewport) {
    const cards = ytTrack.querySelectorAll('.yt-card');
    let currentIndex = 0;
    let maxIndex = 0;

    const getVisibleCount = () => {
      const w = window.innerWidth;
      if (w <= 640) return 1;
      if (w <= 1024) return 2;
      return 3;
    };

    const updateMaxIndex = () => {
      const visible = getVisibleCount();
      maxIndex = Math.max(0, cards.length - visible);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      renderDots();
      moveToIndex(currentIndex, false);
    };

    const renderDots = () => {
      if (!ytDotsWrap) return;
      ytDotsWrap.innerHTML = '';
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.className = `yt-slider-dot ${i === currentIndex ? 'is-active' : ''}`;
        dot.setAttribute('aria-label', `Go to video slide ${i + 1}`);
        dot.addEventListener('click', () => moveToIndex(i));
        ytDotsWrap.appendChild(dot);
      }
    };

    const moveToIndex = (index, smooth = true) => {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      const card = cards[0];
      if (!card) return;

      const cardRect = card.getBoundingClientRect();
      const style = window.getComputedStyle(ytTrack);
      const gap = parseFloat(style.gap) || 24;
      const step = cardRect.width + gap;
      const offset = currentIndex * step;

      ytTrack.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
      ytTrack.style.transform = `translateX(-${offset}px)`;

      if (ytDotsWrap) {
        const dots = ytDotsWrap.querySelectorAll('.yt-slider-dot');
        dots.forEach((d, idx) => d.classList.toggle('is-active', idx === currentIndex));
      }
    };

    ytPrevBtn?.addEventListener('click', () => {
      const nextIdx = currentIndex === 0 ? maxIndex : currentIndex - 1;
      moveToIndex(nextIdx);
    });

    ytNextBtn?.addEventListener('click', () => {
      const nextIdx = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      moveToIndex(nextIdx);
    });

    // Auto-advance loop
    let autoPlayTimer = setInterval(() => {
      const nextIdx = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      moveToIndex(nextIdx);
    }, 4500);

    const pauseAuto = () => clearInterval(autoPlayTimer);
    const resumeAuto = () => {
      clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(() => {
        const nextIdx = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        moveToIndex(nextIdx);
      }, 4500);
    };

    ytViewport.addEventListener('mouseenter', pauseAuto);
    ytViewport.addEventListener('mouseleave', resumeAuto);
    ytPrevBtn?.addEventListener('mouseenter', pauseAuto);
    ytPrevBtn?.addEventListener('mouseleave', resumeAuto);
    ytNextBtn?.addEventListener('mouseenter', pauseAuto);
    ytNextBtn?.addEventListener('mouseleave', resumeAuto);

    // Touch Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    ytViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseAuto();
    }, { passive: true });

    ytViewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) {
          moveToIndex(currentIndex >= maxIndex ? 0 : currentIndex + 1);
        } else {
          moveToIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
        }
      }
      resumeAuto();
    }, { passive: true });

    window.addEventListener('resize', () => {
      updateMaxIndex();
    });

    // Initial calculation
    updateMaxIndex();

    // Video Playback Modal
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.yt-card__action')) return;

        const videoId = card.getAttribute('data-video-id');
        if (!videoId) return;

        if (ytModal && ytIframe) {
          ytIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
          ytModal.classList.add('is-open');
          ytModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
          pauseAuto();
        }
      });
    });

    const closeModal = () => {
      if (ytModal && ytIframe) {
        ytModal.classList.remove('is-open');
        ytModal.setAttribute('aria-hidden', 'true');
        ytIframe.src = '';
        document.body.style.overflow = '';
        resumeAuto();
      }
    };

    ytCloseBtn?.addEventListener('click', closeModal);
    ytBackdrop?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && ytModal?.classList.contains('is-open')) {
        closeModal();
      }
    });
  }
});

// Global Helper for Course prefill
window.prefillCourse = function (courseName) {
  const select = document.getElementById('contact-interest');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value.toLowerCase().includes(courseName.toLowerCase()) ||
          courseName.toLowerCase().includes(select.options[i].value.toLowerCase())) {
        select.selectedIndex = i;
        break;
      }
    }
  }
};

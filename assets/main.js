/* ============================================================
   APPLEBERRY STORIES — Main JavaScript
   ============================================================ */

/* ─── NAV SCROLL EFFECT ─────────────────────────────────── */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* ─── HERO PARALLAX LOAD ────────────────────────────────── */
const hero = document.getElementById('hero');
if (hero) {
  window.addEventListener('load', () => {
    hero.classList.add('loaded');
  });
}

/* ─── HAMBURGER MENU ────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

/* ─── SCROLL ANIMATIONS ─────────────────────────────────── */
const animateElements = document.querySelectorAll('.animate-fade-up');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animateElements.forEach(el => observer.observe(el));
} else {
  // Fallback for browsers without IntersectionObserver
  animateElements.forEach(el => el.classList.add('in-view'));
}

/* ─── COUNTERS ──────────────────────────────────────────── */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = start + (el.dataset.suffix || '');
  }, 16);
}

const counterEls = document.querySelectorAll('.stat-number[data-count]');
if (counterEls.length > 0 && 'IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));
}

/* ─── FAQ ACCORDION ─────────────────────────────────────── */
function toggleFaq(questionEl) {
  const item = questionEl.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all other open items
  document.querySelectorAll('.faq-item.open').forEach(openItem => {
    if (openItem !== item) {
      openItem.classList.remove('open');
    }
  });

  item.classList.toggle('open', !isOpen);
}

// Make globally accessible
window.toggleFaq = toggleFaq;

/* ─── FAQ FILTER ────────────────────────────────────────── */
function filterFaqs(btn, category) {
  // Update active button
  document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide items
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    if (category === 'all') {
      item.style.display = '';
    } else {
      const itemCat = item.dataset.category || '';
      item.style.display = itemCat.includes(category) ? '' : 'none';
    }
  });
}

window.filterFaqs = filterFaqs;

/* ─── PRODUCT FILTER ────────────────────────────────────── */
const categoryPills = document.querySelectorAll('.category-pill[data-filter]');
if (categoryPills.length > 0) {
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.filter;
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const cards = document.querySelectorAll('.product-card[data-category]');
      cards.forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
          card.style.opacity = '1';
        } else {
          const cats = (card.dataset.category || '').split(' ');
          if (cats.includes(filter)) {
            card.style.display = '';
            setTimeout(() => { card.style.opacity = '1'; }, 10);
          } else {
            card.style.opacity = '0';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        }
      });
    });
  });
}

/* ─── NEWSLETTER ────────────────────────────────────────── */
function subscribeNewsletter() {
  const inputEl = document.getElementById('heroNewsletter');
  if (!inputEl) return;
  const email = inputEl.value.trim();
  if (!email || !email.includes('@')) {
    inputEl.style.borderColor = 'red';
    inputEl.style.outline = '2px solid rgba(255,0,0,0.1)';
    setTimeout(() => {
      inputEl.style.borderColor = '';
      inputEl.style.outline = '';
    }, 2000);
    return;
  }
  const btn = inputEl.nextElementSibling;
  btn.textContent = '✓ Subscribed!';
  btn.style.background = '#2D5016';
  inputEl.value = '';
  inputEl.placeholder = 'Thank you for subscribing!';
  inputEl.disabled = true;
}

window.subscribeNewsletter = subscribeNewsletter;

/* ─── CONTACT FORM ──────────────────────────────────────── */
function handleContactSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form && success) {
    form.style.opacity = '0';
    form.style.transition = 'opacity 0.4s';
    setTimeout(() => {
      form.style.display = 'none';
      success.style.display = 'block';
      success.style.animation = 'fadeInUp 0.5s ease both';
    }, 400);
  }
}

window.handleContactSubmit = handleContactSubmit;

/* ─── ADD TO CART FEEDBACK ──────────────────────────────── */
document.querySelectorAll('.product-card__btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const original = this.textContent;
    this.textContent = '✓';
    this.style.background = 'var(--color-sage)';
    setTimeout(() => {
      this.textContent = original;
      this.style.background = '';
    }, 1200);
  });
});

/* ─── SMOOTH ACTIVE NAV HIGHLIGHT ──────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage && !link.classList.contains('nav__cta')) {
    link.classList.add('active');
  }
});

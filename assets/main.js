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
/* ─── ADD TO CART FEEDBACK & LOGIC ────────────────────── */
const CART_KEY = 'appleberry_cart';
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function addToCart(product) {
  const existingItem = cart.find(item => item.name === product.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  saveCart();
}

function updateCartQuantity(productName, delta) {
  const item = cart.find(item => item.name === productName);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productName);
    } else {
      saveCart();
    }
  }
}

function updateCartUI() {
  // Update badge count
  const badge = document.getElementById('cartBadge');
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  }

  // Update Drawer UI
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  if (!cartItemsContainer || !cartTotalEl) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="cart-empty">Your cart is currently empty.</div>';
    cartTotalEl.textContent = '£0.00';
    return;
  }

  let totalStr = 0;
  cartItemsContainer.innerHTML = cart.map(item => {
    totalStr += (item.price * item.quantity);
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item__img" />
        <div class="cart-item__details">
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__price">£${item.price.toFixed(2)}</div>
          <div class="cart-item__actions">
            <div class="cart-qty">
              <button onclick="updateCartQuantity('${item.name}', -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="updateCartQuantity('${item.name}', 1)">+</button>
            </div>
            <button class="cart-item__remove" onclick="removeFromCart('${item.name}')">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  cartTotalEl.textContent = `£${totalStr.toFixed(2)}`;

  // Update Product Cards on the page
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('.product-card__name').textContent.trim();
    const btn = card.querySelector('.product-card__btn');
    let qtyContainer = card.querySelector('.product-card-qty');

    const itemInCart = cart.find(item => item.name === name);

    if (itemInCart) {
      if (btn) btn.style.display = 'none';
      if (!qtyContainer) {
        qtyContainer = document.createElement('div');
        qtyContainer.className = 'product-card-qty';
        qtyContainer.innerHTML = `
          <button class="qty-btn minus" aria-label="Decrease quantity">-</button>
          <span class="qty-val"></span>
          <button class="qty-btn plus" aria-label="Increase quantity">+</button>
        `;
        const footer = card.querySelector('.product-card__footer');
        footer.appendChild(qtyContainer);

        // Add event listeners for the new quantity buttons
        qtyContainer.querySelector('.minus').addEventListener('click', function () {
          updateCartQuantity(name, -1);
        });
        qtyContainer.querySelector('.plus').addEventListener('click', function () {
          updateCartQuantity(name, 1);
        });
      }
      qtyContainer.style.display = 'flex';
      qtyContainer.querySelector('.qty-val').textContent = itemInCart.quantity;
    } else {
      if (btn) btn.style.display = 'flex';
      if (qtyContainer) {
        qtyContainer.style.display = 'none';
      }
    }
  });
}

// Make globally accessible
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;

document.querySelectorAll('.product-card__btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const card = this.closest('.product-card');
    const name = card.querySelector('.product-card__name').textContent.trim();
    const priceStr = card.querySelector('.product-card__price').textContent;
    // Extract price number: £6.99 / 500g -> "6.99"
    const priceMatch = priceStr.match(/£([0-9.]+)/);
    const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
    const image = card.querySelector('img').getAttribute('src');

    addToCart({ name, price, image });

    // UI Feedback is now managed by updateCartUI showing the quantity controls instead of opening drawer!
  });
});

/* ─── CART DRAWER CONTROLS ──────────────────────────────── */
function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent scrolling
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;

// Initialize Cart on Load
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();

  // Highlight Smooth Scroll if needed
  if (window.location.hash === '#shop-grid') {
    const el = document.getElementById('shop-grid');
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
});

/* ─── SMOOTH ACTIVE NAV HIGHLIGHT ──────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage && !link.classList.contains('nav__cta')) {
    link.classList.add('active');
  }
});

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Cart Overlay & Drawer -->
      <div class="cart-overlay" id="cartOverlay" onclick="closeCartDrawer()"></div>
      <div class="cart-drawer" id="cartDrawer">
        <div class="cart-header">
          <h2>Your Cart</h2>
          <button class="cart-close" onclick="closeCartDrawer()" aria-label="Close cart">&times;</button>
        </div>
        <div class="cart-items" id="cartItems">
          <!-- Cart Items Injected Here -->
        </div>
        <div class="cart-footer">
          <div class="cart-summary-line">
            <span>Total</span>
            <span id="cartTotal">£0.00</span>
          </div>
          <button class="cart-checkout-btn">Proceed to Checkout</button>
        </div>
      </div>

      <!-- Announcement Bar -->
      <div class="announcement-bar">
        🌿 <span>🎉 Fresh savings on natural seeds!</span> Free UK delivery on orders over £30 <span>🌿</span>
      </div>

      <!-- Navigation -->
      <nav class="nav" id="mainNav">
        <div class="nav__inner">
          <a href="/" class="nav__logo">
            <img src="assets/images/logo.png" alt="Appleberry Stories" class="nav__logo-img" />
            <div class="nav__logo-text">
              <span class="brand-name">Appleberry Stories</span>
              <span class="brand-tagline">Pure · Organic · Natural</span>
            </div>
          </a>
          <ul class="nav__links">
            <li><a href="/" class="nav__link">Home</a></li>
            <li><a href="shop#shop-grid" class="nav__link">Shop</a></li>
            <li><a href="about" class="nav__link">About Us</a></li>
            <li><a href="values" class="nav__link">Our Values</a></li>
            <li><a href="faqs" class="nav__link">FAQs</a></li>
            <li><a href="contact" class="nav__link">Contact</a></li>
            <li><a href="shop#shop-grid" class="nav__link nav__cta">Shop Now →</a></li>
          </ul>
          <button class="nav__cart-btn" onclick="openCartDrawer()" aria-label="Open Cart">
            <svg viewBox="0 0 24 24">
              <path
                d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            <span class="cart-badge" id="cartBadge" style="display:none;">0</span>
          </button>
          <button class="nav__hamburger" id="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
        <ul class="nav__mobile" id="mobileMenu">
          <li><a href="/" class="nav__link">Home</a></li>
          <li><a href="shop#shop-grid" class="nav__link">Shop</a></li>
          <li><a href="about" class="nav__link">About Us</a></li>
          <li><a href="values" class="nav__link">Our Values</a></li>
          <li><a href="faqs" class="nav__link">FAQs</a></li>
          <li><a href="contact" class="nav__link">Contact</a></li>
        </ul>
      </nav>
    `;

    // Highlight active link
    const currentPage = window.location.pathname.split('/').pop() || '';
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // Normalize path for matching.
    let pathNameForMatch = currentPage;
    if (currentPage === 'index.html' || currentPage === '') {
        pathNameForMatch = '/';
    } else {
        pathNameForMatch = currentPage.replace('.html', '');
    }

    this.querySelectorAll('.nav__link').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      let match = false;
      if (href === '/') {
          match = pathNameForMatch === '/';
      } else if (href.includes('#')) {
          // e.g. "shop#shop-grid"
          const baseHref = href.split('#')[0];
          match = pathNameForMatch === baseHref;
      } else {
          match = pathNameForMatch === href;
      }

      if (match && !link.classList.contains('nav__cta')) {
        link.classList.add('active');
      }
    });
    
    // Setup event listeners for elements injected by this component
    const hamburger = this.querySelector('#hamburger');
    const mobileMenu = this.querySelector('#mobileMenu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
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

    const nav = this.querySelector('#mainNav');
    if (nav) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      });
    }
  }
}
customElements.define('app-header', AppHeader);

class AppFooter extends HTMLElement {
  connectedCallback() {
      // Small variation on home page email newsletter form, but we'll use a generic footer
    this.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div class="footer__brand">
              <div class="footer-logo-text">🌿 Appleberry Stories</div>
              <p>Pure seeds, pure stories. Bringing the finest organic grains and seeds from responsible farmers to UK families since 2022.</p>
              <div class="footer__social">
                <a href="#" class="footer__social-link" aria-label="Instagram">📷</a>
                <a href="#" class="footer__social-link" aria-label="Facebook">📘</a>
                <a href="#" class="footer__social-link" aria-label="Twitter">🐦</a>
                <a href="#" class="footer__social-link" aria-label="Pinterest">📌</a>
              </div>
            </div>
            <div>
              <h4 class="footer__col-title">Quick Links</h4>
              <ul class="footer__links">
                <li><a href="/">Home</a></li>
                <li><a href="shop#shop-grid">Shop</a></li>
                <li><a href="about">About Us</a></li>
                <li><a href="values">Our Values</a></li>
                <li><a href="faqs">FAQs</a></li>
                <li><a href="contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 class="footer__col-title">Products</h4>
              <ul class="footer__links">
                <li><a href="shop#shop-grid">Organic Quinoa</a></li>
                <li><a href="shop#shop-grid">Golden Flaxseeds</a></li>
                <li><a href="shop#shop-grid">Chia Seeds</a></li>
                <li><a href="shop#shop-grid">Sunflower Seeds</a></li>
                <li><a href="shop#shop-grid">Pumpkin Seeds</a></li>
                <li><a href="shop#shop-grid">Super Seed Mix</a></li>
              </ul>
            </div>
            <div>
              <h4 class="footer__col-title">Contact</h4>
              <p class="footer__newsletter-text">Get recipes, tips, and exclusive deals straight to your inbox.</p>
              <div class="footer__mini-form">
                <input type="email" placeholder="Your email..." />
                <button>→</button>
              </div>
              <div style="margin-top: 24px;">
                <div class="footer__contact-item">📧 hello@appleberrystories.com</div>
                <div class="footer__contact-item">📍 Sale, Manchester</div>
                <div class="footer__contact-item">🕐 Mon-Fri, 9am – 5pm</div>
              </div>
            </div>
          </div>
          <div class="footer__bottom">
            <p>© 2026 Appleberry Stories. All rights reserved.</p>
            <div class="footer__bottom-links">
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define('app-footer', AppFooter);

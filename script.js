  /* ── GSAP REGISTER ─────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── PRODUCTS DATA ─────────────────────────────── */
  const products = {
    1: {
      id: 1,
      name: "The Mesh Bag",
      nameDisplay: "The Mesh Bag",
      price: 85000,
      priceFormatted: "\u20A685,000",
      image: "/img/midnight-mesh.png",
      description: "A shimmering lattice of Japanese Miyuki beads woven over a structured gold frame. The Mesh Bag catches light with every movement \u2014 a conversation starter, a wardrobe anchor. Comes with a detachable chain strap and velvet dust bag."
    },
    2: {
      id: 2,
      name: "2-Way Beaded Bag",
      nameDisplay: "2-Way Beaded Bag",
      price: 120000,
      priceFormatted: "\u20A6120,000",
      image: "/img/two-way-beaded.png",

      description: "The ultimate versatile piece \u2014 wear it as a clutch for evening events or attach the leather strap for daytime ease. Crafted in seed beads with a zig-zag geometric pattern inspired by Lagos street art. Limited pieces per season."
    },
    3: {
      id: 3,
      name: "Bloom Bag",
      nameDisplay: "Bloom Bag",
      price: 95000,
      priceFormatted: "\u20A695,000",
      image: "/img/bloom-bag.png",
      description: "A garden in your hand. The Bloom Bag features a hand-stitched floral motif in rose pink, ivory and sage beads across a soft structured body. Each flower takes approximately two hours to place. No two bags bloom the same."
    },
    4: {
      id: 4,
      name: "C\u0153ur Mini",
      nameDisplay: "C\u0153ur Mini",
      price: 75000,
      priceFormatted: "\u20A675,000",
      image: "/img/coeur-mini.png",
      description: "Our smallest statement. The C\u0153ur Mini is heart-shaped, fully beaded in champagne and blush tones, and finished with a vintage-style brass clasp. Perfect for evenings where all you need is your essentials and your confidence."
    }
  };

  /* ── CART STATE ─────────────────────────────────── */
  let cart = [];

  function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function formatPrice(n) {
    return "\u20A6" + n.toLocaleString('en-NG');
  }

  function addToCart(productId) {
    const product = products[productId];
    const existing = cart.find(i => i.id === productId);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    animateCartBadge();
    closeModal();
    openCart();
  }

  function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCartUI();
  }

  function changeQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    updateCartUI();
  }

  function updateCartUI() {
    const total = getCartTotal();
    const count = cart.reduce((s, i) => s + i.quantity, 0);

    // Badge
    const badge = document.getElementById('cart-badge');
    badge.textContent = count;

    // Cart items list
    const list = document.getElementById('cart-items-list');
    if (cart.length === 0) {
      list.innerHTML = `
        <div class="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <p>Your cart is empty.</p>
          <span style="font-size:0.82rem;color:#ccc;">Add a piece to begin.</span>
        </div>`;
    } else {
      list.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img class="cart-item-img" src="${item.image}" alt="${item.nameDisplay}"/>
          <div>
            <p class="cart-item-name">${item.nameDisplay}</p>
            <p class="cart-item-price">${formatPrice(item.price)}</p>
            <div class="qty-controls">
              <button class="qty-btn" onclick="changeQty(${item.id}, -1)">&#8722;</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn" onclick="changeQty(${item.id}, 1)">&#43;</button>
            </div>
          </div>
          <button class="remove-item" onclick="removeFromCart(${item.id})" aria-label="Remove">&#x2715;</button>
        </div>`).join('');
    }

    // Subtotal
    document.getElementById('cart-subtotal-val').textContent = formatPrice(total);

    // Checkout amount
    const amountEl = document.getElementById('checkout-amount');
    if (amountEl) amountEl.textContent = formatPrice(total);
  }

  function animateCartBadge() {
    const badge = document.getElementById('cart-badge');
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
  }

  /* ── CART OPEN / CLOSE ─────────────────────────── */
  function openCart() {
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('cart-open-btn').addEventListener('click', openCart);
  document.getElementById('cart-close-btn').addEventListener('click', closeCart);
  document.getElementById('cart-overlay').addEventListener('click', closeCart);

  /* ── MODAL ──────────────────────────────────────── */
  let currentModalProductId = null;

  function openModal(productId) {
    const p = products[productId];
    if (!p) return;
    currentModalProductId = productId;

    document.getElementById('modal-img').src = p.image;
    document.getElementById('modal-img').alt = p.nameDisplay;
    document.getElementById('modal-name').textContent = p.nameDisplay;
    document.getElementById('modal-desc').textContent = p.description;
    document.getElementById('modal-price').textContent = p.priceFormatted;

    const waMsg = encodeURIComponent("Hi, I'd like to order " + p.nameDisplay + " from STESSARA");
    document.getElementById('modal-whatsapp').href = "https://wa.me/2348000000000?text=" + waMsg;

    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
    currentModalProductId = null;
  }

  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  document.getElementById('modal-add-cart').addEventListener('click', function() {
    if (currentModalProductId) addToCart(currentModalProductId);
  });

  /* ── CHECKOUT ───────────────────────────────────── */
  let deliveryData = {};

  document.getElementById('checkout-open-btn').addEventListener('click', function() {
    if (cart.length === 0) return;
    closeCart();
    openCheckout();
  });

  function openCheckout() {
    document.getElementById('checkout-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    setStep(1);
  }

  function closeCheckout() {
    document.getElementById('checkout-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('checkout-close-btn').addEventListener('click', function() {
    closeCheckout();
    openCart();
  });

  function setStep(n) {
    document.querySelectorAll('.checkout-step').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.step-dot').forEach(el => el.classList.remove('active'));
    document.getElementById('step-' + n).classList.add('active');
    for (let i = 1; i <= n; i++) {
      document.getElementById('dot-' + i).classList.add('active');
    }
  }

  document.getElementById('step-1-continue').addEventListener('click', function() {
    const name    = document.getElementById('f-name').value.trim();
    const phone   = document.getElementById('f-phone').value.trim();
    const address = document.getElementById('f-address').value.trim();
    const city    = document.getElementById('f-city').value.trim();
    const state   = document.getElementById('f-state').value.trim();

    if (!name || !phone || !address || !city || !state) {
      alert('Please fill in all delivery details to continue.');
      return;
    }

    deliveryData = { name, phone, address, city, state };
    document.getElementById('checkout-amount').textContent = formatPrice(getCartTotal());

    const orderLines = cart.map(i => i.nameDisplay + ' x' + i.quantity + ' = ' + formatPrice(i.price * i.quantity)).join('%0A');
    const total = formatPrice(getCartTotal());
    const waMsg =
      'Hi STESSARA! I just placed an order:%0A%0A' +
      orderLines +
      '%0A%0ATotal: ' + total.replace('₦','NGN ') +
      '%0A%0ADelivery:%0AName: ' + encodeURIComponent(name) +
      '%0APhone: ' + encodeURIComponent(phone) +
      '%0AAddress: ' + encodeURIComponent(address + ', ' + city + ', ' + state) +
      '%0A%0APlease find my proof of payment attached.';

    document.getElementById('checkout-whatsapp').href = 'https://wa.me/2348000000000?text=' + waMsg;

    setStep(2);
    window.scrollTo(0, 0);
  });

  document.getElementById('step-2-back').addEventListener('click', function() {
    setStep(1);
  });

  /* ── FIRST VISIT POPUP ──────────────────────────── */
  function showPopup() {
    const overlay = document.getElementById('popup-overlay');
    overlay.classList.add('visible');
  }

  function hidePopup() {
    const overlay = document.getElementById('popup-overlay');
    overlay.classList.remove('visible');
    sessionStorage.setItem('steara_popup_seen', '1');
  }

  document.getElementById('popup-close-btn').addEventListener('click', hidePopup);
  document.getElementById('popup-shop-btn').addEventListener('click', function() {
    hidePopup();
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('popup-overlay').addEventListener('click', function(e) {
    if (e.target === this) hidePopup();
  });

  if (!sessionStorage.getItem('steara_popup_seen')) {
    setTimeout(showPopup, 1200);
  }

  /* ── HEADER SCROLL BORDER ───────────────────────── */
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── HAMBURGER ──────────────────────────────────── */
  document.getElementById('hamburger-btn').addEventListener('click', function() {
    document.getElementById('mobile-nav').classList.toggle('open');
  });
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobile-nav').classList.remove('open');
    });
  });

  /* ── GSAP HERO ANIMATION ────────────────────────── */
  gsap.fromTo('#hero-content', 
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out', delay: 0.3 }
  );
  gsap.fromTo('.hero-img-wrap img',
    { scale: 1.1 },
    { scale: 1.05, duration: 2, ease: 'power2.out', delay: 0.2 }
  );

  /* ── GSAP SCROLL TRIGGERS ───────────────────────── */
  // Featured header
  ScrollTrigger.create({
    trigger: '#featured-header',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to('#featured-header', {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out'
      });
    }
  });

  // Product cards stagger
  document.querySelectorAll('.product-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1, y: 0,
          duration: 0.9,
          delay: (i % 2) * 0.18,
          ease: 'power2.out'
        });
      }
    });
  });

  // About section
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.to('#about', { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' });
    }
  });

  // Pull quote
  ScrollTrigger.create({
    trigger: '#pull-quote',
    start: 'top 82%',
    once: true,
    onEnter: () => {
      gsap.to('#pull-quote', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
    }
  });

  // Generic fade sections
  document.querySelectorAll('.fade-section').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => el.classList.add('revealed')
    });
  });

  /* ── INIT ─────────────────────────────────────────── */
  updateCartUI();

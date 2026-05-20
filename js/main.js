// ===== PRODUCT DATA =====
// Products are loaded from the Products/ folder structure
// Each product has: id, name, category, price, originalPrice, badge, image
const products = [
    {
        id: 1,
        name: "Signature Tee",
        category: "signature",
        price: 1599,
        originalPrice: null,
        badge: "Signature",
        image: "Products/Signature/front.jpg"
    }
];

// ===== STATE =====
let cart = [];

// ===== DOM =====
const productGrid = document.getElementById('productGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const cartToggle = document.getElementById('cartToggle');
const cartClose = document.getElementById('cartClose');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const newsletterForm = document.getElementById('newsletterForm');

// ===== RENDER PRODUCTS =====
function renderProducts() {
    if (products.length === 0) {
        productGrid.innerHTML = '<p style="text-align:center; color: var(--gray); grid-column: 1/-1;">Collection coming soon.</p>';
        return;
    }

    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-bottom">
                    <span class="product-price">
                        ₹${product.price.toLocaleString()}
                        ${product.originalPrice ? `<span class="original">₹${product.originalPrice.toLocaleString()}</span>` : ''}
                    </span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})" aria-label="Add ${product.name} to cart">+</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== CART =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCart();
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">₹${item.price.toLocaleString()} × ${item.qty}</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove ${item.name}">&times;</button>
            </div>
        `).join('');
    }

    cartTotal.textContent = `₹${totalPrice.toLocaleString()}`;
}

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

// ===== EVENTS =====
cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Mobile menu
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// Newsletter
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const email = input.value;
    alert(`Welcome to the Selected. We'll reach you at ${email}`);
    input.value = '';
});

// Navbar shrink on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 80) {
        navbar.style.borderBottomColor = 'rgba(255,255,255,0.06)';
    } else {
        navbar.style.borderBottomColor = 'rgba(255,255,255,0.04)';
    }
});

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 200;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.querySelectorAll('a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Keyboard: close cart with Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCart();
        navLinks.classList.remove('open');
    }
});

// ===== INIT =====
renderProducts();

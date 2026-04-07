// PRODUCT DATABASE (12 items: 4 per category) — prices in BDT (Bangladeshi Taka)
const products = [
    // Fabrics — relevant images (textile, dress material)
    { id: 1, name: "Flowing Chiffon", price: 5299, image: "a1.jpg", category: "fabrics" },
    { id: 2, name: "Silk Satin Blend", price: 8490, image: "a2.jpg", category: "fabrics" },
    { id: 3, name: "Linen Cotton", price: 4299, image: "a3.jpg", category: "fabrics" },
    { id: 4, name: "Velvet Embroidery", price: 9999, image: "a4.jpg", category: "fabrics" },
    // Cosmetics — makeup, skincare
    { id: 5, name: "Matte Lipstick Set", price: 2999, image: "c1.jpg", category: "cosmetics" },
    { id: 6, name: "Hydrating Foundation", price: 3890, image: "c2.jpg", category: "cosmetics" },
    { id: 7, name: "Volumizing Mascara", price: 2190, image: "c3.jpg", category: "cosmetics" },
    { id: 8, name: "Rose Glow Palette", price: 3499, image: "c4.jpg", category: "cosmetics" },
    // Inner Garments — lingerie, seamless wear
    { id: 9, name: "Seamless Bralette", price: 2799, image: "i1.jpg", category: "inner" },
    { id: 10, name: "Cotton High-Waist", price: 2390, image: "i2.jpg", category: "inner" },
    { id: 11, name: "Lace Camisole", price: 3299, image: "i3.jpg", category: "inner" },
    { id: 12, name: "Soft Shapewear", price: 4199, image: "i4.jpg", category: "inner" }
];

// DOM Elements
const fabricsGrid = document.getElementById('fabricsGrid');
const cosmeticsGrid = document.getElementById('cosmeticsGrid');
const innerGrid = document.getElementById('innerGrid');

// Modal elements
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalProductImg');
const modalName = document.getElementById('modalProductName');
const modalPriceSpan = document.getElementById('modalProductPrice');
const sizeSelect = document.getElementById('sizeSelect');
const qtyInput = document.getElementById('qtyInput');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const modalTotalSpan = document.getElementById('modalTotal');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const closeModalBtn = document.querySelector('.close-modal');

let currentProduct = null;

// Helper: render products by category
function renderProducts() {
    fabricsGrid.innerHTML = '';
    const fabricsItems = products.filter(p => p.category === 'fabrics');
    fabricsItems.forEach(prod => createProductCard(prod, fabricsGrid));
    
    cosmeticsGrid.innerHTML = '';
    const cosmeticsItems = products.filter(p => p.category === 'cosmetics');
    cosmeticsItems.forEach(prod => createProductCard(prod, cosmeticsGrid));
    
    innerGrid.innerHTML = '';
    const innerItems = products.filter(p => p.category === 'inner');
    innerItems.forEach(prod => createProductCard(prod, innerGrid));
}

function createProductCard(product, container) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    
    card.innerHTML = `
        <img class="product-img" src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">৳ ${product.price.toFixed(2)}</div>
            <button class="order-btn" data-id="${product.id}">Order Now</button>
        </div>
    `;
    
    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('order-btn')) e.stopPropagation();
        openProductModal(product.id);
    });
    
    const orderBtn = card.querySelector('.order-btn');
    orderBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openProductModal(product.id);
    });
    
    container.appendChild(card);
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    currentProduct = product;
    modalImg.src = product.image;
    modalName.innerText = product.name;
    modalPriceSpan.innerText = `৳ ${product.price.toFixed(2)}`;
    qtyInput.value = 1;
    sizeSelect.value = 'M';
    updateModalTotal();
    modal.style.display = 'flex';
}

function updateModalTotal() {
    if (currentProduct) {
        const qty = parseInt(qtyInput.value);
        const total = currentProduct.price * qty;
        modalTotalSpan.innerText = total.toFixed(2);
    }
}

// Quantity controls
qtyPlus.addEventListener('click', () => {
    let val = parseInt(qtyInput.value);
    qtyInput.value = val + 1;
    updateModalTotal();
});
qtyMinus.addEventListener('click', () => {
    let val = parseInt(qtyInput.value);
    if (val > 1) {
        qtyInput.value = val - 1;
        updateModalTotal();
    }
});

// Place order with BDT summary
placeOrderBtn.addEventListener('click', () => {
    if (!currentProduct) return;
    const quantity = parseInt(qtyInput.value);
    const size = sizeSelect.value;
    const totalPrice = currentProduct.price * quantity;
    const summaryMsg = `🛍️ ORDER SUMMARY (BDT)\n\nProduct: ${currentProduct.name}\nSize: ${size}\nQuantity: ${quantity}\nTotal: ৳ ${totalPrice.toFixed(2)}\n\n✅ Your order has been placed! We'll contact you shortly via WhatsApp.`;
    alert(summaryMsg);
    modal.style.display = 'none';
});

// Close modal events
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// View All buttons
document.querySelectorAll('.btn-view-all').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const category = btn.getAttribute('data-category');
        let msg = '';
        if (category === 'fabrics') msg = '✨ More premium fabrics arriving soon! Stay tuned.';
        else if (category === 'cosmetics') msg = '💄 New vegan cosmetics launching next month!';
        else msg = '🌸 Extended innerwear collection coming soon.';
        alert(msg);
    });
});

// Smooth scrolling & hamburger menu
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navLinks');

function closeMobileMenu() {
    if (navMenu.classList.contains('active')) navMenu.classList.remove('active');
}

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        closeMobileMenu();
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

renderProducts();

document.querySelector('.btn-primary')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('fabrics').scrollIntoView({ behavior: 'smooth' });
});
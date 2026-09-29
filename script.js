// Data Produk Thrift Shop (Realistis streetwear & vintage)
const products = [
    {
        id: 1,
        name: "Vintage Stussy 90s Graphic Hoodie",
        category: "hoodie",
        price: 275000,
        condition: "Condition 95% (Mint)",
        size: "Size L",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Carhartt Detroit Active Workwear Jacket",
        category: "hoodie",
        price: 450000,
        condition: "Condition 92% (Washed)",
        size: "Size XL",
        image: "https://images.unsplash.com/photo-1548883354-7622d06aca27?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Nike Vintage Swoosh Oversized Windbreaker",
        category: "hoodie",
        price: 230000,
        condition: "Condition 96% (Like New)",
        size: "Size M",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Band Tee Nirvana In Utero Tour 1993",
        category: "tee",
        price: 185000,
        condition: "Condition 90% (Single Stitch)",
        size: "Size L",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Harley Davidson Flame Sleeve Vintage Tee",
        category: "tee",
        price: 195000,
        condition: "Condition 93% (Faded Black)",
        size: "Size M",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Dickies 874 Original Fit Work Pants",
        category: "cargo",
        price: 210000,
        condition: "Condition 95% (No Defect)",
        size: "Size 32",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Military Surplus Tactical Cargo Pants",
        category: "cargo",
        price: 240000,
        condition: "Condition 94% (Sturdy)",
        size: "Size 34",
        image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Supreme Box Logo Heavyweight Hoodie",
        category: "hoodie",
        price: 380000,
        condition: "Condition 97% (Collector Item)",
        size: "Size L",
        image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80"
    }
];

let cart = [];
const fallbackImage = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80';

function safeProductImage(imageUrl) {
    return imageUrl || fallbackImage;
}

function applyTheme(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('light-theme', isLight);

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        const label = themeToggle.querySelector('span');

        if (icon) {
            icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }

        if (label) {
            label.textContent = isLight ? 'Siang' : 'Malam';
        }
    }

    localStorage.setItem('hamzscondtrif_theme', theme);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('hamzscondtrif_theme') || 'dark';
    applyTheme(savedTheme);

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            applyTheme(nextTheme);
        });
    }
}

// DOM Elements
const productGrid = document.getElementById('productGrid');
const filterTabs = document.querySelectorAll('.filter-tab');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartFooter = document.getElementById('cartFooter');
const subtotalPrice = document.getElementById('subtotalPrice');
const shippingPrice = document.getElementById('shippingPrice');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

const qrisModal = document.getElementById('qrisModal');
const closeQris = document.getElementById('closeQris');
const qrisTotalAmount = document.getElementById('qrisTotalAmount');
const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
const walletOptions = document.querySelectorAll('.wallet-option');
const paymentDisplay = document.getElementById('paymentDisplay');
const selectedWalletLabel = document.getElementById('selectedWalletLabel');
const searchInput = document.getElementById('searchInput');
const featuredGrid = document.getElementById('featuredGrid');
const customerName = document.getElementById('customerName');
const customerPhone = document.getElementById('customerPhone');
const customerAddress = document.getElementById('customerAddress');

const successModal = document.getElementById('successModal');
const doneBtn = document.getElementById('doneBtn');
const cartStatusTracker = document.getElementById('cartStatusTracker');
const cartStatusText = document.getElementById('cartStatusText');
const successStatusText = document.getElementById('successStatusText');
const spinPromoBtn = document.getElementById('spinPromoBtn');
const spinModal = document.getElementById('spinModal');
const closeSpin = document.getElementById('closeSpin');
const spinWheelBtn = document.getElementById('spinWheelBtn');
const fortuneWheel = document.getElementById('fortuneWheel');
const spinResult = document.getElementById('spinResult');
const promoStatus = document.getElementById('promoStatus');
const adminWhatsappNumber = '6281234567890';
const orderStorageKey = 'hamzscondtrif_orders';

let promoDiscount = 0;
let wheelRotation = 0;

const walletPaymentMap = {
    qris: {
        label: 'Pembayaran via QRIS',
        type: 'qr',
        value: 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=hamzscondtrif_id%20payment',
        name: 'QRIS'
    },
    gopay: {
        label: 'Pembayaran via GoPay',
        type: 'number',
        value: '0812 3456 7890',
        name: 'GoPay'
    },
    ovo: {
        label: 'Pembayaran via OVO',
        type: 'number',
        value: '0821 9876 5432',
        name: 'OVO'
    },
    dana: {
        label: 'Pembayaran via DANA',
        type: 'number',
        value: '0857 1122 3344',
        name: 'DANA'
    }
};

// Format Rupiah helper
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function renderFeaturedProducts() {
    const featured = products.slice(0, 3);
    featuredGrid.innerHTML = '';

    featured.forEach(product => {
        const card = document.createElement('div');
        card.className = 'featured-card';
        const img = document.createElement('img');
        img.src = safeProductImage(product.image);
        img.alt = product.name;
        img.onerror = function () {
            this.onerror = null;
            this.src = fallbackImage;
        };

        const body = document.createElement('div');
        body.className = 'featured-body';
        body.innerHTML = `
            <span>${product.category.toUpperCase()}</span>
            <h4>${product.name}</h4>
            <strong>${formatRupiah(product.price)}</strong>
        `;

        card.appendChild(img);
        card.appendChild(body);
        featuredGrid.appendChild(card);
    });
}

// Render Produk ke Grid
function renderProducts(filter = 'all') {
    productGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'product-img-wrap';

        const badge = document.createElement('span');
        badge.className = 'condition-badge';
        badge.textContent = product.condition;

        const img = document.createElement('img');
        img.src = safeProductImage(product.image);
        img.alt = product.name;
        img.onerror = function () {
            this.onerror = null;
            this.src = fallbackImage;
        };

        imgWrap.appendChild(badge);
        imgWrap.appendChild(img);

        const info = document.createElement('div');
        info.className = 'product-info';
        info.innerHTML = `
            <span class="product-category">${product.category.toUpperCase()}</span>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-meta">${product.size}</div>
            <div class="product-footer">
                <span class="product-price">${formatRupiah(product.price)}</span>
            </div>
            <div class="product-action">
                <div class="quantity-control" aria-label="Jumlah barang">
                    <button class="qty-btn" type="button" onclick="changeQuantity(${product.id}, -1)">-</button>
                    <input id="qty-${product.id}" class="qty-input" type="number" min="1" max="10" value="1">
                    <button class="qty-btn" type="button" onclick="changeQuantity(${product.id}, 1)">+</button>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}, Number(document.getElementById('qty-${product.id}').value))">
                    <i class="fa-solid fa-cart-plus"></i> Simpan ke Keranjang
                </button>
            </div>
        `;

        card.appendChild(imgWrap);
        card.appendChild(info);
        productGrid.appendChild(card);
    });
}

function changeQuantity(productId, delta) {
    const input = document.getElementById(`qty-${productId}`);
    if (!input) return;

    const nextValue = Number(input.value || 1) + delta;
    input.value = Math.min(Math.max(nextValue, 1), 10);
}

// Filter Event Listeners
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filterValue = tab.getAttribute('data-filter');
        renderProducts(filterValue);
    });
});

searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
        const matchesSearch = product.name.toLowerCase().includes(keyword) || product.category.toLowerCase().includes(keyword);
        return matchesCategory && matchesSearch;
    });

    productGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'product-img-wrap';

        const badge = document.createElement('span');
        badge.className = 'condition-badge';
        badge.textContent = product.condition;

        const img = document.createElement('img');
        img.src = safeProductImage(product.image);
        img.alt = product.name;
        img.onerror = function () {
            this.onerror = null;
            this.src = fallbackImage;
        };

        imgWrap.appendChild(badge);
        imgWrap.appendChild(img);

        const info = document.createElement('div');
        info.className = 'product-info';
        info.innerHTML = `
            <span class="product-category">${product.category.toUpperCase()}</span>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-meta">${product.size}</div>
            <div class="product-footer">
                <span class="product-price">${formatRupiah(product.price)}</span>
            </div>
            <div class="product-action">
                <div class="quantity-control" aria-label="Jumlah barang">
                    <button class="qty-btn" type="button" onclick="changeQuantity(${product.id}, -1)">-</button>
                    <input id="qty-${product.id}" class="qty-input" type="number" min="1" max="10" value="1">
                    <button class="qty-btn" type="button" onclick="changeQuantity(${product.id}, 1)">+</button>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}, Number(document.getElementById('qty-${product.id}').value))">
                    <i class="fa-solid fa-cart-plus"></i> Simpan ke Keranjang
                </button>
            </div>
        `;

        card.appendChild(imgWrap);
        card.appendChild(info);
        productGrid.appendChild(card);
    });
});

function updatePromoStatus() {
    if (promoDiscount > 0) {
        promoStatus.textContent = `Diskon aktif: ${promoDiscount}% off`;
        return;
    }

    promoStatus.textContent = 'Belum ada potongan harga aktif';
}

function spinDiscountWheel() {
    if (promoDiscount > 0) {
        spinResult.textContent = `Kamu sudah punya diskon ${promoDiscount}%. Gunakan saat checkout.`;
        return;
    }

    const rewards = [5, 10, 15, 20];
    const rewardIndex = Math.floor(Math.random() * rewards.length);
    const reward = rewards[rewardIndex];

    const segmentAngle = 360 / rewards.length;
    const targetRotation = 360 * 6 + (360 - (rewardIndex * segmentAngle + segmentAngle / 2));
    wheelRotation += targetRotation;
    fortuneWheel.style.transform = `rotate(${wheelRotation}deg)`;

    promoDiscount = reward;
    spinResult.textContent = `Selamat! Kamu mendapatkan potongan harga ${reward}% untuk belanja thrift hari ini.`;
    updatePromoStatus();
    setTimeout(() => {
        spinModal.classList.remove('active');
    }, 1800);
}

// Tambah ke Keranjang
function addToCart(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const safeQty = Math.min(Math.max(Number(qty) || 1, 1), 10);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += safeQty;
        existingItem.quantity = Math.min(existingItem.quantity, 10);
    } else {
        cart.push({ ...product, quantity: safeQty });
    }

    updateCartUI();
    cartModal.classList.add('active');
}

// Hapus dari Keranjang
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update Tampilan Keranjang
function getOrderStatusText(status) {
    const statusMap = {
        Pending: 'Belum dikirim',
        Paid: 'Dikemas',
        Shipped: 'Dikirim'
    };
    return statusMap[status] || 'Belum dikirim';
}

function getOrderStatusClass(status) {
    const statusMap = {
        Pending: 'pending',
        Paid: 'packed',
        Shipped: 'shipped'
    };
    return statusMap[status] || 'pending';
}

function renderOrderStatusText() {
    const orders = JSON.parse(localStorage.getItem(orderStorageKey)) || [];
    const latestOrder = orders[0];
    const statusText = latestOrder ? getOrderStatusText(latestOrder.status) : 'Belum ada order';
    const statusClass = latestOrder ? getOrderStatusClass(latestOrder.status) : 'pending';

    if (cartStatusText) {
        cartStatusText.textContent = statusText;
        cartStatusText.className = `status-badge ${statusClass}`;
    }

    if (successStatusText) {
        successStatusText.textContent = statusText;
        successStatusText.className = `status-badge ${statusClass}`;
    }

    if (cartStatusTracker) {
        cartStatusTracker.style.display = 'block';
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    renderOrderStatusText();

    if (cart.length === 0) {
        const latestOrder = JSON.parse(localStorage.getItem(orderStorageKey) || '[]')[0];

        if (latestOrder) {
            const orderStatus = getOrderStatusText(latestOrder.status);
            const orderStatusClass = getOrderStatusClass(latestOrder.status);
            const statusMessage = latestOrder.status === 'Shipped'
                ? 'Produk Anda sudah dikirim dan sedang dalam perjalanan.'
                : latestOrder.status === 'Paid'
                    ? 'Produk Anda sedang dikemas dan siap dikirim.'
                    : 'Pesanan Anda masih menunggu diproses oleh admin.';

            const statusIcon = latestOrder.status === 'Shipped'
                ? '<i class="fa-solid fa-truck-fast"></i>'
                : latestOrder.status === 'Paid'
                    ? '<i class="fa-solid fa-box-open"></i>'
                    : '<i class="fa-solid fa-clock"></i>';

            cartItemsContainer.innerHTML = `
                <div class="checkout-status-card">
                    <div class="checkout-status-head">
                        <span class="status-chip ${orderStatusClass}">${statusIcon}${orderStatus}</span>
                        <span class="checkout-order-label">Order selesai</span>
                    </div>
                    <h4>Pesanan kamu sedang diproses</h4>
                    <p>${statusMessage}</p>
                    <div class="status-progress">
                        <span class="status-progress-step active">Dibuat</span>
                        <span class="status-progress-step ${latestOrder.status === 'Paid' || latestOrder.status === 'Shipped' ? 'active' : ''}">Dikemas</span>
                        <span class="status-progress-step ${latestOrder.status === 'Shipped' ? 'active' : ''}">Dikirim</span>
                    </div>
                </div>
            `;
        } else {
            cartItemsContainer.innerHTML = `<p class="empty-cart-text">Keranjang kamu masih kosong.</p>`;
        }

        cartFooter.style.display = latestOrder ? 'block' : 'none';
        subtotalPrice.textContent = 'Rp 0';
        shippingPrice.textContent = 'Rp 0';
        cartTotalPrice.textContent = 'Rp 0';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span>${formatRupiah(item.price)} x ${item.quantity}</span>
                </div>
            </div>
            <div class="cart-actions">
                <div class="mini-quantity-control">
                    <button type="button" class="mini-qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button type="button" class="mini-qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    const shipping = subtotal >= 500000 ? 0 : 25000;
    const total = subtotal + shipping;

    subtotalPrice.textContent = formatRupiah(subtotal);
    shippingPrice.textContent = shipping === 0 ? 'Gratis' : formatRupiah(shipping);
    cartTotalPrice.textContent = formatRupiah(total);
    cartFooter.style.display = 'block';
}

function updateCartQuantity(productId, delta) {
    const item = cart.find(entry => entry.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(entry => entry.id !== productId);
    }

    updateCartUI();
}

// Modal Controllers
cartBtn.addEventListener('click', () => cartModal.classList.add('active'));
closeCart.addEventListener('click', () => cartModal.classList.remove('active'));

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Keranjang masih kosong, silakan simpan produk terlebih dahulu.');
        return;
    }

    if (!customerName.value.trim() || !customerPhone.value.trim() || !customerAddress.value.trim()) {
        alert('Harap lengkapi nama, nomor WhatsApp, dan alamat pengiriman sebelum checkout.');
        return;
    }

    cartModal.classList.remove('active');
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let shipping = subtotal >= 500000 ? 0 : 25000;
    let discount = promoDiscount > 0 ? subtotal * (promoDiscount / 100) : 0;
    let total = Math.max(subtotal + shipping - discount, 0);

    qrisTotalAmount.textContent = formatRupiah(total);
    qrisModal.classList.add('active');
});

closeQris.addEventListener('click', () => qrisModal.classList.remove('active'));

function renderWalletPayment(selectedWallet) {
    const walletInfo = walletPaymentMap[selectedWallet];
    if (!walletInfo) return;

    selectedWalletLabel.textContent = walletInfo.label;

    if (walletInfo.type === 'qr') {
        paymentDisplay.innerHTML = `
            <div class="qr-code-box">
                <img src="${walletInfo.value}" alt="QR code ${walletInfo.label}">
            </div>
        `;
        return;
    }

    paymentDisplay.innerHTML = `
        <div class="wallet-number-box">
            <span>Nomor ${walletInfo.name}</span>
            <strong>${walletInfo.value}</strong>
            <button class="copy-number-btn" type="button">Salin Nomor</button>
        </div>
    `;

    const copyBtn = paymentDisplay.querySelector('.copy-number-btn');
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(walletInfo.value.replace(/\s+/g, ''));
            copyBtn.textContent = 'Nomor Tersalin';
            setTimeout(() => {
                copyBtn.textContent = 'Salin Nomor';
            }, 1200);
        } catch (error) {
            copyBtn.textContent = 'Gagal Salin';
        }
    });
}

walletOptions.forEach(option => {
    option.addEventListener('click', () => {
        walletOptions.forEach(btn => btn.classList.remove('active'));
        option.classList.add('active');

        const selectedWallet = option.dataset.wallet;
        renderWalletPayment(selectedWallet);
    });
});

function sendWhatsAppOrder() {
    if (cart.length === 0) return;

    const orderItems = cart.map(item => `- ${item.name} (${item.quantity}x)`).join('\n');
    const selectedWallet = document.querySelector('.wallet-option.active')?.dataset.wallet || 'gopay';
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const message = `Halo admin RE:THRIFT, saya ingin konfirmasi pesanan saya.\n\n` +
        `Nama: ${customerName.value.trim()}\n` +
        `WhatsApp: ${customerPhone.value.trim()}\n` +
        `Alamat: ${customerAddress.value.trim()}\n` +
        `Metode pembayaran: ${walletPaymentMap[selectedWallet]?.label || 'QRIS'}\n` +
        `Total: ${formatRupiah(total)}\n\n` +
        `Detail barang:\n${orderItems}\n\n` +
        `Apakah stok masih tersedia? Mohon konfirmasi ya.`;

    const waUrl = `https://wa.me/${adminWhatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
}

confirmPaymentBtn.addEventListener('click', () => {
    const selectedWallet = document.querySelector('.wallet-option.active')?.dataset.wallet || 'gopay';
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 500000 ? 0 : 25000;
    const discount = promoDiscount > 0 ? subtotal * (promoDiscount / 100) : 0;
    const total = Math.max(subtotal + shipping - discount, 0);

    const orderData = {
        id: Date.now(),
        customerName: customerName.value.trim(),
        customerPhone: customerPhone.value.trim(),
        customerAddress: customerAddress.value.trim(),
        paymentMethod: walletPaymentMap[selectedWallet]?.label || 'QRIS',
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        subtotal,
        shipping,
        discount,
        total,
        date: new Date().toISOString(),
        status: 'Pending'
    };

    const existingOrders = JSON.parse(localStorage.getItem(orderStorageKey)) || [];
    existingOrders.unshift(orderData);
    localStorage.setItem(orderStorageKey, JSON.stringify(existingOrders));
    renderOrderStatusText();

    sendWhatsAppOrder();
    qrisModal.classList.remove('active');
    successModal.classList.add('active');
    cart = [];
    promoDiscount = 0;
    updatePromoStatus();
    updateCartUI();
});

doneBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
});

spinPromoBtn.addEventListener('click', () => {
    spinModal.classList.add('active');
});

closeSpin.addEventListener('click', () => spinModal.classList.remove('active'));
spinWheelBtn.addEventListener('click', spinDiscountWheel);

// Tutup modal jika klik di luar kotak modal
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// Inisialisasi awal saat halaman dimuat
initializeTheme();
updatePromoStatus();
renderFeaturedProducts();
renderProducts();
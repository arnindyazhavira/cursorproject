// Sample product data
const products = [
    {
        id: 1,
        name: "Laptop Gaming Pro",
        price: 15000000,
        category: "electronics",
        image: "https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Laptop+Gaming",
        stock: 15,
        description: "Laptop gaming performa tinggi dengan GPU RTX 4060"
    },
    {
        id: 2,
        name: "Smartphone Android",
        price: 3500000,
        category: "electronics",
        image: "https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Smartphone",
        stock: 25,
        description: "Smartphone Android terbaru dengan kamera 108MP"
    },
    {
        id: 3,
        name: "Kemeja Pria Casual",
        price: 250000,
        category: "fashion",
        image: "https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Kemeja+Pria",
        stock: 50,
        description: "Kemeja pria casual nyaman dipakai sehari-hari"
    },
    {
        id: 4,
        name: "Dress Wanita Elegan",
        price: 450000,
        category: "fashion",
        image: "https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Dress+Wanita",
        stock: 30,
        description: "Dress wanita elegan untuk acara formal"
    },
    {
        id: 5,
        name: "Sofa Minimalis",
        price: 2500000,
        category: "home",
        image: "https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Sofa+Minimalis",
        stock: 8,
        description: "Sofa minimalis modern untuk ruang tamu"
    },
    {
        id: 6,
        name: "Lampu LED Modern",
        price: 150000,
        category: "home",
        image: "https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Lampu+LED",
        stock: 40,
        description: "Lampu LED modern hemat energi"
    },
    {
        id: 7,
        name: "Sepatu Running",
        price: 800000,
        category: "sports",
        image: "https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Sepatu+Running",
        stock: 20,
        description: "Sepatu running nyaman untuk olahraga"
    },
    {
        id: 8,
        name: "Dumbbell Set",
        price: 500000,
        category: "sports",
        image: "https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Dumbbell+Set",
        stock: 12,
        description: "Set dumbbell untuk latihan beban"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    updateCartCount();
    loadCartItems();
});

// Load featured products on homepage
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;

    const featuredProducts = products.slice(0, 4); // Show first 4 products
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">Rp ${formatPrice(product.price)}</div>
                <div class="product-stock">Stok: ${product.stock}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    loadCartItems();
    showNotification('Product added to cart!');
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    loadCartItems();
    showNotification('Product removed from cart!');
}

// Update product quantity in cart
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartCount();
        loadCartItems();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Load cart items in sidebar
function loadCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
        cartTotal.textContent = 'Rp 0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">Rp ${formatPrice(item.price)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Rp ${formatPrice(total)}`;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Filter products by category
function filterByCategory(category) {
    // This will be implemented in shop.html
    if (window.location.pathname.includes('shop.html')) {
        // Filter logic for shop page
        const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
        displayProducts(filteredProducts);
    } else {
        // Navigate to shop page with category filter
        window.location.href = `shop.html?category=${category}`;
    }
}

// Display products (for shop page)
function displayProducts(productsToShow) {
    const productsContainer = document.getElementById('productsGrid');
    if (!productsContainer) return;

    productsContainer.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">Rp ${formatPrice(product.price)}</div>
                <div class="product-stock">Stok: ${product.stock}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Search products
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
}

// Filter products by price range
function filterByPrice(minPrice, maxPrice) {
    const filteredProducts = products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );
    displayProducts(filteredProducts);
}

// Format price to Indonesian Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #E67E22;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Navigate to checkout
function goToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartSidebar && cartSidebar.classList.contains('active')) {
        if (!cartSidebar.contains(event.target) && !cartIcon.contains(event.target)) {
            cartSidebar.classList.remove('active');
        }
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    }
});
// Shop page specific functionality
let currentProducts = [...products];
let currentView = 'grid';

// Initialize shop page
document.addEventListener('DOMContentLoaded', function() {
    loadAllProducts();
    checkUrlParams();
});

// Load all products
function loadAllProducts() {
    displayProducts(currentProducts);
    updateProductsCount();
}

// Check URL parameters for category filter
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && category !== 'all') {
        // Set the radio button
        const radioButton = document.querySelector(`input[name="category"][value="${category}"]`);
        if (radioButton) {
            radioButton.checked = true;
            handleCategoryFilter();
        }
    }
}

// Handle search functionality
function handleSearch() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchQuery === '') {
        // If search is empty, apply current category filter
        handleCategoryFilter();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
    );
    
    currentProducts = filteredProducts;
    displayProducts(currentProducts);
    updateProductsCount();
}

// Handle category filter
function handleCategoryFilter() {
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    
    let filteredProducts = products;
    
    // Apply category filter
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter if there's a search query
    if (searchQuery !== '') {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery)
        );
    }
    
    currentProducts = filteredProducts;
    displayProducts(currentProducts);
    updateProductsCount();
}

// Handle price filter
function handlePriceFilter() {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    
    if (minPrice || maxPrice) {
        applyPriceFilter();
    }
}

// Apply price filter
function applyPriceFilter() {
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;
    
    let filteredProducts = products;
    
    // Apply category filter
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery !== '') {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery)
        );
    }
    
    // Apply price filter
    filteredProducts = filteredProducts.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );
    
    currentProducts = filteredProducts;
    displayProducts(currentProducts);
    updateProductsCount();
}

// Handle sorting
function handleSort() {
    const sortBy = document.getElementById('sortSelect').value;
    
    let sortedProducts = [...currentProducts];
    
    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Default sorting (by ID)
            sortedProducts.sort((a, b) => a.id - b.id);
    }
    
    displayProducts(sortedProducts);
}

// Toggle view between grid and list
function toggleView(view) {
    currentView = view;
    const productsGrid = document.getElementById('productsGrid');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Update active button
    viewButtons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.view-btn').classList.add('active');
    
    // Update grid class
    if (view === 'list') {
        productsGrid.classList.add('list-view');
    } else {
        productsGrid.classList.remove('list-view');
    }
    
    // Re-display products with current view
    displayProducts(currentProducts);
}

// Display products with current view
function displayProducts(productsToShow) {
    const productsContainer = document.getElementById('productsGrid');
    if (!productsContainer) return;

    if (currentView === 'list') {
        productsContainer.innerHTML = productsToShow.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-details">
                    <h3 class="product-title">${product.name}</h3>
                    <p style="color: #666; margin-bottom: 0.5rem;">${product.description}</p>
                    <div class="product-price">Rp ${formatPrice(product.price)}</div>
                    <div class="product-stock">Stok: ${product.stock}</div>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `).join('');
    } else {
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
}

// Update products count
function updateProductsCount() {
    const productsCount = document.getElementById('productsCount');
    if (productsCount) {
        productsCount.textContent = currentProducts.length;
    }
}

// Clear all filters
function clearFilters() {
    // Reset search
    document.getElementById('searchInput').value = '';
    
    // Reset category
    document.querySelector('input[name="category"][value="all"]').checked = true;
    
    // Reset price
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    
    // Reset sort
    document.getElementById('sortSelect').value = 'default';
    
    // Load all products
    currentProducts = [...products];
    displayProducts(currentProducts);
    updateProductsCount();
}

// Add clear filters button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add clear filters button to the filters sidebar
    const filtersSidebar = document.querySelector('.filters-sidebar');
    if (filtersSidebar) {
        const clearButton = document.createElement('button');
        clearButton.className = 'btn btn-outline btn-full';
        clearButton.textContent = 'Clear All Filters';
        clearButton.onclick = clearFilters;
        clearButton.style.marginTop = '1rem';
        
        filtersSidebar.appendChild(clearButton);
    }
});

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search
const debouncedSearch = debounce(handleSearch, 300);

// Update search input to use debounced search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debouncedSearch);
    }
});
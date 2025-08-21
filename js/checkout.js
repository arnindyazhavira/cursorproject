// Checkout page functionality
let shippingCost = 15000; // Default shipping cost in IDR

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    setupPaymentMethodHandlers();
    calculateTotals();
    
    // Check if cart is empty
    if (cart.length === 0) {
        window.location.href = 'shop.html';
        return;
    }
});

// Load order summary
function loadOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    if (!summaryItems) return;

    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="summary-item-details">
                <div class="summary-item-title">${item.name}</div>
                <div class="summary-item-price">Rp ${formatPrice(item.price)}</div>
                <div class="summary-item-quantity">Quantity: ${item.quantity}</div>
            </div>
        </div>
    `).join('');
}

// Calculate totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + shippingCost;

    document.getElementById('subtotal').textContent = `Rp ${formatPrice(subtotal)}`;
    document.getElementById('shipping').textContent = `Rp ${formatPrice(shippingCost)}`;
    document.getElementById('total').textContent = `Rp ${formatPrice(total)}`;
    document.getElementById('transferAmount').textContent = `Rp ${formatPrice(total)}`;
}

// Setup payment method handlers
function setupPaymentMethodHandlers() {
    const bankTransfer = document.getElementById('bankTransfer');
    const ewallet = document.getElementById('ewallet');
    const bankDetails = document.getElementById('bankDetails');
    const ewalletDetails = document.getElementById('ewalletDetails');

    bankTransfer.addEventListener('change', function() {
        if (this.checked) {
            bankDetails.style.display = 'block';
            ewalletDetails.style.display = 'none';
        }
    });

    ewallet.addEventListener('change', function() {
        if (this.checked) {
            ewalletDetails.style.display = 'block';
            bankDetails.style.display = 'none';
        }
    });
}

// Place order
function placeOrder(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const orderData = {
        customer: {
            fullName: formData.get('fullName'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            postalCode: formData.get('postalCode')
        },
        payment: {
            method: formData.get('paymentMethod'),
            ewalletType: formData.get('ewalletType')
        },
        orderNotes: formData.get('orderNotes'),
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        shipping: shippingCost,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + shippingCost,
        orderDate: new Date().toISOString(),
        orderNumber: generateOrderNumber(),
        status: 'pending'
    };

    // Validate form
    if (!validateOrderForm(orderData)) {
        return;
    }

    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;

    // Simulate order processing
    setTimeout(() => {
        // Save order to localStorage
        saveOrder(orderData);
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartCount();
        
        // Show success message
        showOrderSuccess(orderData.orderNumber);
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Validate order form
function validateOrderForm(orderData) {
    // Check if payment method is selected
    if (!orderData.payment.method) {
        showNotification('Please select a payment method', 'error');
        return false;
    }

    // Check if e-wallet type is selected when e-wallet is chosen
    if (orderData.payment.method === 'ewallet' && !orderData.payment.ewalletType) {
        showNotification('Please select an e-wallet type', 'error');
        return false;
    }

    // Validate required fields
    const requiredFields = ['fullName', 'phone', 'address', 'city', 'postalCode'];
    for (let field of requiredFields) {
        if (!orderData.customer[field] || orderData.customer[field].trim() === '') {
            showNotification(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
            return false;
        }
    }

    return true;
}

// Generate order number
function generateOrderNumber() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp.slice(-6)}-${random}`;
}

// Save order to localStorage
function saveOrder(orderData) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Show order success
function showOrderSuccess(orderNumber) {
    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Your order number is: <strong>${orderNumber}</strong></p>
            <p>We've sent you an email with order details and payment instructions.</p>
            <div class="success-actions">
                <a href="orders.html" class="btn btn-primary">View Orders</a>
                <a href="shop.html" class="btn btn-outline">Continue Shopping</a>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .success-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
        }
        .success-content {
            background-color: white;
            padding: 3rem;
            border-radius: 10px;
            text-align: center;
            max-width: 500px;
            margin: 1rem;
        }
        .success-icon {
            font-size: 4rem;
            color: #27ae60;
            margin-bottom: 1rem;
        }
        .success-content h2 {
            color: #2C3E50;
            margin-bottom: 1rem;
        }
        .success-content p {
            color: #666;
            margin-bottom: 1rem;
        }
        .success-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        @media (max-width: 480px) {
            .success-content {
                padding: 2rem 1rem;
            }
            .success-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(modal);

    // Remove modal after 10 seconds or when clicking outside
    setTimeout(() => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
            window.location.href = 'orders.html';
        }
    }, 10000);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
            window.location.href = 'orders.html';
        }
    });
}

// Show notification with type
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'error' ? '#e74c3c' : '#E67E22'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}

// Handle file upload preview
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('paymentProof');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Show file name
                const fileName = document.createElement('p');
                fileName.textContent = `Selected file: ${file.name}`;
                fileName.style.cssText = `
                    color: #27ae60;
                    font-size: 0.9rem;
                    margin-top: 0.5rem;
                `;
                
                const uploadSection = fileInput.parentElement;
                const existingFileName = uploadSection.querySelector('p');
                if (existingFileName) {
                    existingFileName.remove();
                }
                uploadSection.appendChild(fileName);
            }
        });
    }
});
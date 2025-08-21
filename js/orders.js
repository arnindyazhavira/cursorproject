// Orders page functionality

// Initialize orders page
document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
});

// Load orders from localStorage
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersList = document.getElementById('ordersList');
    
    if (!ordersList) return;

    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-orders">
                <i class="fas fa-shopping-bag"></i>
                <h3>No Orders Yet</h3>
                <p>You haven't placed any orders yet. Start shopping to see your order history here.</p>
                <a href="shop.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }

    // Sort orders by date (newest first)
    orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    ordersList.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div class="order-info">
                    <div class="order-number">${order.orderNumber}</div>
                    <div class="order-date">${formatDate(order.orderDate)}</div>
                </div>
                <div class="order-status ${order.status}">${getStatusText(order.status)}</div>
            </div>
            <div class="order-body">
                <div class="order-summary">
                    <div class="order-items-count">${order.items.length} item${order.items.length > 1 ? 's' : ''}</div>
                    <div class="order-total">Rp ${formatPrice(order.total)}</div>
                </div>
                <div class="order-actions">
                    <button class="btn btn-outline btn-small" onclick="viewOrderDetails('${order.orderNumber}')">
                        View Details
                    </button>
                    <button class="btn btn-primary btn-small" onclick="reorderItems('${order.orderNumber}')">
                        Reorder
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'pending': 'Menunggu Pembayaran',
        'processing': 'Diproses',
        'shipped': 'Dikirim',
        'completed': 'Selesai',
        'cancelled': 'Dibatalkan'
    };
    return statusMap[status] || status;
}

// View order details
function viewOrderDetails(orderNumber) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.orderNumber === orderNumber);
    
    if (!order) {
        showNotification('Order not found', 'error');
        return;
    }

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="order-details">
            <div class="order-detail-section">
                <h3><i class="fas fa-user"></i> Customer Information</h3>
                <p><strong>Name:</strong> ${order.customer.fullName}</p>
                <p><strong>Phone:</strong> ${order.customer.phone}</p>
                <p><strong>Address:</strong> ${order.customer.address}</p>
                <p><strong>City:</strong> ${order.customer.city}</p>
                <p><strong>Postal Code:</strong> ${order.customer.postalCode}</p>
            </div>
            <div class="order-detail-section">
                <h3><i class="fas fa-credit-card"></i> Payment Information</h3>
                <p><strong>Method:</strong> ${getPaymentMethodText(order.payment.method)}</p>
                ${order.payment.ewalletType ? `<p><strong>E-Wallet:</strong> ${order.payment.ewalletType.toUpperCase()}</p>` : ''}
                <p><strong>Status:</strong> <span class="order-status ${order.status}">${getStatusText(order.status)}</span></p>
                <p><strong>Order Date:</strong> ${formatDate(order.orderDate)}</p>
                ${order.orderNotes ? `<p><strong>Notes:</strong> ${order.orderNotes}</p>` : ''}
            </div>
        </div>
        
        <div class="order-items">
            <h3><i class="fas fa-shopping-bag"></i> Order Items</h3>
            ${order.items.map(item => `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="order-item-details">
                        <div class="order-item-title">${item.name}</div>
                        <div class="order-item-price">Rp ${formatPrice(item.price)}</div>
                        <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="order-totals">
            <h3><i class="fas fa-calculator"></i> Order Summary</h3>
            <div class="total-row">
                <span>Subtotal:</span>
                <span>Rp ${formatPrice(order.subtotal)}</span>
            </div>
            <div class="total-row">
                <span>Shipping:</span>
                <span>Rp ${formatPrice(order.shipping)}</span>
            </div>
            <div class="total-row final">
                <span>Total:</span>
                <span>Rp ${formatPrice(order.total)}</span>
            </div>
        </div>
    `;

    // Show modal
    const modal = document.getElementById('orderModal');
    modal.classList.add('active');
}

// Close order modal
function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('active');
}

// Get payment method text
function getPaymentMethodText(method) {
    const methodMap = {
        'bank': 'Bank Transfer',
        'ewallet': 'E-Wallet'
    };
    return methodMap[method] || method;
}

// Reorder items
function reorderItems(orderNumber) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.orderNumber === orderNumber);
    
    if (!order) {
        showNotification('Order not found', 'error');
        return;
    }

    // Clear current cart
    cart = [];
    
    // Add items from the order to cart
    order.items.forEach(item => {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        });
    });
    
    // Save cart
    saveCart();
    updateCartCount();
    loadCartItems();
    
    // Show notification
    showNotification('Items added to cart! You can now proceed to checkout.');
    
    // Close modal if open
    closeOrderModal();
}

// Show notification
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

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeOrderModal();
    }
});

// Update order status (for demo purposes)
function updateOrderStatus(orderNumber, newStatus) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = orders.findIndex(o => o.orderNumber === orderNumber);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders(); // Reload orders to show updated status
        showNotification('Order status updated successfully!');
    }
}

// Add demo orders if none exist (for testing)
function addDemoOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length === 0) {
        const demoOrders = [
            {
                orderNumber: 'ORD-123456-001',
                customer: {
                    fullName: 'John Doe',
                    phone: '+62 812-3456-7890',
                    address: 'Jl. Sudirman No. 123',
                    city: 'Jakarta',
                    postalCode: '12190'
                },
                payment: {
                    method: 'bank',
                    ewalletType: null
                },
                orderNotes: 'Please deliver in the morning',
                items: [
                    {
                        id: 1,
                        name: 'Laptop Gaming Pro',
                        price: 15000000,
                        image: 'https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Laptop+Gaming',
                        quantity: 1
                    }
                ],
                subtotal: 15000000,
                shipping: 15000,
                total: 15015000,
                orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                status: 'completed'
            },
            {
                orderNumber: 'ORD-123456-002',
                customer: {
                    fullName: 'John Doe',
                    phone: '+62 812-3456-7890',
                    address: 'Jl. Sudirman No. 123',
                    city: 'Jakarta',
                    postalCode: '12190'
                },
                payment: {
                    method: 'ewallet',
                    ewalletType: 'ovo'
                },
                orderNotes: '',
                items: [
                    {
                        id: 3,
                        name: 'Kemeja Pria Casual',
                        price: 250000,
                        image: 'https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Kemeja+Pria',
                        quantity: 2
                    },
                    {
                        id: 7,
                        name: 'Sepatu Running',
                        price: 800000,
                        image: 'https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Sepatu+Running',
                        quantity: 1
                    }
                ],
                subtotal: 1300000,
                shipping: 15000,
                total: 1315000,
                orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                status: 'shipped'
            }
        ];
        
        localStorage.setItem('orders', JSON.stringify(demoOrders));
        loadOrders();
    }
}

// Uncomment the line below to add demo orders for testing
// addDemoOrders();
// Cart Page JavaScript

// Cart state is managed in main.js. We access it via window.cart.
// The global window.cart is initialized in main.js
// We use a local constant 'cart' for convenience, which points to window.cart
const cart = window.cart;

function renderCart() {
    const cartLayout = document.getElementById('cartLayout');
    
    if (cart.length === 0) {
        cartLayout.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 40L20 90H100L90 40H30Z" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M40 40V30C40 20 48 12 58 12H62C72 12 80 20 80 30V40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                </div>
                <h2>Your cart is empty</h2>
                <p>Add some products to get started!</p>
                <a href="shop.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;
    
    cartLayout.innerHTML = `
        <div class="cart-items">
            <h2>Shopping Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
            ${cart.map((item, index) => `
                <div class="cart-item" data-item-index="${index}">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p class="item-price">£${item.price.toFixed(2)} each</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn increase-btn" data-index="${index}">+</button>
                        </div>
                    </div>
                    <div class="item-actions">
                        <span class="item-total">£${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-summary">
            <h2>Order Summary</h2>
            <div class="summary-row subtotal">
                <span>Subtotal:</span>
                <span>£${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'FREE' : '£' + shipping.toFixed(2)}</span>
            </div>
            ${shipping > 0 ? '<p style="font-size: 0.85rem; color: var(--text-light); margin-top: 10px;">Free shipping on orders over £50</p>' : ''}
            <div class="summary-row total">
                <span>Total:</span>
                <span>£${total.toFixed(2)}</span>
            </div>
            <button class="btn btn-primary checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
            <a href="shop.html" class="continue-shopping">← Continue Shopping</a>
        </div>
    `;
    
    // Attach event listeners
    attachCartEventListeners();
}

function attachCartEventListeners() {
    // Increase quantity
    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            cart[index].quantity += 1;
            saveAndRender();
        });
    });
    
    // Decrease quantity
    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                removeItem(index);
                return;
            }
            saveAndRender();
        });
    });
    
    // Remove item
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (confirm('Remove this item from cart?')) {
                removeItem(index);
            }
        });
    });
}

function removeItem(index) {
    cart.splice(index, 1);
    saveAndRender();
    window.showNotification('Item removed from cart');
}

function saveAndRender() {
    localStorage.setItem('omoola_cart', JSON.stringify(cart));
    window.updateCartCount();
    renderCart();
}

function proceedToCheckout() {
    if (cart.length === 0) {
        window.showNotification('Your cart is empty', 'error');
        return;
    }
    
    // In a real application, this would redirect to checkout page
    window.showNotification('Checkout functionality coming soon!');
    // window.location.href = 'checkout.html';
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    // Ensure window.cart is available before using it
    if (window.cart) {
        renderCart();
    } else {
        // Fallback or wait for main.js to load, though main.js should load first
        console.error("window.cart not found. main.js may not have loaded correctly.");
    }
});

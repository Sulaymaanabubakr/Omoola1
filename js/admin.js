// Admin Dashboard JavaScript
let db, auth, storage;
let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
    if (typeof firebase !== 'undefined' && window.firebaseConfig) {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(window.firebaseConfig);
            }
            db = firebase.firestore();
            auth = firebase.auth();
            console.log('Firebase initialized in admin');
            
            // Check authentication
            auth.onAuthStateChanged(user => {
                if (user) {
                    currentUser = user;
                    checkAdminAccess(user);
                } else {
                    // For demo purposes, allow access
                    loadDashboardData();
                    // In production: window.location.href = '../index.html';
                }
            });
        } catch (error) {
            console.error('Firebase initialization error:', error);
            loadDashboardData();
        }
    } else {
        loadDashboardData();
    }
});

// Check if user has admin access
async function checkAdminAccess(user) {
    try {
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists && userDoc.data().role === 'admin') {
            document.getElementById('adminUserEmail').textContent = user.email;
            loadDashboardData();
        } else {
            // For demo, still allow access
            document.getElementById('adminUserEmail').textContent = 'Demo Admin';
            loadDashboardData();
            // In production: alert('Access denied. Admin privileges required.');
            // window.location.href = '../index.html';
        }
    } catch (error) {
        console.error('Error checking admin access:', error);
        document.getElementById('adminUserEmail').textContent = 'Demo Admin';
        loadDashboardData();
    }
}

// Load dashboard data
async function loadDashboardData() {
    try {
        if (db) {
            // Load from Firestore
            const [productsSnap, ordersSnap, usersSnap] = await Promise.all([
                db.collection('products').get(),
                db.collection('orders').get(),
                db.collection('users').get()
            ]);
            
            // Update stats
            document.getElementById('totalProducts').textContent = productsSnap.size;
            document.getElementById('totalOrders').textContent = ordersSnap.size;
            document.getElementById('totalUsers').textContent = usersSnap.size;
            
            // Calculate revenue
            let totalRevenue = 0;
            ordersSnap.forEach(doc => {
                const order = doc.data();
                if (order.total) totalRevenue += order.total;
            });
            document.getElementById('totalRevenue').textContent = `₦${totalRevenue.toLocaleString()}`;
            
            // Load recent orders
            loadRecentOrders(ordersSnap);
            
            // Load recent products
            loadRecentProducts(productsSnap);
        } else {
            // Use demo data
            loadDemoData();
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        loadDemoData();
    }
}

// Load demo data
function loadDemoData() {
    document.getElementById('totalProducts').textContent = '24';
    document.getElementById('totalOrders').textContent = '156';
    document.getElementById('totalUsers').textContent = '1,234';
    document.getElementById('totalRevenue').textContent = '₦2,456,000';
    
    // Demo orders
    const demoOrders = [
        { id: 'ORD001', customer: 'John Doe', date: '2024-11-15', total: 15000, status: 'pending' },
        { id: 'ORD002', customer: 'Jane Smith', date: '2024-11-14', total: 8500, status: 'processing' },
        { id: 'ORD003', customer: 'Mike Johnson', date: '2024-11-14', total: 22000, status: 'completed' },
        { id: 'ORD004', customer: 'Sarah Williams', date: '2024-11-13', total: 12500, status: 'pending' },
        { id: 'ORD005', customer: 'David Brown', date: '2024-11-13', total: 9000, status: 'completed' }
    ];
    
    displayRecentOrders(demoOrders);
    
    // Demo products
    const demoProducts = [
        { name: 'Paracetamol 500mg', category: 'Medicines', price: 1500, stock: 500, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100' },
        { name: 'Vitamin C Tablets', category: 'Health', price: 3500, stock: 250, image: 'https://images.unsplash.com/photo-1550572017-4257b39c8c44?w=100' },
        { name: 'Hand Sanitizer 500ml', category: 'Health', price: 2000, stock: 300, image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=100' },
        { name: 'Organic Honey 500g', category: 'Groceries', price: 5000, stock: 150, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784691?w=100' },
        { name: 'Blood Pressure Monitor', category: 'Health', price: 15000, stock: 75, image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=100' }
    ];
    
    displayRecentProducts(demoProducts);
}

// Load recent orders from Firestore
function loadRecentOrders(snapshot) {
    const orders = [];
    snapshot.forEach(doc => {
        orders.push({ id: doc.id, ...doc.data() });
    });
    
    // Sort by date and take latest 5
    orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    displayRecentOrders(orders.slice(0, 5));
}

// Display recent orders
function displayRecentOrders(orders) {
    const tbody = document.getElementById('recentOrdersTable');
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No orders yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    orders.forEach(order => {
        const tr = document.createElement('tr');
        const statusColor = {
            'pending': 'var(--warning)',
            'processing': 'var(--primary-color)',
            'completed': 'var(--success)',
            'cancelled': 'var(--danger)'
        };
        
        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customerInfo?.name || order.customer || 'N/A'}</td>
            <td>${new Date(order.orderDate || order.date).toLocaleDateString()}</td>
            <td>₦${(order.total || 0).toLocaleString()}</td>
            <td><span style="color: ${statusColor[order.status] || 'var(--gray)'}; font-weight: 600;">${order.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewOrder('${order.id}')">View</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Load recent products from Firestore
function loadRecentProducts(snapshot) {
    const products = [];
    snapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
    });
    
    displayRecentProducts(products.slice(0, 5));
}

// Display recent products
function displayRecentProducts(products) {
    const tbody = document.getElementById('recentProductsTable');
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">No products yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₦${(product.price || 0).toLocaleString()}</td>
            <td>${product.stock || 0}</td>
        `;
        tbody.appendChild(tr);
    });
}

// View order details
function viewOrder(orderId) {
    window.location.href = `orders.html?id=${orderId}`;
}

// Handle logout
function handleLogout() {
    if (auth) {
        auth.signOut().then(() => {
            window.location.href = '../index.html';
        }).catch(error => {
            console.error('Logout error:', error);
            window.location.href = '../index.html';
        });
    } else {
        window.location.href = '../index.html';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '250px';
    notification.style.animation = 'slideDown 0.3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

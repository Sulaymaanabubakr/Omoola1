// Admin Dashboard JavaScript

// Section Navigation
const navItems = document.querySelectorAll('.nav-item[data-section]');
const sections = document.querySelectorAll('.admin-section');
const pageTitle = document.getElementById('pageTitle');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.dataset.section;
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Show selected section
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
        
        // Update page title
        const titleText = item.querySelector('span').textContent;
        pageTitle.textContent = titleText;
    });
});

// Logout functionality
const logoutBtn = document.querySelector('.logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        if (confirm('Are you sure you want to logout?')) {
            // In a real application, you would sign out from Firebase
            window.showNotification('Logged out successfully');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    });
}

// Simple chart for demo (you would use Chart.js in production)
const salesChart = document.getElementById('salesChart');
if (salesChart) {
    const ctx = salesChart.getContext('2d');
    
    // Simple bar chart visualization
    const data = [120, 190, 300, 500, 200, 300, 450];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const max = Math.max(...data);
    
    salesChart.width = salesChart.parentElement.clientWidth;
    salesChart.height = 300;
    
    const barWidth = salesChart.width / data.length - 20;
    const barSpacing = 20;
    
    ctx.fillStyle = '#2C5F2D';
    
    data.forEach((value, index) => {
        const barHeight = (value / max) * (salesChart.height - 50);
        const x = index * (barWidth + barSpacing) + barSpacing;
        const y = salesChart.height - barHeight - 30;
        
        // Draw bar
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = '#666';
        ctx.font = '12px Lato';
        ctx.textAlign = 'center';
        ctx.fillText(labels[index], x + barWidth / 2, salesChart.height - 10);
        
        // Draw value
        ctx.fillText('£' + value, x + barWidth / 2, y - 5);
        
        ctx.fillStyle = '#2C5F2D';
    });
}

// Table search functionality
const searchInputs = document.querySelectorAll('.search-input');
searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const table = e.target.closest('.admin-section').querySelector('.data-table tbody');
        
        if (table) {
            const rows = table.querySelectorAll('tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        }
    });
});

// Filter select functionality
const filterSelects = document.querySelectorAll('.filter-select');
filterSelects.forEach(select => {
    select.addEventListener('change', (e) => {
        const filterValue = e.target.value.toLowerCase();
        const table = e.target.closest('.admin-section').querySelector('.data-table tbody');
        
        if (table) {
            const rows = table.querySelectorAll('tr');
            rows.forEach(row => {
                if (filterValue === 'all orders') {
                    row.style.display = '';
                } else {
                    const statusBadge = row.querySelector('.status-badge');
                    const statusText = statusBadge ? statusBadge.textContent.toLowerCase() : '';
                    row.style.display = statusText === filterValue ? '' : 'none';
                }
            });
        }
    });
});

// Action button handlers (demo)
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        window.showNotification(`${action} functionality coming soon!`);
    });
});

console.log('Admin dashboard loaded successfully');

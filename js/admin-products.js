// Admin Products Management
let products = [];
let editingProductId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupProductForm();
});

// Load all products
async function loadProducts() {
    try {
        if (typeof firebase !== 'undefined' && db) {
            const snapshot = await db.collection('products').get();
            products = [];
            snapshot.forEach(doc => {
                products.push({ id: doc.id, ...doc.data() });
            });
            displayProducts();
        } else {
            loadDemoProducts();
        }
    } catch (error) {
        console.error('Error loading products:', error);
        loadDemoProducts();
    }
}

// Load demo products
function loadDemoProducts() {
    products = [
        {
            id: 'prod1',
            name: 'Paracetamol 500mg',
            category: 'Medicines',
            price: 1500,
            stock: 500,
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
            featured: true,
            bestSeller: false,
            description: 'Effective pain relief and fever reducer'
        },
        {
            id: 'prod2',
            name: 'Vitamin C Tablets',
            category: 'Health',
            price: 3500,
            stock: 250,
            image: 'https://images.unsplash.com/photo-1550572017-4257b39c8c44?w=400',
            featured: true,
            bestSeller: false,
            description: 'Immune system support'
        },
        {
            id: 'prod3',
            name: 'Hand Sanitizer 500ml',
            category: 'Health',
            price: 2000,
            stock: 300,
            image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400',
            featured: false,
            bestSeller: true,
            description: 'Antibacterial hand sanitizer'
        }
    ];
    displayProducts();
}

// Display products in table
function displayProducts() {
    const tbody = document.getElementById('productsTable');
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem;">No products found. Add your first product!</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₦${product.price.toLocaleString()}</td>
            <td>${product.stock}</td>
            <td>${product.featured ? '⭐' : '-'}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editProduct('${product.id}')" style="margin-right: 0.5rem;">Edit</button>
                <button class="btn btn-sm" style="background-color: var(--danger); color: white;" onclick="deleteProduct('${product.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Setup product form
function setupProductForm() {
    const form = document.getElementById('productForm');
    form.addEventListener('submit', handleProductSubmit);
}

// Open add product modal
function openAddProductModal() {
    editingProductId = null;
    document.getElementById('modalTitle').textContent = 'Add New Product';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productModal').classList.add('active');
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    editingProductId = null;
}

// Edit product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    editingProductId = productId;
    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = productId;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productImage').value = product.image;
    document.getElementById('productFeatured').checked = product.featured || false;
    document.getElementById('productBestSeller').checked = product.bestSeller || false;
    
    document.getElementById('productModal').classList.add('active');
}

// Handle product form submission
async function handleProductSubmit(e) {
    e.preventDefault();
    
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value,
        featured: document.getElementById('productFeatured').checked,
        bestSeller: document.getElementById('productBestSeller').checked,
        rating: 5,
        reviews: 0,
        updatedAt: new Date().toISOString()
    };
    
    try {
        if (typeof firebase !== 'undefined' && db) {
            if (editingProductId) {
                // Update existing product
                await db.collection('products').doc(editingProductId).update(productData);
                showNotification('Product updated successfully!', 'success');
            } else {
                // Add new product
                productData.createdAt = new Date().toISOString();
                await db.collection('products').add(productData);
                showNotification('Product added successfully!', 'success');
            }
        } else {
            // Demo mode - simulate save
            if (editingProductId) {
                const index = products.findIndex(p => p.id === editingProductId);
                if (index !== -1) {
                    products[index] = { ...products[index], ...productData };
                }
                showNotification('Product updated successfully! (Demo Mode)', 'success');
            } else {
                productData.id = 'prod' + Date.now();
                products.push(productData);
                showNotification('Product added successfully! (Demo Mode)', 'success');
            }
            displayProducts();
        }
        
        closeProductModal();
        loadProducts();
    } catch (error) {
        console.error('Error saving product:', error);
        showNotification('Error saving product. Please try again.', 'danger');
    }
}

// Delete product
async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    try {
        if (typeof firebase !== 'undefined' && db) {
            await db.collection('products').doc(productId).delete();
            showNotification('Product deleted successfully!', 'success');
        } else {
            // Demo mode
            products = products.filter(p => p.id !== productId);
            showNotification('Product deleted successfully! (Demo Mode)', 'success');
            displayProducts();
        }
        
        loadProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        showNotification('Error deleting product. Please try again.', 'danger');
    }
}

// Cloudinary image upload (optional)
function initCloudinaryWidget() {
    if (typeof cloudinary !== 'undefined' && window.cloudinaryConfig) {
        const widget = cloudinary.createUploadWidget({
            cloudName: window.cloudinaryConfig.cloudName,
            uploadPreset: window.cloudinaryConfig.uploadPreset
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                document.getElementById('productImage').value = result.info.secure_url;
                showNotification('Image uploaded successfully!', 'success');
            }
        });
        
        // Add button to open widget
        const imageInput = document.getElementById('productImage');
        const uploadBtn = document.createElement('button');
        uploadBtn.type = 'button';
        uploadBtn.className = 'btn btn-secondary btn-sm';
        uploadBtn.textContent = 'Upload Image';
        uploadBtn.style.marginTop = '0.5rem';
        uploadBtn.onclick = () => widget.open();
        imageInput.parentNode.appendChild(uploadBtn);
    }
}

// Initialize Cloudinary widget if available
setTimeout(initCloudinaryWidget, 1000);

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        closeProductModal();
    }
});

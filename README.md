# Omoola Pharmacy & Stores

A fully functional, professional e-commerce platform for medicines, health products, and groceries. Built with HTML, CSS, and Vanilla JavaScript, integrated with Firebase for authentication and Firestore database, and Cloudinary for image storage.

## 🌟 Features

### Frontend
- **Modern, Responsive Design**: Mobile-first design that works perfectly on all devices
- **Homepage**: Hero section, featured products, categories, testimonials, newsletter signup
- **Product Catalog**: Complete shop with search, filters, and sorting functionality
- **Product Details**: Individual product pages with descriptions, ratings, and related products
- **Shopping Cart**: Full cart functionality with add, remove, update quantity
- **Checkout**: Secure checkout form with order submission
- **Static Pages**: About Us, Contact Us with forms

### Admin Dashboard
- **Dashboard Overview**: Statistics on products, orders, users, and revenue
- **Product Management**: Add, edit, delete products with Cloudinary image uploads
- **Order Management**: View orders, update order status, order details
- **Category Management**: Manage product categories
- **User Management**: View users, manage roles
- **Firebase Authentication**: Secure admin access

### Technical Features
- Semantic HTML5
- Modern CSS (Flexbox/Grid)
- Vanilla JavaScript (ES6+)
- Firebase Integration (Auth, Firestore)
- Cloudinary Integration for images
- Responsive design
- Smooth animations and transitions
- SEO optimized with meta tags
- Demo data for testing without Firebase

## 📁 Project Structure

```
Omoola1/
├── index.html              # Homepage
├── shop.html              # Product catalog
├── product.html           # Product details page
├── cart.html              # Shopping cart
├── about.html             # About page
├── contact.html           # Contact page
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   ├── config.js          # Firebase/Cloudinary configuration
│   ├── main.js            # Main frontend JavaScript
│   ├── shop.js            # Shop page functionality
│   ├── cart.js            # Cart functionality
│   ├── product.js         # Product page functionality
│   ├── admin.js           # Admin dashboard JavaScript
│   └── admin-products.js  # Admin product management
├── admin/
│   ├── index.html         # Admin dashboard
│   ├── products.html      # Product management
│   ├── orders.html        # Order management
│   ├── categories.html    # Category management
│   └── users.html         # User management
├── assets/
│   ├── images/            # Image assets
│   └── icons/             # Icon assets
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore file
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- (Optional) Firebase account for backend functionality
- (Optional) Cloudinary account for image uploads

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akinwale10/Omoola1.git
   cd Omoola1
   ```

2. **Configure Firebase (Optional)**
   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable Firestore Database and Authentication
   - Copy your Firebase configuration
   - Update `js/config.js` with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```

3. **Configure Cloudinary (Optional)**
   - Create a Cloudinary account at [https://cloudinary.com](https://cloudinary.com)
   - Get your cloud name and create an upload preset
   - Update `js/config.js` with your Cloudinary credentials:
   ```javascript
   const cloudinaryConfig = {
       cloudName: "YOUR_CLOUD_NAME",
       uploadPreset: "YOUR_UPLOAD_PRESET"
   };
   ```

4. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
   - Navigate to `http://localhost:8000`

## 📦 Demo Mode

The application works in demo mode without Firebase/Cloudinary configuration:
- Demo products are displayed on the homepage and shop page
- Cart functionality works with localStorage
- Admin dashboard shows demo data
- Forms submit successfully with demo responses

## 🎨 Design Features

- **Color Scheme**: Professional blue and teal color palette
- **Typography**: Google Fonts (Lato, Montserrat)
- **Images**: High-quality Unsplash images
- **Icons**: SVG icons for categories and actions
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile, tablet, and desktop layouts

## 🔐 Admin Access

To access the admin dashboard:
1. Navigate to `/admin/index.html`
2. In production, Firebase Authentication is required
3. In demo mode, access is granted automatically

Admin features:
- View dashboard statistics
- Manage products (add, edit, delete)
- View and manage orders
- Manage categories
- View users and manage roles

## 📝 Firestore Database Structure

```
collections/
├── products/
│   ├── id (auto-generated)
│   ├── name
│   ├── category
│   ├── price
│   ├── stock
│   ├── description
│   ├── image
│   ├── featured
│   ├── bestSeller
│   ├── rating
│   └── reviews
├── orders/
│   ├── id (auto-generated)
│   ├── customerInfo
│   ├── items
│   ├── subtotal
│   ├── shipping
│   ├── tax
│   ├── total
│   ├── status
│   └── orderDate
├── users/
│   ├── uid (from Firebase Auth)
│   ├── email
│   ├── role (customer/admin)
│   └── createdAt
├── newsletter/
│   ├── email
│   └── subscribedAt
└── messages/
    ├── name
    ├── email
    ├── phone
    ├── subject
    ├── message
    └── timestamp
```

## 🛠️ Customization

### Adding Products
1. Go to Admin Dashboard > Products
2. Click "Add New Product"
3. Fill in product details
4. Upload image via Cloudinary or provide URL
5. Save

### Styling
- Main styles are in `css/styles.css`
- CSS variables for easy customization:
  - `--primary-color`: Main brand color
  - `--secondary-color`: Secondary brand color
  - `--accent-color`: Accent/CTA color
  - Font families, spacing, shadows, etc.

### Adding Pages
1. Create new HTML file
2. Copy navigation and footer from existing pages
3. Add custom content
4. Link from navigation menu

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Akinwale10 - Initial work

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons designed using SVG
- Google Fonts for typography
- Firebase for backend services
- Cloudinary for image management

## 📧 Contact

For questions or support, please contact:
- Email: info@omoola.com
- Website: [Omoola Pharmacy & Stores](https://github.com/Akinwale10/Omoola1)

## 🚀 Deployment

### Deploy to GitHub Pages
1. Go to repository settings
2. Enable GitHub Pages
3. Select source branch
4. Your site will be available at `https://akinwale10.github.io/Omoola1/`

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Configure build settings (not needed for static site)
3. Deploy

### Deploy to Vercel
1. Import project from GitHub
2. Configure and deploy

---

**Note**: This is a demonstration project. For production use, implement proper security measures, use environment variables for API keys, and add server-side validation.
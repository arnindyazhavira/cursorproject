# Simple E-Commerce Website

A modern, responsive e-commerce website built with HTML5, CSS3, and JavaScript. This project implements a complete online shopping experience with product browsing, cart management, checkout process, and order tracking.

## 🚀 Features

### Customer Features
- **Product Catalog**: Browse products with search and filtering
- **Shopping Cart**: Add/remove items with quantity management
- **Checkout Process**: Complete purchase with shipping and payment options
- **Order History**: View past orders and track order status
- **User Authentication**: Register and login functionality
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Product Management
- **Product Categories**: Electronics, Fashion, Home & Living, Sports
- **Search & Filter**: Find products by name, category, and price range
- **Product Details**: View product information, images, and stock status
- **Grid/List View**: Toggle between different product display modes

### Shopping Experience
- **Cart Sidebar**: Real-time cart updates with item management
- **Checkout Form**: Complete shipping and payment information
- **Payment Methods**: Bank transfer and e-wallet options
- **Order Confirmation**: Success notifications and order tracking

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Flexbox and Grid
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Poppins)
- **Storage**: LocalStorage for data persistence
- **Responsive**: Mobile-first design approach

## 📁 Project Structure

```
simple-ecommerce/
├── index.html              # Homepage
├── shop.html               # Product listing page
├── checkout.html           # Checkout page
├── orders.html             # Order history page
├── login.html              # Login page
├── register.html           # Registration page
├── css/
│   ├── style.css           # Main stylesheet
│   ├── shop.css            # Shop page styles
│   ├── checkout.css        # Checkout page styles
│   ├── orders.css          # Orders page styles
│   └── auth.css            # Authentication styles
├── js/
│   ├── app.js              # Main application logic
│   ├── shop.js             # Shop functionality
│   ├── checkout.js         # Checkout functionality
│   ├── orders.js           # Orders functionality
│   └── auth.js             # Authentication functionality
└── README.md               # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: #E67E22 (Orange)
- **Secondary**: #2C3E50 (Navy Blue)
- **Background**: #f8f9fa (Light Gray)
- **Text**: #333333 (Dark Gray)
- **Success**: #27ae60 (Green)
- **Error**: #e74c3c (Red)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Buttons**: Rounded corners with hover effects
- **Cards**: Shadow effects with smooth transitions
- **Forms**: Clean design with validation states
- **Navigation**: Sticky header with mobile menu

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start exploring the e-commerce features

### Development Setup
For the best development experience:
1. Use a local web server (e.g., Live Server in VS Code)
2. Open the project in your preferred code editor
3. Make changes and refresh the browser to see updates

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1200px+ (3-column product grid)
- **Tablet**: 768px - 1199px (2-column product grid)
- **Mobile**: 320px - 767px (1-column product grid)

## 🛒 Shopping Flow

1. **Browse Products**: Visit the shop page to see all products
2. **Add to Cart**: Click "Add to Cart" on any product
3. **Manage Cart**: Use the cart sidebar to adjust quantities
4. **Checkout**: Click "Checkout" to proceed to payment
5. **Complete Order**: Fill shipping details and choose payment method
6. **Order Confirmation**: Receive order number and confirmation
7. **Track Orders**: View order history and status

## 🔐 Authentication

### Demo Credentials
- **Email**: john@example.com
- **Password**: password123

### Features
- User registration with validation
- Login/logout functionality
- Password strength indicator
- Form validation with real-time feedback
- Remember me functionality

## 💳 Payment Methods

### Supported Options
- **Bank Transfer**: BCA account details provided
- **E-Wallet**: OVO, DANA, GoPay integration
- **Payment Proof**: Optional file upload for bank transfers

## 📊 Data Management

### LocalStorage Structure
```javascript
// Cart Data
cart: [{
  id: number,
  name: string,
  price: number,
  image: string,
  quantity: number
}]

// User Data
users: [{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string,
  newsletter: boolean,
  createdAt: string
}]

// Orders Data
orders: [{
  orderNumber: string,
  customer: object,
  payment: object,
  items: array,
  subtotal: number,
  shipping: number,
  total: number,
  orderDate: string,
  status: string
}]
```

## 🎯 Key Features Explained

### Product Filtering
- **Category Filter**: Filter by product category
- **Price Range**: Set minimum and maximum price
- **Search**: Real-time search by product name
- **Sorting**: Sort by price, name, or default order

### Cart Management
- **Persistent Storage**: Cart data saved in localStorage
- **Quantity Control**: Increase/decrease item quantities
- **Remove Items**: Remove items from cart
- **Real-time Updates**: Cart count updates automatically

### Order Processing
- **Order Generation**: Unique order numbers created
- **Status Tracking**: Order status updates
- **Order History**: Complete order details view
- **Reorder Function**: Quick reorder from past orders

## 🔧 Customization

### Adding Products
Edit the `products` array in `js/app.js`:
```javascript
const products = [
  {
    id: 9,
    name: "New Product",
    price: 500000,
    category: "electronics",
    image: "product-image-url",
    stock: 10,
    description: "Product description"
  }
];
```

### Modifying Styles
- Main styles: `css/style.css`
- Page-specific styles: `css/[page].css`
- Color variables can be updated in the CSS files

### Adding Features
- New pages: Create HTML file and corresponding CSS/JS
- New functionality: Add to appropriate JS file
- Follow existing code patterns for consistency

## 🐛 Troubleshooting

### Common Issues
1. **Cart not saving**: Check localStorage support in browser
2. **Images not loading**: Verify image URLs are accessible
3. **Responsive issues**: Test on different screen sizes
4. **Form validation**: Ensure all required fields are filled

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📈 Future Enhancements

### Planned Features
- [ ] Admin dashboard for product management
- [ ] Real payment gateway integration
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Product recommendations
- [ ] Multi-language support

### Technical Improvements
- [ ] Backend API integration
- [ ] Database implementation
- [ ] User profile management
- [ ] Order status updates
- [ ] Payment processing
- [ ] Inventory management

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**
- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Placeholder.com for demo images
- Modern CSS techniques and best practices

---

**Note**: This is a demo project for educational purposes. For production use, implement proper security measures, backend services, and payment processing.
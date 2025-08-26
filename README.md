# Satwa - Premium Jewellery E-commerce Website

A modern, responsive e-commerce website for premium jewellery built with React, Node.js, and Tailwind CSS.

## 🌟 Features

### Frontend Features
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Beautiful, intuitive interface with smooth animations
- **Product Catalog**: Comprehensive product browsing with categories and filters
- **Search Functionality**: Advanced search with filters by category, material, and price
- **Shopping Cart**: Persistent cart with quantity management
- **Wishlist**: Save favorite products for later
- **User Authentication**: Login/Register system with profile management
- **Product Details**: Detailed product pages with image galleries and reviews
- **Checkout Process**: Complete checkout flow with order summary
- **Toast Notifications**: User-friendly feedback for all actions

### Backend Features
- **RESTful API**: Complete API endpoints for all functionality
- **Express Server**: Fast and scalable Node.js backend
- **CORS Support**: Cross-origin resource sharing enabled
- **Static File Serving**: Serves React build files
- **Error Handling**: Comprehensive error handling middleware

### E-commerce Features
- **Product Management**: Categories, materials, pricing, and inventory
- **Order Processing**: Order creation and management
- **Contact Forms**: Customer support and newsletter signup
- **Payment Integration**: Ready for payment gateway integration
- **Shipping Calculator**: Dynamic shipping costs based on order value
- **Tax Calculation**: Automatic tax calculation
- **Discount System**: Support for promotional pricing

## 🎨 Design & Branding

- **Brand**: Satwa - Premium Jewellery Collection
- **Color Scheme**: Warm orange/amber tones with elegant gradients
- **Typography**: Inter (body) and Playfair Display (headings)
- **Icons**: Feather Icons for consistent iconography
- **Images**: High-quality jewellery photography from Unsplash

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library
- **React Hot Toast**: Toast notifications
- **Context API**: State management

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Development Tools
- **Concurrently**: Run multiple commands simultaneously
- **Nodemon**: Auto-restart server during development

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd satwa-ecommerce
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
```

### 4. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
npm run server    # Backend only (port 5000)
npm run client    # Frontend only (port 3000)
```

### 5. Build for Production
```bash
# Build the React app
npm run build

# Start production server
npm start
```

## 🚀 Usage

### Development
1. Run `npm run dev` to start both servers
2. Frontend will be available at `http://localhost:3000`
3. Backend API will be available at `http://localhost:5000/api`

### Production
1. Run `npm run build` to build the React app
2. Run `npm start` to start the production server
3. Application will be available at `http://localhost:5000`

## 📁 Project Structure

```
satwa-ecommerce/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── data/          # Mock data
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Node.js backend
│   └── index.js          # Express server
├── package.json
└── README.md
```

## 🎯 Key Components

### Frontend Components
- **Header**: Navigation, search, cart, user menu
- **Footer**: Links, social media, contact info
- **ProductCard**: Product display with actions
- **Home**: Landing page with hero, features, products
- **Shop**: Product catalog with filters
- **ProductDetail**: Detailed product view
- **Cart**: Shopping cart management
- **Checkout**: Order completion
- **Login/Register**: User authentication
- **Profile**: User account management
- **About/Contact**: Company information

### Backend API Endpoints
- `GET /api/health` - Server health check
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `GET /api/categories` - Get product categories
- `POST /api/orders` - Create new order
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Newsletter subscription

## 🎨 Customization

### Colors
The color scheme can be customized in `client/tailwind.config.js`:
```javascript
colors: {
  'satwa': {
    50: '#fef7f0',
    100: '#fdecd8',
    // ... more shades
  }
}
```

### Products
Add or modify products in `client/src/data/products.js`:
```javascript
export const products = [
  {
    id: 1,
    name: "Product Name",
    price: 299.99,
    category: "necklaces",
    // ... more properties
  }
];
```

### Styling
Custom styles can be added in `client/src/index.css` using Tailwind's `@layer` directive.

## 🔧 API Integration

The frontend is ready for real API integration. Replace the mock data in `client/src/data/products.js` with actual API calls:

```javascript
// Example API call
const fetchProducts = async () => {
  const response = await fetch('/api/products');
  const products = await response.json();
  return products;
};
```

## 🚀 Deployment

### Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd client && npm install && npm run build`
3. Set output directory: `client/build`

### Heroku (Backend)
1. Create a new Heroku app
2. Set environment variables
3. Deploy using Heroku CLI or GitHub integration

### Netlify (Full Stack)
1. Build the React app: `npm run build`
2. Deploy the `client/build` folder
3. Configure redirects for React Router

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Features

- CORS configuration for API security
- Input validation and sanitization
- Secure authentication flow
- HTTPS ready for production

## 🎯 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] User reviews and ratings
- [ ] Advanced search with filters
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Multi-language support
- [ ] PWA features
- [ ] Analytics integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: info@satwa.com
- Phone: +1 (555) 123-4567

---

**Satwa** - Where elegance meets craftsmanship. ✨


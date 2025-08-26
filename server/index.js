const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Satwa E-commerce API is running' });
});

// Products API
app.get('/api/products', (req, res) => {
  // Mock products data
  const products = [
    {
      id: 1,
      name: "Elegant Gold Necklace",
      price: 299.99,
      originalPrice: 399.99,
      category: "necklaces",
      material: "18K Gold",
      description: "A timeless gold necklace featuring a delicate chain with a subtle pendant.",
      images: [
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop"
      ],
      rating: 4.8,
      reviews: 124,
      inStock: true,
      featured: true,
      bestSeller: true
    },
    {
      id: 2,
      name: "Diamond Stud Earrings",
      price: 599.99,
      originalPrice: 799.99,
      category: "earrings",
      material: "14K White Gold",
      description: "Classic diamond stud earrings with brilliant-cut diamonds set in white gold.",
      images: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop"
      ],
      rating: 4.9,
      reviews: 89,
      inStock: true,
      featured: true,
      bestSeller: true
    }
  ];
  
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  // Mock product data
  const product = {
    id: productId,
    name: "Elegant Gold Necklace",
    price: 299.99,
    originalPrice: 399.99,
    category: "necklaces",
    material: "18K Gold",
    description: "A timeless gold necklace featuring a delicate chain with a subtle pendant.",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop"
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    bestSeller: true
  };
  
  res.json(product);
});

// Categories API
app.get('/api/categories', (req, res) => {
  const categories = [
    { id: "all", name: "All Products", count: 12 },
    { id: "necklaces", name: "Necklaces", count: 3 },
    { id: "earrings", name: "Earrings", count: 3 },
    { id: "rings", name: "Rings", count: 3 },
    { id: "bracelets", name: "Bracelets", count: 3 }
  ];
  
  res.json(categories);
});

// Orders API
app.post('/api/orders', (req, res) => {
  // Mock order creation
  const order = {
    id: Date.now(),
    items: req.body.items,
    total: req.body.total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  res.json(order);
});

// Contact API
app.post('/api/contact', (req, res) => {
  // Mock contact form submission
  const { name, email, subject, message } = req.body;
  
  // Here you would typically save to database or send email
  console.log('Contact form submission:', { name, email, subject, message });
  
  res.json({ message: 'Message sent successfully' });
});

// Newsletter API
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  
  // Here you would typically save to database
  console.log('Newsletter subscription:', email);
  
  res.json({ message: 'Successfully subscribed to newsletter' });
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});


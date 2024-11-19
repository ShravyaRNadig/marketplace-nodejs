const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/users', userRoutes); // User routes

// Serve login.html by default (root route)
app.get('/', (req, res) => {
    console.log("Serving login.html as the default route");
    res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

// Serve login.html for the /login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

// Serve register.html for the /register route
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'register.html'));
});

// Serve products.html for the /products route
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'products.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

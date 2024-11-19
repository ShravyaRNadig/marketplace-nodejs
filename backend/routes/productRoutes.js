const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getProducts);

// Add a new product
router.post('/', productController.addProduct);

// Edit an existing product
router.put('/:id', productController.editProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;

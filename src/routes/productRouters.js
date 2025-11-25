// src/routes/productRouters.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct } = require('../validators/productValidator');

// Rotas CRUD
router.post('/', validateProduct, productController.createProduct); // Create
router.get('/', productController.getAllProducts);                  // Read All
router.get('/:id', productController.getProductById);               // Read One
router.put('/:id', productController.updateProduct);                // Update
router.delete('/:id', productController.deleteProduct);             // Delete

module.exports = router;
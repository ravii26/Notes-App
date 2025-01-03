import express from 'express';
import { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import isAuthentic from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-product', isAuthentic, createProduct)
router.get('/get-products', isAuthentic, getAllProducts)
router.get('/get-product/:id', getProduct)
router.put('/update-product/:id', isAuthentic, updateProduct)
router.delete('/delete-product/:id', isAuthentic, deleteProduct)

export default router;
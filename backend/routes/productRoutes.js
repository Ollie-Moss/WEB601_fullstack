/*
File: backend/routes/productRoutes.js
Description: Imports controllers, sets up routes and their methods
Versions: 0.2.0
Author: WEB601
*/

import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all products (public) and create a new product (admin only)
router.get('/', async (req, res) => {
  try {
    await getProducts(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    await createProduct(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get top products (public)
router.get('/top', async (req, res) => {
  try {
    await getTopProducts(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Create a product review (authenticated users only)
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    await createProductReview(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Product management by ID (public for GET, admin for DELETE and PUT)
router.get('/:id', async (req, res) => {
  try {
    await getProductById(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await deleteProduct(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    await updateProduct(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;

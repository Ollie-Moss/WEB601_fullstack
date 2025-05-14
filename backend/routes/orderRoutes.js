/*
File: backend/routes/orderRoutes.js
Description: Imports controllers, sets up routes and their methods
Versions: 0.2.0
Author: WEB601
*/

import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js'; // Import the controllers
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for creating a new order and getting all orders (admin only)
router.post('/', protect, async (req, res, next) => {
  try {
    await addOrderItems(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, admin, async (req, res, next) => {
  try {
    await getOrders(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Route for getting the authenticated user's orders
router.get('/myorders', protect, async (req, res, next) => {
  try {
    await getMyOrders(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Route for getting a specific order by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    await getOrderById(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Route for updating an order to paid
router.put('/:id/pay', protect, async (req, res, next) => {
  try {
    await updateOrderToPaid(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Route for updating an order to delivered (admin only)
router.put('/:id/deliver', protect, admin, async (req, res, next) => {
  try {
    await updateOrderToDelivered(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;

/*
File: backend/routes/orderRoutes.js
Description: Imports controllers, sets up routes and their methods
Versions: 0.1.0
Author: WEB601
*/
import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js' // import the controllers from the controllers folder
import { protect, admin } from '../middleware/authMiddleware.js'

//set up the routes and their methods
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router

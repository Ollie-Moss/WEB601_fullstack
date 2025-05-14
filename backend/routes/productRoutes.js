/*
File: backend/routes/productRoutes.js
Description: Imports controllers, sets up routes and their methods
Versions: 0.1.0
Author: WEB601
*/
import express from 'express'
const router = express.Router() //sets up the router instance
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js' // import functions from product controllers
import { protect, admin } from '../middleware/authMiddleware.js' // import middleware from middleware folder

//routes for the products
router.route('/').get(getProducts).post(protect, admin, createProduct) //get can be used by anyone, post needs to be done by an authenticated user. 
router.route('/:id/reviews').post(protect, createProductReview) //Adds a review to a specific product by its ID - requires the user to be authenticated
router.get('/top', getTopProducts) // get the top rated products, open to all users
router
  .route('/:id') 
  .get(getProductById) //gets an id according to the id given 
  .delete(protect, admin, deleteProduct) //deletes a product according to its ID
  .put(protect, admin, updateProduct) // updates details of a product, according to its ID

export default router
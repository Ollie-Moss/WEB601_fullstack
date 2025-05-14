/*
File: backend/routes/userRoutes.js
Description: Imports controllers, sets up routes and their methods
Versions: 0.1.0
Author: WEB601
*/

import express from 'express' // creates a router instance for managing paths
const router = express.Router() 
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js' // import the controllers from the controllers folder
import { protect, admin } from '../middleware/authMiddleware.js' // import protext & admin from the authentication middleware file

router.route('/').post(registerUser).get(protect, admin, getUsers) //.post registers a new user, .get is protected to admins for listing all users. requires admin check and authentiaction
router.post('/login', authUser) //authenticates a user
router
  .route('/profile') 
  .get(protect, getUserProfile) //retrieves profile the current authenticated user
  .put(protect, updateUserProfile) // updates the profile of the currently authenticated user
router
  .route('/:id') 
  .delete(protect, admin, deleteUser) // deletes a user
  .get(protect, admin, getUserById) // gets a user
  .put(protect, admin, updateUser) // updates a user's details by their id 

export default router
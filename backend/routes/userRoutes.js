/*
File: backend/routes/userRoutes.js
Description: Imports controllers, sets up routes and their methods
Versions: 0.2.0
Author: WEB601
*/

import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/', async (req, res, next) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Authenticate a user
router.post('/login', async (req, res, next) => {
  try {
    await authUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get all users (admin only)
router.get('/', protect, admin, async (req, res, next) => {
  try {
    await getUsers(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get and update current authenticated user's profile
router.get('/profile', protect, async (req, res, next) => {
  try {
    await getUserProfile(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.put('/profile', protect, async (req, res, next) => {
  try {
    await updateUserProfile(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// User management by ID (admin only)
router.delete('/:id', protect, admin, async (req, res, next) => {
  try {
    await deleteUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', protect, admin, async (req, res, next) => {
  try {
    await getUserById(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, admin, async (req, res, next) => {
  try {
    await updateUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;

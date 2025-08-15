import express from 'express';
import { getUserProfile, updateUserProfile, getUserTransactions } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get user profile
router.get('/profile/:userId', getUserProfile);

// Update user profile (protected)
router.put('/profile', auth, updateUserProfile);

// Get user transactions (protected)
router.get('/transactions', auth, getUserTransactions);

export default router;
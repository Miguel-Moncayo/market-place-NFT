import express from 'express';
import { register, login, loginWithWallet } from '../controllers/authController';

const router = express.Router();

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Login with wallet
router.post('/wallet-login', loginWithWallet);

export default router;
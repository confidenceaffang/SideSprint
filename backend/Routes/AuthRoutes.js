import express from 'express';
const router = express.Router();
import { register, login, googleAuth } from '../controllers/authController.js';

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);

export default router;
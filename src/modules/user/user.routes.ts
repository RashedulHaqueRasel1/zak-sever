import express from 'express';
import { getUsers, loginUser, registerUser, getProfile, updateProfile, changePassword } from './user.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', protect, getProfile);
router.patch('/me', protect, updateProfile);
router.patch('/change-password', protect, changePassword);

router.get('/', getUsers);

export default router;

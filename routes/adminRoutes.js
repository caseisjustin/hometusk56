import express from 'express';
import { viewUsers, updateUser, deleteUser } from '../controllers/adminController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/users', authenticate, isAdmin, viewUsers);
router.put('/users/:id', authenticate, isAdmin, updateUser);
router.delete('/users/:id', authenticate, isAdmin, deleteUser);

export default router;

import express from 'express';
import { addDebt, viewDebts, updateDebt, deleteDebt } from '../controllers/debtController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, addDebt);
router.get('/', authenticate, viewDebts);
router.put('/:id', authenticate, updateDebt);
router.delete('/:id', authenticate, deleteDebt);

export default router;

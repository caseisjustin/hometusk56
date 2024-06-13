import express from 'express';
import authRoutes from './routes/authRoutes.js';
import debtRoutes from './routes/debtRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/api/users', authRoutes);
app.use('/api/debts', debtRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

export default app;

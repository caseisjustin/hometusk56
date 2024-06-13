import { addNewDebt, getUserDebts, modifyDebt, removeDebt } from '../services/debtService.js';

export const addDebt = async (req, res, next) => {
  try {
    const { amount, description, due_date, status } = req.body;
    const userId = req.user.id;
    const response = await addNewDebt({ userId, amount, description, due_date, status });
    res.status(201).json({ message: response });
  } catch (error) {
    next(error);
  }
};

export const viewDebts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;
    const debts = await getUserDebts({ userId, status });
    res.status(200).json({ debts });
  } catch (error) {
    next(error);
  }
};

export const updateDebt = async (req, res, next) => {
  try {
    const debtId = req.params.id;
    const { amount, description, due_date, status } = req.body;
    const response = await modifyDebt({ debtId, amount, description, due_date, status });
    res.status(200).json({ message: response });
  } catch (error) {
    next(error);
  }
};

export const deleteDebt = async (req, res, next) => {
  try {
    const debtId = req.params.id;
    const response = await removeDebt({ debtId });
    res.status(200).json({ message: response });
  } catch (error) {
    next(error);
  }
};

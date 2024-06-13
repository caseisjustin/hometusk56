import pool from '../config/dbConfig.js';

export const addNewDebt = async ({ userId, amount, description, due_date, status }) => {
  try {
    await pool.query(
      `INSERT INTO debts (user_id, amount, description, due_date, status) VALUES ($1, $2, $3, $4, $5)`,
      [userId, amount, description, due_date, status]
    );

    return 'New debt added.';
  } catch (error) {
    throw new Error('Invalid data.');
  }
};

export const getUserDebts = async ({ userId, status }) => {
  try {
    const query = status
      ? `SELECT * FROM debts WHERE user_id = $1 AND status = $2`
      : `SELECT * FROM debts WHERE user_id = $1`;

    const values = status ? [userId, status] : [userId];

    const result = await pool.query(query, values);

    return result.rows;
  } catch (error) {
    throw new Error('Error retrieving debts.');
  }
};

export const modifyDebt = async ({ debtId, amount, description, due_date, status }) => {
  try {
    const result = await pool.query(
      `UPDATE debts SET amount = $1, description = $2, due_date = $3, status = $4 WHERE id = $5`,
      [amount, description, due_date, status, debtId]
    );

    if (result.rowCount === 0) {
      throw new Error('Debt not found.');
    }

    return 'Debt updated.';
  } catch (error) {
    throw new Error('Invalid data.');
  }
};

export const removeDebt = async ({ debtId }) => {
  try {
    const result = await pool.query(`DELETE FROM debts WHERE id = $1`, [debtId]);

    if (result.rowCount === 0) {
      throw new Error('Debt not found.');
    }

    return 'Debt deleted.';
  } catch (error) {
    throw new Error('Error deleting debt.');
  }
};

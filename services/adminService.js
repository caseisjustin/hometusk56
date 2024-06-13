import pool from '../config/dbConfig.js';

export const listUsers = async () => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    return result.rows;
  } catch (error) {
    throw new Error('Error retrieving users.');
  }
};

export const modifyUser = async ({ userId, username, email, role }) => {
  try {
    const result = await pool.query(
      `UPDATE users SET username = $1, email = $2, role = $3 WHERE id = $4`,
      [username, email, role, userId]
    );

    if (result.rowCount === 0) {
      throw new Error('User not found.');
    }

    return 'User updated.';
  } catch (error) {
    throw new Error('Invalid data.');
  }
};

export const removeUser = async ({ userId }) => {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);

    if (result.rowCount === 0) {
      throw new Error('User not found.');
    }

    return 'User deleted.';
  } catch (error) {
    throw new Error('Error deleting user.');
  }
};

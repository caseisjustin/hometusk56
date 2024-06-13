import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendOtpToEmail, sendOtpToPhone } from './otpService.js';
import { generateOtp } from '../utils/otpGenerator.js';
import pool from '../config/dbConfig.js';

export const registerUser = async ({ username, email, password, phone }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOtp();

  try {
    await pool.connect()
    const result = await pool.query(
      `INSERT INTO users (username, email, password, phone, otp) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [username, email, hashedPassword, phone, otp]
    );
    // Send OTP to email and phone
    // await sendOtpToEmail(email, otp);
    await sendOtpToPhone(phone, otp);
    console.log("pointer")


    return 'User created and OTP sent.';
  } catch (error) {
    throw new Error('Email or username already exists or invalid data.');
  }
};

export const verifyUserOtp = async ({ phone, otp }) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE phone = $1 AND otp = $2`, [phone, otp]);

    if (result.rowCount === 0) {
      throw new Error('Invalid OTP or phone number.');
    }

    await pool.query(`UPDATE users SET status = 'active' WHERE phone = $1`, [phone]);
    return 'Verification successful and user activated.';
  } catch (error) {
    throw new Error('Invalid OTP or phone number.');
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

    if (result.rowCount === 0) {
      throw new Error('Incorrect username or password.');
    }

    const user = result.rows[0];

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error('Incorrect username or password.');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
  } catch (error) {
    throw new Error('Incorrect username or password.');
  }
};

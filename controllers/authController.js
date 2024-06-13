import { registerUser, verifyUserOtp, loginUser } from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    const { username, email, password, phone } = req.body;
    const response = await registerUser({ username, email, password, phone });
    res.status(201).json({ message: response });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    const response = await verifyUserOtp({ phone, otp });
    res.status(200).json({ message: response });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await loginUser({ username, password });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

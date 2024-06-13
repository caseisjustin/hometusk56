import { listUsers, modifyUser, removeUser } from '../services/adminService.js';

export const viewUsers = async (req, res, next) => {
  try {
    const users = await listUsers();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { username, email, role } = req.body;
    const response = await modifyUser({ userId, username, email, role });
    res.status(200).json({ message: response });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const response = await removeUser({ userId });
    res.status(200).json({ message: response });
  } catch (error) {
    next(error);
  }
};

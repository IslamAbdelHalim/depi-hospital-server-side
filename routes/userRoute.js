import express from 'express';
import {
  getUserById,
  deleteUser,
  updateUser,
} from '../controllers/userControllers.js';
import { validateRoute } from '../controllers/authControllers.js';

const userRouter = express.Router();

userRouter
  .route('/:id')
  .get(validateRoute, getUserById)
  .delete(validateRoute, deleteUser);

userRouter.route('/update/:id').patch(validateRoute, updateUser);

export default userRouter;

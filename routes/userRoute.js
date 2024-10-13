import express from 'express';
import { getUserById } from '../controllers/userControllers.js';
import { validateRoute } from '../controllers/authControllers.js';

const userRouter = express.Router();

userRouter.route('/:id').get(validateRoute, getUserById);

export default userRouter;

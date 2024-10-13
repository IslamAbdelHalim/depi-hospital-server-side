import express from 'express';
import { createUser, loginUser } from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.route('/register').post(createUser);
authRouter.route('/login').post(loginUser);

export default authRouter;

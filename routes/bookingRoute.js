import express from 'express';
import { createBooking } from '../controllers/bookingControllers.js';
import { validateRoute } from '../controllers/authControllers.js';

const bookingRouter = express.Router();

bookingRouter.route('/').post(validateRoute, createBooking);

export default bookingRouter;

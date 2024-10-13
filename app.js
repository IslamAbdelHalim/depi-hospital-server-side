import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import doctorRouter from './routes/doctorRoute.js';
import clinicRouter from './routes/clinicsRoute.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import booking from './routes/bookingRouter.js';
import {
  ErrorRoutes,
  globalErrorHandling,
} from './middlewares/errorHandler.js';

dotenv.config({ path: './config.env' });

// start app
const app = express();

// app.use(morgan('dev'));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/doctors', doctorRouter);
app.use('/api/clinics', clinicRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/booking', booking);

// handle if there are error in routes or url
app.use(ErrorRoutes);

// middle ware to handle all error
app.use(globalErrorHandling);

export default app;
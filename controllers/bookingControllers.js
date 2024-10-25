import Booking from '../models/booking.js';
import catchError from '../middlewares/catchError.js';
import AppError from '../utils/appError.js';

export const createBooking = catchError(async (req, res, next) => {
  req.body.user = req.user._id;
  const newBooking = await Booking.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      booking: newBooking,
    },
  });
});

import mongoose from 'mongoose';
import User from '../models/user.js';
import catchError from '../middlewares/catchError.js';
import AppError from '../utils/appError.js';

export const getUserById = catchError(async (req, res, next) => {
  const user = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    {
      $lookup: {
        from: 'bookings',
        localField: '_id',
        foreignField: 'user',
        as: 'bookings',
      },
    },
    {
      $project: {
        password: 0,
      },
    },
  ]);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: user[0],
    },
  });
});

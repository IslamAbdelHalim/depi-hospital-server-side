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

export const deleteUser = catchError(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const updateUser = catchError(async (req, res, next) => {
  if (typeof req.body.birthday === 'string') {
    const [day, month, year] = req.body.birthday.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    req.body.birthday = date;
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select('-password');

  console.log(user);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

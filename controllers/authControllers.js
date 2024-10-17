import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import catchError from '../middlewares/catchError.js';
import AppError from '../utils/appError.js';

export const createUser = catchError(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
    expiresIn: '4d',
  });

  const { password, ...user } = newUser._doc;

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

export const loginUser = catchError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('Please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '4d',
  });

  const { removePass, ...NoPassUser } = user._doc;

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: NoPassUser,
    },
  });
});

export const validateRoute = catchError(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new AppError('Please login to get access', 401));

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const user = await User.findById(decoded.id);

  if (!user) return next(new AppError('User does not exist', 401));

  req.user = user;
  next();
});

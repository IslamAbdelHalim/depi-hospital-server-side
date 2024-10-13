import Doctor from '../models/doctor.js';
import catchError from '../middlewares/catchError.js';
import ApiFeature from '../utils/apiFeature.js';
import AppError from '../utils/appError.js';

export const getAllDoctors = catchError(async function (req, res, next) {
  let doctors = new ApiFeature(Doctor.find(), req.query)
    .filter()
    .limitFields()
    .sort()
    .pagination();

  doctors = await doctors.query;

  res.status(200).json({
    status: 'success',
    doctors,
  });
});

export const addDoctor = catchError(async function (req, res, next) {
  const doctor = await Doctor.create(req.body);
  res.status(201).json({
    status: 'success',
    doctor,
  });
});

export const getDoctor = catchError(async function (req, res, next) {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return next(new AppError('Doctor not found', 404));

  res.status(200).json({
    status: 'success',
    doctor,
  });
});

export const updateDoctorById = catchError(async function (req, res, next) {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    doctor,
  });
});

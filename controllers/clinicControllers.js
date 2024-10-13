import mongoose from 'mongoose';
import Clinic from '../models/clinic.js';
import catchError from '../middlewares/catchError.js';
import ApiFeature from '../utils/apiFeature.js';
import AppError from '../utils/appError.js';

export const getAllClinics = catchError(async function (req, res, next) {
  let clinics = new ApiFeature(Clinic.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  clinics = await clinics.query;

  res.status(200).json({
    status: 'success',
    length: clinics.length,
    clinics,
  });
});

export const createClinic = catchError(async function (req, res, next) {
  const clinic = await Clinic.create(req.body);

  res.status(201).json({
    status: 'success',
    clinic,
  });
});

export const getClinicById = catchError(async function (req, res, next) {
  const clinicId = new mongoose.Types.ObjectId(req.params.id);
  const clinic = await Clinic.aggregate([
    { $match: { _id: clinicId } },
    {
      $lookup: {
        from: 'doctors',
        localField: 'name',
        foreignField: 'clinic',
        as: 'doctors',
      },
    },
  ]);

  if (!clinic) return next(new AppError('Can not find this Clinic', 404));

  res.status(200).json({
    status: 'success',
    clinic: clinic,
  });
});

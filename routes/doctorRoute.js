import express from 'express';
import {
  getAllDoctors,
  addDoctor,
  updateDoctorById,
  getDoctor,
} from '../controllers/doctorControllers.js';

const doctorRouter = express.Router();

doctorRouter.route('/').get(getAllDoctors).post(addDoctor);
doctorRouter.route('/:id').get(getDoctor).patch(updateDoctorById);

export default doctorRouter;

import express from 'express';
import {
  createClinic,
  getAllClinics,
  getClinicById,
} from '../controllers/clinicControllers.js';

const clinicRouter = express.Router();

clinicRouter.route('/').get(getAllClinics).post(createClinic);

clinicRouter.route('/:id').get(getClinicById);

export default clinicRouter;

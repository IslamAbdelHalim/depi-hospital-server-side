import mongoose from 'mongoose';

const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Must Enter Name Of Specialization'],
  },
  description: {
    type: String,
  },
  medicalExaminations: [String],
  picture: String,
});

const Clinic = mongoose.model('clinic', clinicSchema);

export default Clinic;

import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Doctor must have a name'],
    trim: true,
  },
  clinic: {
    type: String,
    required: [true, 'Doctor must have a clinic'],
    trim: true,
  },
  specialization: {
    type: mongoose.Schema.Types.ObjectId,
    requires: true,
    ref: 'Specialization',
  },
  experience: String,
  education: String,
  availability: {
    days: [String],
    time: String,
  },
  shifts: {
    type: Map,
    of: String,
  },
  profile_image: String,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;

import mongoose from 'mongoose';
import validator from 'validator';

const bookingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Must Have a mail'],
  },
  phone: {
    type: String,
    require: [true, 'Must Enter a number'],
  },
  bookingType: String,
  doctor: {
    type: String,
  },
  clinic: {
    type: String,
  },
  notes: String,
  day: String,
  time: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'users',
  },
});

const Booking = mongoose.model('bookings', bookingSchema);

export default Booking;

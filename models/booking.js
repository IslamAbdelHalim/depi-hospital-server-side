import mongoose from 'mongoose';
import validator from 'validator';

const bookingSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Must Have a mail'],
  },
  doctor: {
    type: String,
  },
  clinic: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'users',
  },
});

const Booking = mongoose.model('bookings', bookingSchema);

export default Booking;

import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Must Enter a username'],
    trim: true,
  },
  email: {
    type: String,
    unique: [true, 'Email is already register'],
    required: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Enter a valid Email'],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Password are not the same',
    },
  },
  phone: {
    type: String,
    minLength: [11, 'Please Enter valid phone'],
  },
  picture: String,
  birthday: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next;

  this.password = await bcrypt.hash(this.password, 12);
  console.log(this.password);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  bodyPassword,
  userPassword
) {
  return await bcrypt.compare(bodyPassword, userPassword);
};

const User = mongoose.model('users', userSchema);

export default User;

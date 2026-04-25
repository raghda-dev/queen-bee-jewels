// server/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, 'please enter your name'],
  },
  username: {
    type: String,
    required: [true, 'please enter a username'],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true,
    lowercase: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: [true, 'please enter a password'],
    minLength: 6,
  },
}, { timestamps: false });

// ─── HASH PASSWORD BEFORE SAVE ─────────────────────────────
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ─── PASSWORD COMPARISON METHOD ─────────────────────────────
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

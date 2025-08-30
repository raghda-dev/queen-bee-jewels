// // server/controller/authController.js

import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// JWT token generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Common cookie options
const cookieOptions = {
  httpOnly: true,
  secure: true, // always true in production with HTTPS
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = async (req, res) => {
  const { full_name, email, password } = req.body;

    console.log('register body', req.body);


  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate base username
    const baseUsername = email.split('@')[0].toLowerCase();

    // Ensure uniqueness
    let finalUsername = baseUsername;
    let counter = 1;
    while (await User.findOne({ username: finalUsername })) {
      finalUsername = `${baseUsername}${counter}`;
      counter++;
    }

    const user = await User.create({
      full_name,
      email,
      password,
      username: finalUsername,
    });

    const token = generateToken(user._id);

    res
      .cookie('token', token, cookieOptions)
      .status(201)
      .json({
        user: {
          _id: user._id,
          full_name: user.full_name,
          email: user.email,
          username: user.username,
        },
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log('login body', req.body);


  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res
      .cookie('token', token, cookieOptions)
      .status(200)
      .json({
        user: {
          _id: user._id,
          full_name: user.full_name,
          email: user.email,
          username: user.username,
        },
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token', {
    ...cookieOptions,
    maxAge: 0, // clear it immediately
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

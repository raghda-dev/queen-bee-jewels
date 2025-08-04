// server/controller/authController.js

import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  const { full_name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // ✅ Generate username from email (e.g., areenmezher123)
    const baseUsername = email.split('@')[0].toLowerCase();

    // ✅ Ensure uniqueness by appending numbers if needed
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
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({
        user: {
          _id: user._id,
          full_name: user.full_name,
          email: user.email,
          username: user.username, // ✅ now included
        },
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// export const register = async (req, res) => {
//   const { full_name, email, password } = req.body;

//   console.log('signup body', req.body);

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const user = await User.create({ full_name, email, password });

//     const token = generateToken(user._id);

//     // ✅ Set token in cookie
//     res
//       .cookie('token', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//       })
//       .status(201)
//       .json({
//         user: {
//           _id: user._id,
//           full_name: user.full_name,
//           email: user.email,
//         },
//       });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log('login body', req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(user._id);

    // ✅ Set token in cookie
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        user: {
          _id: user._id,
          full_name: user.full_name,
          email: user.email,
        },
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

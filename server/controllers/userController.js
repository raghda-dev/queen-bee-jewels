// import path from 'path';
// import fs from 'fs';
// import multer from 'multer';
// import bcrypt from 'bcryptjs'; // ✅ required for password comparison
// import User from '../models/User.js';

// // ─── MULTER CONFIG FOR AVATAR UPLOAD ─────────────────────────────
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     const dir = 'uploads/avatars';
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     cb(null, dir);
//   },
//   filename(req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, `${req.user.id}-${Date.now()}${ext}`);
//   },
// });

// export const upload = multer({ storage });

// // ─── GET USER PROFILE ─────────────────────────────────────────────
// export const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ─── UPDATE USER INFO ─────────────────────────────────────────────
// export const updateUserInfo = async (req, res) => {
//   try {
//     const { full_name, email, username, address } = req.body;

//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.full_name = full_name || user.full_name;
//     user.email = email || user.email;
//     user.username = username || user.username;
//     user.address = address || user.address;

//     const updatedUser = await user.save();

//     res.status(200).json({
//       _id: updatedUser._id,
//       full_name: updatedUser.full_name,
//       email: updatedUser.email,
//       username: updatedUser.username,
//       avatar: updatedUser.avatar,
//       address: updatedUser.address,
//     });
//   } catch (err) {
//     console.error('Error updating user info:', err.message);
//     res.status(500).json({ message: 'Server error while updating profile' });
//   }
// };

// // ─── UPDATE USER PASSWORD ─────────────────────────────────────────
// export const updateUserPassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ message: 'Both current and new passwords are required.' });
//     }

//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect.' });

//     user.password = newPassword;
//     await user.save();

//     res.status(200).json({ message: 'Password updated successfully' });
//   } catch (err) {
//     console.error('Error updating password:', err.message);
//     res.status(500).json({ message: 'Server error while updating password' });
//   }
// };

// // ─── UPLOAD USER AVATAR ───────────────────────────────────────────
// export const updateUserAvatar = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const avatarUrl = `${req.protocol}://${req.get('host')}/uploads/avatars/${req.file.filename}`;

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { avatar: avatarUrl },
//       { new: true, runValidators: false }
//     );

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json({ avatar: user.avatar });
//   } catch (err) {
//     console.error('Error updating avatar:', err.message);
//     res.status(500).json({ message: 'Server error while uploading avatar' });
//   }
// };

// // ─── REMOVE USER AVATAR ───────────────────────────────────────────
// export const removeUserAvatar = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (user.avatar) {
//       const filePath = path.join('uploads', 'avatars', path.basename(user.avatar));
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       }
//     }

//     user.avatar = '';
//     await user.save();

//     res.status(200).json({ message: 'Avatar removed successfully', avatar: '' });
//   } catch (err) {
//     console.error('Error removing avatar:', err.message);
//     res.status(500).json({ message: 'Server error while removing avatar' });
//   }
// };

import path from 'path';
import fs from 'fs';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// ─── MULTER CONFIG FOR AVATAR UPLOAD ─────────────────────────────
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = 'uploads/avatars';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}-${Date.now()}${ext}`);
  },
});
export const upload = multer({ storage });

// ─── GET USER PROFILE ─────────────────────────────────────────────
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ─── UPDATE USER INFO (FULL NAME, EMAIL, USERNAME, ADDRESS) ─────
export const updateUserInfo = async (req, res) => {
  try {
    const { full_name, email, username, address } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.full_name = full_name || user.full_name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.address = address || user.address;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      full_name: updatedUser.full_name,
      email: updatedUser.email,
      username: updatedUser.username,
      avatar: updatedUser.avatar,
      address: updatedUser.address,
    });
  } catch (err) {
    console.error('Error updating user info:', err.message);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

// ─── UPDATE USER PASSWORD ─────────────────────────────────────────
export const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new passwords are required.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect.' });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error updating password:', err.message);
    res.status(500).json({ message: 'Server error while updating password' });
  }
};

// ─── UPLOAD USER AVATAR ───────────────────────────────────────────
export const updateUserAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const avatarUrl = `${req.protocol}://${req.get('host')}/uploads/avatars/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: avatarUrl },
      { new: true, runValidators: false }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ avatar: user.avatar });
  } catch (err) {
    console.error('Error updating avatar:', err.message);
    res.status(500).json({ message: 'Server error while uploading avatar' });
  }
};

// ─── REMOVE USER AVATAR ───────────────────────────────────────────
export const removeUserAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.avatar) {
      const filePath = path.join('uploads', 'avatars', path.basename(user.avatar));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    user.avatar = '';
    await user.save();

    res.status(200).json({ message: 'Avatar removed successfully', avatar: '' });
  } catch (err) {
    console.error('Error removing avatar:', err.message);
    res.status(500).json({ message: 'Server error while removing avatar' });
  }
};

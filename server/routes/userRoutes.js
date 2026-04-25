// server/routes/userRoutes.js

// import express from 'express'
// import { getUserProfile, updateUserAvatar, upload, removeUserAvatar } from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';


// const router = express.Router();

// router.get('/profile', protect, getUserProfile);
// router.put('/profile', protect, updateUserProfile);
// router.patch('/avatar', protect, upload.single('avatar'), updateUserAvatar);
// router.delete('/avatar', protect, removeUserAvatar);
// router.patch('/profile/info', protect, updateUserInfo);
// router.patch('/profile/password', protect, updateUserPassword);



// export default router;

import express from 'express';
import {
  getUserProfile,
  updateUserInfo,
  updateUserPassword,
  updateUserAvatar,
  removeUserAvatar,
  upload,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Profile
router.get('/profile', protect, getUserProfile);

// Update info (PATCH /profile/info)
router.patch('/profile/info', protect, updateUserInfo);

// Update password (PATCH /profile/password)
router.patch('/profile/password', protect, updateUserPassword);

// Avatar handling
router.patch('/avatar', protect, upload.single('avatar'), updateUserAvatar);
router.delete('/avatar', protect, removeUserAvatar);

export default router;

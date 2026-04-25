import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist,moveToCart } from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/',protect, getWishlist);
router.post('/',protect, addToWishlist);
router.delete('/:productId',protect, removeFromWishlist);
router.post('/move-to-cart/:productId',protect, moveToCart);


export default router;

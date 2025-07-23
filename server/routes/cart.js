import express from 'express';
import { getCart, addToCart, removeFromCart, moveToWishlist } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/',protect, getCart);
router.post('/',protect, addToCart);
router.delete('/:productId',protect, removeFromCart);
router.post('/move-to-wishlist/:productId',protect, moveToWishlist);


export default router;

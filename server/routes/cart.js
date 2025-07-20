import express from 'express';
import { getCart, addToCart, removeFromCart, moveToWishlist } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:productId', removeFromCart);
router.post('/move-to-wishlist/:productId', moveToWishlist);


export default router;

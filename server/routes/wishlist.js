import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist,moveToCart } from '../controllers/wishlistController.js';

const router = express.Router();

router.get('/', getWishlist);
router.post('/', addToWishlist);
router.delete('/:productId', removeFromWishlist);
router.post('/move-to-cart/:productId', moveToCart);


export default router;

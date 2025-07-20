import Wishlist from '../models/Wishlist.js';
import Cart from "../models/Cart.js";


import { getProductById } from '../lib/shopify.js';

// import { getProductById } from '../lib/shopifyClient.js';

export const getWishlist = async (req, res) => {
  const userId = 'guest';

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.json({ items: [] });
    }

    const expandedItems = await Promise.all(
      wishlist.items.map(async (item) => {
        const product = await getProductById(item.productId);
        return {
          id: product.id,
          name: product.title,
          price: parseFloat(product.priceRange.minVariantPrice.amount),
          imageUrl: product.featuredImage?.url || '',
          description: product.description || 'No description available',
          type: product.productType || 'General',
        };
      })
    );

    res.json({ items: expandedItems });
  } catch (err) {
    console.error('Failed to fetch wishlist:', err); // ✅ Add a good message!
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
};


export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = 'guest'; // Replace with real user auth if you have it

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      // No wishlist exists — create one
      await Wishlist.create({
        userId,
        items: [{ productId }],
      });
      return res.json({ item: fullProduct, message: 'Wishlist created and item added' }); // backend response
    }

    // Check if product is already in wishlist
    const itemExists = wishlist.items.some(item => item.productId === productId);

    if (!itemExists) {
      wishlist.items.push({ productId });
      await wishlist.save();
      return res.json({ message: 'Item added to wishlist' });
    } else {
      return res.json({ message: 'Item already in wishlist' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save item to wishlist' });
  }
};

export const moveToCart = async (req, res) => {
  const userId = 'guest';

  const fullId = req.params.productId;
  if (!fullId) {
    return res.status(400).json({ error: 'Missing product ID in URL param' });
  }

  const productId = fullId.includes('/') ? fullId.split('/').pop() : fullId;

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ error: 'wishlist not found' });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const alreadyInCart = cart.items.some(
      (item) => item.productId === productId
    );

    // ✅ Always remove from wishlist
    wishlist.items = wishlist.items.filter((item) => item.productId !== productId);
    await wishlist.save();

    // ✅ Add to wishlist only if not already there
    if (!alreadyInCart) {
      cart.items.push({ productId });
      await cart.save();
    }

    return res.json({ message: 'Moved to cart', productId });
  } catch (err) {
    console.error('moveToCart error:', err);
    return res.status(500).json({ error: 'Failed to move to Cart' });
  }
};


export const removeFromWishlist = async (req, res) => {
  const userId = 'guest'; // Replace with real user later
  const { productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.productId !== productId
    );

    await wishlist.save();
    res.json({ message: 'Item removed from wishlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove item from wishlist' });
  }
};

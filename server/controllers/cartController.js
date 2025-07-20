import Cart from "../models/Cart.js";
import Wishlist from "../models/Wishlist.js";

// @desc    Get cart for user
// @route   GET /api/cart

export const getCart = async (req, res) => {
  const userId = "guest";
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json({ items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart

// ✅ Better: Upsert + increment if item exists
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = "guest";

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      await Cart.create({
        userId,
        items: [{ productId, quantity }],
      });
      return res.json({ message: "Cart created and item added" });
    }

    // Check if item exists
    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex > -1) {
      // Item exists, increment quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Item doesn't exist, push new
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json({ message: "Cart updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save item to cart" });
  }
};


export const moveToWishlist = async (req, res) => {
  const userId = 'guest';

  const fullId = req.params.productId;
  if (!fullId) {
    return res.status(400).json({ error: 'Missing product ID in URL param' });
  }

  const productId = fullId.includes('/') ? fullId.split('/').pop() : fullId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) wishlist = new Wishlist({ userId, items: [] });

    const alreadyInWishlist = wishlist.items.some(
      (item) => item.productId === productId
    );

    // ✅ Always remove from cart
    cart.items = cart.items.filter((item) => item.productId !== productId);
    await cart.save();

    // ✅ Add to wishlist only if not already there
    if (!alreadyInWishlist) {
      wishlist.items.push({ productId });
      await wishlist.save();
    }

    return res.json({ message: 'Moved to wishlist', productId });
  } catch (err) {
    console.error('moveToWishlist error:', err);
    return res.status(500).json({ error: 'Failed to move to wishlist' });
  }
};


export const removeFromCart = async (req, res) => {
  const userId = "guest"; // Replace with real user later
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.productId !== productId);

    await cart.save();
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

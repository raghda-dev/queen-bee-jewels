//server/controllers/wishlistController.js

import Wishlist from "../models/Wishlist.js";
import Cart from "../models/Cart.js";


export const getWishlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist || wishlist.items.length === 0) {
      return res.json({ items: [] });
    }

    res.json({ items: wishlist.items });
  } catch (err) {
    console.error("getWishlist error:", err);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};



export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id.toString();

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      // First time: create wishlist
      wishlist = await Wishlist.create({
        userId,
        items: [{ productId }],
      });

      return res.json({
        message: "Wishlist created and item added",
      });
    }

    const itemExists = wishlist.items.some(
      (item) => item.productId === productId
    );

    if (!itemExists) {
      wishlist.items.push({ productId });
      await wishlist.save();
      return res.json({ message: "Item added to wishlist" });
    } else {
      return res.json({ message: "Item already in wishlist" });
    }
  } catch (err) {
    console.error("Add to Wishlist Error:", err);
    res.status(500).json({ error: "Failed to save item to wishlist" });
  }
};

export const moveToCart = async (req, res) => {
  const userId = req.user._id.toString(); // ✅ FIXED: use logged-in user

  const fullId = req.params.productId;
  if (!fullId) {
    return res.status(400).json({ error: "Missing product ID in URL param" });
  }

  const productId = fullId.includes("/") ? fullId.split("/").pop() : fullId;

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ error: "wishlist not found" });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const alreadyInCart = cart.items.some(
      (item) => item.productId === productId
    );

    wishlist.items = wishlist.items.filter(
      (item) => item.productId !== productId
    );
    await wishlist.save();

    if (!alreadyInCart) {
      cart.items.push({ productId });
      await cart.save();
    }

    return res.json({ message: "Moved to cart", productId });
  } catch (err) {
    console.error("moveToCart error:", err);
    return res.status(500).json({ error: "Failed to move to Cart" });
  }
};


export const removeFromWishlist = async (req, res) => {
  const userId = req.user._id.toString(); // ✅ FIXED: use logged-in user
  const { productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.productId !== productId
    );

    await wishlist.save();
    res.json({ message: "Item removed from wishlist" });
  } catch (err) {
    console.error("removeFromWishlist error:", err);
    res.status(500).json({ error: "Failed to remove item from wishlist" });
  }
};


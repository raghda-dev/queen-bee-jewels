import mongoose from 'mongoose';

const wishlistItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
//   quantity: { type: Number, required: true, default: 1 },
});

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true, default: 'guest' },
  items: [wishlistItemSchema],
}, { timestamps: true });

const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;

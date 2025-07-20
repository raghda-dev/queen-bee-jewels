// server/server.js

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cart.js';
import wishlistRoutes from './routes/wishlist.js';



connectDB(); // Connect to MongoDB

const app = express();

// CORS configuration to allow credentials from your frontend
app.use(cors({
  origin: 'http://localhost:3000', // your frontend origin
  credentials: true, // allow cookies/auth headers
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Route middleware for authentication
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);



// Default root route (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

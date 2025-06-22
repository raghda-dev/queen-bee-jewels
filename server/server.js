// server/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config(); // Load environment variables
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

// Default root route (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

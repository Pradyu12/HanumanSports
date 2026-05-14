const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
// Add your cart/order routes here later

const app = express();

// Middleware
app.use(cors()); // Prevents frontend connection errors
app.use(express.json()); // Allows Express to read req.body

// Connect to Database & Sync Tables
connectDB();

// Serve uploaded images to frontend
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Hanuman Sports Server running on http://localhost:${PORT}`);
});
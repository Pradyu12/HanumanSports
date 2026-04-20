const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the uploads folder so profile pictures are accessible via URL
// Path join is safer for cross-platform (Windows vs Linux) compatibility
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Debugging Logs ---
console.log("--- Route Initialization Check ---");
console.log("Auth Type:", typeof authRoutes);   
console.log("Admin Type:", typeof adminRoutes); 
console.log("User Type:", typeof userRoutes);   

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// --- Root Health Check Route ---
app.get('/', (req, res) => {
    res.json({
        status: "Online",
        message: "Hanuman Sports Backend is fully operational",
        timestamp: new Date(),
        endpoints: {
            auth: "/api/auth",
            admin: "/api/admin",
            user: "/api/user"
        }
    });
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`◇ Server live on http://localhost:${PORT}`);
});
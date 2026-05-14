const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
// Import other routes similarly...

const app = express();
app.use(cors());
app.use(express.json());

// Use the routes
app.use('/api', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
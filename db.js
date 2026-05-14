const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'prado',
    password: 'pradyu2916', // Update this to your actual password
    database: 'prado_db',
    port: 3306 // Use 3306 based on your DBeaver screenshot
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        return;
    }
    console.log('✅ Connected to Prado Database');
});

module.exports = db;
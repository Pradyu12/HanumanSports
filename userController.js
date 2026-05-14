const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Ensure the name is exactly 'updateProfile'
exports.updateProfile = (req, res) => {
    const { name, phone } = req.body;
    const userId = req.userId;

    db.query('UPDATE users SET name = ?, phone = ? WHERE id = ?', 
    [name, phone, userId], (err) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, message: 'Profile updated successfully!' });
    });
};

exports.changePassword = (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    db.query('SELECT password FROM users WHERE id = ?', [userId], async (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ success: false, message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, results[0].password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Current password incorrect' });

        const hashed = await bcrypt.hash(newPassword, 10);
        db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId], (err2) => {
            if (err2) return res.status(500).json({ success: false, message: err2.message });
            res.json({ success: true, message: 'Password updated successfully' });
        });
    });
};
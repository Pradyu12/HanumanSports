const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

router.get('/', async (req, res) => {
    try {
        // FIX: Replaced MongoDB .find() with Sequelize .findAll()
        const products = await Product.findAll(); 
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error fetching products" });
    }
});

module.exports = router;
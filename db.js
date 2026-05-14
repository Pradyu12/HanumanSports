const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: 3306,
        logging: false // Keeps terminal clean
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ MySQL Connected via Sequelize');
        
        // This command creates tables if they don't exist and enforces the UNIQUE email constraint
        await sequelize.sync(); 
    } catch (error) {
        console.error('❌ Connection error:', error);
    }
};

module.exports = { sequelize, connectDB };
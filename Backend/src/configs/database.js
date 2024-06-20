const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const connectionString = process.env.MONGO_URI;
        await mongoose.connect(connectionString, {
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
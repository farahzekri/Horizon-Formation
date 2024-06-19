const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const connectionString = 'mongodb+srv://bahaeddine170:7nTXgVpzZxbbXs0s@formation.cddpa6v.mongodb.net/FORMATION?retryWrites=true&w=majority&appName=Formation';
        await mongoose.connect(connectionString, {
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
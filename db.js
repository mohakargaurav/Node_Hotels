
const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// Set up the MongoDB connection
mongoose.connect(mongoURL);

const db = mongoose.connection;

// Listen for successful database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

// Listen for database connection errors
db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

// Listen for database disconnection
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;

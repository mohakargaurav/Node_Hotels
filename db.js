const mongoose = require('mongoose');

//const mongoURL = 'mongodb://localhost:27017/hotels'
const mongoURL = process.env.MONGODB_URL;
//const mongoURL = process.env.MONGODB_URL_LOCAL;

// Listen for connection events
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB Atlas');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Connect to MongoDB Atlas
mongoose.connect(mongoURL)
    .catch((err) => {
        console.error('Initial connection failed:', err.message);
    });

module.exports = db;

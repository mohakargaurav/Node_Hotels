require('dotenv').config();

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const app = express();

require('./db');

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to my hotel');
});

// Import routes
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuitemRoutes');

// Mount routes
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Hotel API is running'
    });
});

// Render provides PORT automatically
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

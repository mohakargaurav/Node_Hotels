require('dotenv').config();
const express = require('express');
const app = express();
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const db = require('./db');
const passport = require('./auth');

// Render provides PORT automatically
const PORT = process.env.PORT || 3000;

app.use(express.json());

//middleware functions
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`)
    next() // move to the next phase
}

app.use(logRequest);

// Home route
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session : false})

app.get('/',localAuthMiddleware,function (req, res) {
    res.send('Welcome to my hotel');
});

// Import router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuitemRoutes');


// use the router
app.use('/person',localAuthMiddleware,personRoutes);
app.use('/menu',localAuthMiddleware,menuItemRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Hotel API is running'
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

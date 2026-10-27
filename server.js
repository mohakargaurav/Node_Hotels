require('dotenv').config();

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express')
const app = express();
const db = require('./db');


const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function(req, res)  {
    res.send('welcome to my hotel')
})

//Import the routes files 
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('server is listening on port 3000')
})

  


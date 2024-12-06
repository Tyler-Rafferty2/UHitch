require('dotenv').config()
const fs = require('fs');
const express = require('express')
const https = require('https');
const cors = require('cors')

const mongoose = require('mongoose')

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

// express app
const app = express()


const corsOptions = {
    origin: 'https://www.uhitch.live',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };
  app.use(cors(corsOptions));

// middleware
app.use(express.json())

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
console.log('Host:', req.headers.host);  // Log the Host header
    console.log('Origin:', req.headers.origin);  // Log the Origin header
    console.log(req.path, req.method)
    next()
})
app.set('trust proxy', true);
// routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// db
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to mongo');
    // Load SSL certificate and key
    const options = {
      key: fs.readFileSync('/etc/letsencrypt/archive/www.uhitch.live/privkey1.pem'), 
      cert: fs.readFileSync('/etc/letsencrypt/archive/www.uhitch.live/fullchain1.pem'), 
    };

    // Start HTTPS server
    https.createServer(options, app).listen(port, () => {
      console.log(`Server running on post ${port}`);
    });
    })
    .catch((err) => {
        console.log(err)
    })

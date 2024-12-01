require('dotenv').config()

const express = require('express')

const cors = require('cors')

const mongoose = require('mongoose')

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

// express app
const app = express()


const corsOptions = {
    origin: 'http://www.uhitch.live',
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
        // listen
        app.listen(port, () => {
        console.log('connected to mongo and listening on port', port)
        })
    })
    .catch((err) => {
        console.log(err)
    })

require('dotenv').config()

const express = require('express')

const cors = require('cors')

const mongoose = require('mongoose')

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

// express app
const app = express()

app.use(cors())

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen
        app.listen(process.env.PORT, () => {
        console.log('connected to mongo and listening on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })
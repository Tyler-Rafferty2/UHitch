const mongoose = require('mongoose')
const userModel = require('./userModel')

const Schema = mongoose.Schema

const postSchema = new Schema({
    destination: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    postType: {
        type: String,
        required: true
    },
    acceptedUser: {
        type: String,
        default: ""
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)
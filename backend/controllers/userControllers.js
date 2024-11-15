const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET)
}

// get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}
// get a single user
const getUser = async (req, res) => {
    const {email} = req.params
    const user = await User.find({email: email})
    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }
    //const role = user.role
    res.status(200).json(user)
}

const logInUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// create a new user
const signUpUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.signup(email, password)
        const id = user._id
        res.status(200).json({email, id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a user
const deleteUser = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }
    const user = await User.findOneAndDelete({_id: id})
    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(user)
}

// update a user
const updateUser = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('id' + id)
        return res.status(404).json({error: 'Not a valid id'})
    }
    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    
    if (!user) {
        console.log('id' + id)
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(user)
}

module.exports = {
    getUsers, getUser, logInUser, signUpUser, deleteUser, updateUser
}
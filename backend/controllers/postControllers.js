const Post = require('../models/postModel')
const mongoose = require('mongoose')

// get all driver posts
const getDriverPosts = async (req, res) => {
    //console.log("made it to the get")
    const posts = await Post.find({postType: "Driver"})//.sort({createdAt: -1})
    //console.log("posts",posts)
    res.status(200).json(posts)
}

// get all rider posts
const getRiderPosts = async (req, res) => {
    const posts = await Post.find({postType: "Rider"})//.sort({createdAt: -1})
    res.status(200).json(posts)
}

// get all posts of a user
const getUserPosts = async (req, res) => {
    const {email} = req.params
    const posts = await Post.find({email: email})//.sort({createdAt: -1})
    res.status(200).json(posts)
}

// get all posts accepted by a user
const getAcceptedPosts = async (req, res) => {
    const {acceptedUser} = req.params
    const posts = await Post.find({acceptedUser: acceptedUser})//.sort({createdAt: -1})
    res.status(200).json(posts)
}

// get a single post
const getPost = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'})
    }
    const post = await Post.findById(id)
    if (!post) {
        return res.status(404).json({error: 'No such post'})
    }
    res.status(200).json(post)
}

// create a new post
const createPost = async (req, res) => {
    console.log("reached createPost")
    const {destination, description, date, email, postType} = req.body
    try {
        const post = await Post.create({destination, description, date, email, postType})
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error: 'Post wasnt made'})
    }
}

// delete a post
const deletePost = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'})
    }
    const post = await Post.findOneAndDelete({_id: id})
    if (!post) {
        return res.status(404).json({error: 'No such post'})
    }
    res.status(200).json(post)
}

// update a post
const updatePost = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'})
    }
    const post = await Post.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!post) {
        return res.status(404).json({error: 'No such post'})
    }
    res.status(200).json(post)
}

module.exports = {
    getDriverPosts, getRiderPosts, getUserPosts, getAcceptedPosts, getPost, createPost, deletePost, updatePost
}
const express = require('express')
const { getDriverPosts, getRiderPosts, getUserPosts, getAcceptedPosts, getPost, createPost, deletePost, updatePost} = require('../controllers/postControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// Post Routes
router.get('/driverposts', getDriverPosts)

router.get('/riderposts', getRiderPosts)

router.get('/:email', getUserPosts)

router.get('/accept/:acceptedUser', getAcceptedPosts)

router.get('/:id', getPost)

router.post('/createpost', createPost)

router.delete('/:id', deletePost)

router.patch('/addAccept/:id', updatePost)

module.exports = router
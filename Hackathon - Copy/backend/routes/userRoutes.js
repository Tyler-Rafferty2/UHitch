const express = require('express')
const { getUsers, getUser, signUpUser, deleteUser, updateUser, logInUser } = require('../controllers/userControllers')

const router = express.Router()

// User Routes
router.get('/', getUsers)

router.get('/:email', getUser)

router.post('/login', logInUser)

router.post('/signup', signUpUser)

//router.delete('/:id', deleteUser)

router.patch('/sendData/:id', updateUser)

module.exports = router
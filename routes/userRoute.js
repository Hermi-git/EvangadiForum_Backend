const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware')

//user controllers
const {register, login, checkUser} = require("../controller/userController")

//registration
router.post('/register', register)

//login user 
router.post('/login',login)

//check user
router.get('/check',authMiddleware, checkUser)

module.exports = router
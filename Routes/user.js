const express = require('express');
const { register,login,users, profile}  = require('../Controllers/user.js');
const Authenticated = require('../Middlewares/auth.js')

const router = express.Router();

//register user

router.post('/register',register)

//login user

router.post('/login',login)

//get all users
router.get('/all',users)

//get user profile

router.get('/profile',Authenticated,profile)

module.exports = router;
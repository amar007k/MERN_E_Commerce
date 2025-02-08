const express = require('express');
const { addAddress, getAddress } = require('../Controllers/address');
const Authenticated = require('../Middlewares/auth');


const router = express.Router();

//add Address
router.post('/add',Authenticated,addAddress)

//get address

router.get('/get',Authenticated,getAddress)

module.exports = router;
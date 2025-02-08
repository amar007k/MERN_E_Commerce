const express = require("express");
const { addToCart,userCart, removeProductFromCart, clearCart, decreaseProductQty } = require("../Controllers/cart");
const Authenticated = require("../Middlewares/auth");


const router = express.Router();

//add To Cart
router.post('/add',Authenticated,addToCart)

//get user cart
router.get('/user',Authenticated,userCart)

//removed from cart
router.delete('/remove/:prodId',Authenticated,removeProductFromCart)

//clear the cart
router.delete('/clear',Authenticated,clearCart)


//decrease items qty from cart
router.post('/--qty',Authenticated,decreaseProductQty)

module.exports = router;

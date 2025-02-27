const Payment = require("../Models/Payment");
const Razorpay = require("razorpay");
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//checkout
const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  var options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.json({
    orderId: order.id,
    amount: amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  });
};

//verify , save to db
const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus:"paid"
  });

  res.json({
    message:"Payment Successfull...",
    success:true,orderConfirm
  })
};

//user specific order

const userOrder = async (req,res)=>{
  let userId = req.user._id.toString();
  //console.log(userId)
  let orders = await Payment.find({userId: userId}).sort({orderDate : -1})
  res.json(orders)
}

//All order

const allOrders = async (req,res)=>{
  let orders = await Payment.find().sort({orderDate : -1})
  res.json(orders)
}


module.exports = { checkout, verify,userOrder,allOrders };

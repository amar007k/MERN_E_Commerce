const Cart = require("../Models/Cart");

//add To cart
const addToCart = async (req, res) => {
  const { prodId, title, price, qty, imgSrc } = req.body;
  const userId =  req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }
  const itemIndex = cart.items.findIndex(
    (item) => item.prodId.toString() === prodId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty;
  } else {
    cart.items.push({ prodId, title, price, qty, imgSrc });
  }

  await cart.save();
  res.json({ message: "Items Added To Cart", cart });
};

//get User cart

const userCart = async (req, res) => {
  const userId =  req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ message: "Cart Not Found" });
  res.json({ message: "user cart", cart });
};

//remove product from the cart

const removeProductFromCart = async (req, res) => {
  const prodId = req.params.prodId;
  const userId =  req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ message: "Cart Not Found" });
  cart.items = cart.items.filter((item) => item.prodId.toString() !== prodId);

  await cart.save();
  res.json({ message: "Product has been removed from cart", cart });
};

//clear cart

const clearCart = async (req, res) => {
  const userId =  req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ items: [] });
  } else {
    cart.items = [];
  }

  await cart.save();
  res.json({ message: "Cart has been cleared", cart });
};

//Decrease  qty from cart
const decreaseProductQty = async (req, res) => {
  const { prodId, qty } = req.body;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }
  const itemIndex = cart.items.findIndex(
    (item) => item.prodId.toString() === prodId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex];
    if (item.qty > qty) {
      const pricePerUnit = item.price / item.qty;
      item.qty -= qty;
      item.price -= pricePerUnit * qty;
    } else {
      cart.items.splice(itemIndex, 1);
    }
  } else {
    return res.json({ message: "Invalid product Id" });
  }

  await cart.save();
  res.json({ message: "Items qty decreased", cart });
};

module.exports = { addToCart, userCart, removeProductFromCart, clearCart ,decreaseProductQty };

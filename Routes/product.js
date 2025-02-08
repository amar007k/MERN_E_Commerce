const express = require("express");
const {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../Controllers/product.js");

const router = express.Router();

//add product

router.post("/add", addProduct);

//get All Products

router.get("/all", getProducts);

//get product by Id
router.get("/:id", getProductById);

//update product by id

router.put("/:id", updateProductById);


//delete  product by id

router.delete("/:id", deleteProductById);
module.exports = router;

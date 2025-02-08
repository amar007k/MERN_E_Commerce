const Product = require('../Models/Product.js');

//add product

const addProduct = async(req,res)=>{
    const {title,description,price,category,qty,imgSrc} = req.body;
    try {
        let product = await Product.create({title,description,price,category,qty,imgSrc});
        res.json({message:'Product added successfully!',product})
    } catch (error) {
        res.json({message:error.message})
    }
}

//get Product

const getProducts = async(req,res)=>{
    //const {id} = req.params.id;
    let products = await Product.find().sort({createdAt:-1});
    res.json({message:"All Products",products})
}


//find product by Id
const getProductById = async(req,res)=>{
    const _id = req.params.id;
    let product = await Product.findById(_id);
    if(!product) return res.json({message:"Invalid id"})
    res.json({message:"Specific Product",product})
}

//update the product by id

const updateProductById = async(req,res)=>{
    const _id = req.params.id;
    let product = await Product.findByIdAndUpdate(_id,req.body,{new:true});
    if(!product) return res.json({message:"Invalid id"})
    res.json({message:"Product has been updated",product})
}

//delete product by ID

const deleteProductById = async(req,res)=>{
    const _id = req.params.id;
    let product = await Product.findByIdAndDelete(_id);
    if(!product) return res.json({message:"Invalid id"})
    res.json({message:"Your Product has been deleted",product})
}
//All Modules
module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
};

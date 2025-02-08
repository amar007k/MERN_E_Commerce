const Address  = require('../Models/Address.js');


const addAddress = async(req,res)=>{
let {fullname,address,city,state,country,pincode,phoneNumber} = req.body;

let userAddress = await Address.create({userId:req.user,
    fullname,address,city,state,country,pincode,phoneNumber})
    res.json({message:"Address added",userAddress,success:true})

}

//getAddress

const getAddress = async(req,res)=>{
    let address = await Address.find({userId:req.user}).sort({createdAt:-1});
    res.json({message:"Address",userAddress:address[0]})
}

module.exports = {addAddress,getAddress};
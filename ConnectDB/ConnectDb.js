const mongoose = require('mongoose');

const ConnectDB = async()=>{
   // const  connect = await mongoose.connect("mongodb://localhost:27017/MERN_ECOM");
   const connect = await mongoose.connect("mongodb+srv://amar:amar123@cluster0.vqxj6.mongodb.net/",{
    dbName:"MERN_ECOM"
   })
    if(connect){
        console.log("Database is connected successfully");
    }else{
        console.log("Database is not connected.");
    }

};

module.exports = ConnectDB;
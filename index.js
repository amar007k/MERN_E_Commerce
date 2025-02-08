const express = require('express');
const cors = require('cors');
const ConnectDb = require('./ConnectDB/ConnectDb');
require('dotenv').config();
const userRouter = require ('./Routes/user.js')
const productRouter = require('./Routes/product.js')
const cartRouter = require('./Routes/cart.js')
const addressRouter = require('./Routes/address.js')
const paymentRouter = require('./Routes/payment.js')


const app = express();
app.use(express.json());

app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

const PORT = process.env.PORT || 8080;

const startServer = async()=>{
   try{
    await ConnectDb();
    app.listen(PORT,()=>{
        console.log(`Server is running:http://localhost:${PORT}`);
    })
   } catch(err){
    console.log("Server is not running",err);
   }

}



//user Router
app.use('/api/user',userRouter)

//product Router
app.use('/api/product',productRouter)

//cart Router

app.use('/api/cart',cartRouter)

//address Router

app.use('/api/address',addressRouter)

// payment Router
app.use('/api/payment',paymentRouter)

//home testing
// app.get('/',(req,res)=>{
//     res.json({message:"Hello MERN APP"});
// })
//start the server

startServer();
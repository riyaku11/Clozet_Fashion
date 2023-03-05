const mongoose = require("mongoose");
 
const shipping = new mongoose.Schema({
    address :{type: String, required: true},
    city :{type: String, required: true},
    state :{type: String, required: true},
    country :{type: String, required: true},
    pinCode:{type: Number, required: true},
    phoneNumber:{type: Number, required: true}
})


const item = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    product:{
        type: mongoose.Schema.ObjectId,
        ref:"Product",
        required:true
    }
    
})

const payment = new mongoose.Schema({
    id:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        required: true,
        default:"Shipped"
    },
    paidAt:{
        type:Date ,
        required: true,
        default: Date.now()
    },
    itemsPrice:{
        type:Number,
        required: true,
        default:0
    },
    taxPrice:{
        type:String,
        required: true,
        default:0
    },
    shippingPrice:{
        type:String,
        required: true,
        default:0
    },
    totalPrice:{
        type:String,
        required: true,
        default:0
    },


})


const orderSchema = new mongoose.Schema({
 shippingInfo :{
type: shipping,
required:true
 },
 orderItems:[{
type:item,
required: true
 }],
 user:{
    type: mongoose.Schema.ObjectId,
    ref:"User",
    required:true
 },
 paymentInfo:{
type:payment,
required:true
 },
 orderStatus:{
    type:String,
    required: true,
    default:"Processing"
 },
 deliveredAt: Date,
 createdAt:{
    type: Date,
    default: Date.now(),
 }
})

module.exports = mongoose.model("Order", orderSchema);
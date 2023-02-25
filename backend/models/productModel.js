const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true

    },
    comments:{
        type:String,
        required:true

    }
})

const imageSchema = new mongoose.Schema({
      public_id:
         {
            type:String,
            required:true
         },
        url:
         {
            type:String,
            required:true
         }

})


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please neter product price"],
        maxlength:[8,"price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0 
    },
      images:[
        {type:imageSchema,
            required:true
          }
      ]
       ,
      category:{
        type:String,
        required:[true, "please enter product category"]
      },
      stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxlength:[4,"stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:{
        type:reviewSchema,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }


}) 

module.exports = mongoose.model("Product",productSchema);
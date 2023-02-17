const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsynErrors = require("../middleware/catchAsyncErrors");


// create product --admin
exports.createProduct = catchAsynErrors(async (req,res,next)=>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })

});


//get all products
exports.getAllProducts= catchAsynErrors (async(req,res)=>{
    const products = await Product.find();
    res.status(201).json({
        success:true,
        products
    })
});

//update product --admin
exports.updateProduct = catchAsynErrors (async (req,res,next)=>{
let product = await Product.findById(req.params.id);

if(!product){
    return next(new ErrorHandler("product not found", 404));
 }

product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
})

res.status(200).json({
    success:true,
    product
})
});

//Get product details

exports.getProductDetails = catchAsynErrors (async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    
    if(!product){
       return next(new ErrorHandler("product not found", 404));
    }

    res.status(200).json({
        success:true,
        product
    })

});


//delete products --admin

exports.deleteProduct = catchAsynErrors (async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found", 404));
     }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"product deleted successfuly"
    })
});

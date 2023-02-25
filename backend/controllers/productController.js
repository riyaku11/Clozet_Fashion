const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsynErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



// create product --admin
exports.createProduct = catchAsynErrors(async (req,res,next)=>{

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});


//get all products
exports.getAllProducts= catchAsynErrors (async(req,res)=>{
    const resultsPerPage = 6;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
    const products = await apiFeature.query;

    res.status(201).json({
        success:true,
        products,
        productCount
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


// Create new review or update the review
// exports.createProductReview = catchAsynErrors(
//     async (req,res,next)=>{

//         const {rating, comment, productId} =req.body;

//         const review = {
//             user: req.user._id,
//             name: req.user.name,
//             rating :Number(rating),
//             comment
//         };

//         const product = await Product.findById(productId);

//         const isReviewed = product.reviews.find(
//             (rev)=> rev.user.toString() === req.user._id.toString()
//         );

//         if(isReviewed){
//             product.reviews.forEach((rev)=>{
//                 if(rev.user.toString() === req.user._id.toString()){
//                     (rev.rating = rating),(rev.comment = comment);
//                 }
//             })

//         }else{
//             product.reviews.push(review);
//             product.numOfReviews = product.reviews.length;
//         }

//         let avg = 0;
//         product.ratings = product.reviews.forEach(rev=>{
//             avg += rev.rating;
//         })/product.reviews.length;

//         await product.save({ validateBeforeSave: false});

//         res.status(200).json({
//             success: true
//         });


//     }
// );
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
    exports.createProductReview = catchAsynErrors(async (req, res, next) => {
        const { rating, comment, productId } = req.body;
      
        const review = {
          user: req.user._id,
          name: req.user.name,
          ratings: Number(rating),
          comment,
        };
      
        const product = await Product.findById(productId);
      console.log(product);
    
      const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
      );
     console.log(product.reviews)

        if (isReviewed) {
          product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
              (rev.ratings = rating), (rev.comment = comment);
          });
        } else {
          product.reviews.push(review);
          product.numOfReviews = product.reviews.length;
        }
      console.log(product.reviews)
        let avg = 0;
      
        product.reviews.forEach((rev) => {
          avg += rev.ratings;
        });
      
        product.ratings = avg / product.reviews.length;
      
        await product.save({ validateBeforeSave: false });
      
        res.status(200).json({
          success: true,
        });
      });

// get all reviews of a product
exports.getProductReviews = catchAsynErrors(
  async (req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
      return next(new ErrorHandler("product not found", 404));
   }

   res.status(200).json({
    success:true,
    reviews: product.reviews,
   })
  }
)      

// Delete review
exports.deleteReview = catchAsynErrors(
  async (req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
      return next(new ErrorHandler("product not found", 404));
   }

   const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

   let avg = 0;
      
        reviews.forEach((rev) => {
          avg += rev.rating;
        });
      
        const ratings = avg / reviews.length;

        const numOfReviews = reviews.length;

        await Product.findByIdAndUpdate(req.query.productId,{
          reviews,
          ratings,
          numOfReviews
        },{
          new:true,
          runValidators:true,
          useFindAndModify:false
        })


   res.status(200).json({
    success:true,
   })
  }
)
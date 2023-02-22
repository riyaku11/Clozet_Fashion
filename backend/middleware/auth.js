const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
const User = require("../models/userModel")


exports.isAuthenticatedUser = catchAsyncErrors( async (req,res,next)=>{

    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
    }

   const decodedData = jwt.verify(token,process.env.JWT_SECRET);
//    console.log(decodedData); 
   req.user = await User.findById(decodedData.id);
//    console.log(req.user)
    next();
});

//admin function
exports.authorizeRoles = catchAsyncErrors( async (req,res,next)=>{

    const {token} = req.cookies;
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
//    console.log(decodedData); 
   req.user = await User.findById(decodedData.id);
   console.log(req.user)
   console.log(req.user.roles)
   const role = req.user.roles;
   if(role !=="admin"){
    return next(new ErrorHandler(`Role : ${req.user.roles} Access denied`,401))
}
    next();
});

// exports.authorizeRoles =  (...roles)=>{
//     return (req,res,next)=>{
//         const {token} = req.cookies;
//         const role = req.user.role;
//         // const role = "user";
//         if(!roles.includes(role)){
//            return next(
//             new ErrorHandler(`Role: ${role} is not allowed to access this resource`,403)
//            ) ;
//         }
//         next();
//     }
// }


// exports.authorizeRoles = catchAsyncErrors(
//     async (req,res,next)=>{
//         const {token} = req.cookies;
     
//         const decodedData = jwt.verify(token,process.env.JWT_SECRET);
//          req.user = await User.findById(decodedData._id);
// // const role = req.user.role;
// console.log(req.user);
// if(data.role !== "admin" || !token){
//     return next( new ErrorHandler(`Role:${data.role}  is not allowed to access this resource`,403)) ;
//     }
// next();
//     }
// )

// exports.authorizeRoles = async (req, res, next) => {
//     try{
//         const { token } = req.cookies;
//         const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//         const {role} = await User.findById(decodedData._id);
//         console.log(role) //check krna ki hame data me kuch mil rha h ya nhi
//         // console.log(data.role) //role dekhna ki aa rha h ya nhi
//         if (data.role = "admin" && token) {
//             next()
//         }
//     }catch (error) {
//         console.log(error) 
//     }
// }

const ErrorHandler = require("../utils/errorhandler");
const catchAsynErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//Register a user
exports.registerUser = catchAsynErrors( async(req,res,next)=>{

    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is sample id",
            url:"profilepicurl"
        }
    });
     sendToken(user,201,res);

})


// Login User
exports.loginUser = catchAsynErrors(
    async (req,res,next)=>{
    const {email,password}=req.body;
    
    //checking if user gives both email and password

    if(!email || !password){
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");
    
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }
   
sendToken(user,200,res);

    }
)

//Logout user

exports.logout = catchAsynErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success:true,
        message:"Logged out"
    })
})

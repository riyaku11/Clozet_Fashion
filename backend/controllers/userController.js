const ErrorHandler = require("../utils/errorhandler");
const catchAsynErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendMail");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const crypto = require("crypto");



//Register a user
exports.registerUser = catchAsynErrors( async(req,res,next)=>{

    const {name,email,password,role} = req.body;
    const user = await User.create({
        name,email,password,role,
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

// Forgot password
exports.forgotPassword = catchAsynErrors(
    async(req,res,next)=>{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return next(new ErrorHandler("User not found",404));
        }

        // get resetPassword Token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false});


        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email , kindly ignore it. `;


        try {
            await sendEmail({
                email:user.email,
                subject: `Clozet password recovery`,
                message
            })

            res.status(200).json({
                success:true,
                message: `Email sent to ${user.email} successfully`
            });


        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire =undefined;
            await user.save({ validateBeforeSave: false});

            return next(new ErrorHandler(error.message,500));
        }
    }
);

//Reset password
exports.resetPassword = catchAsynErrors(
    async (req,res,next)=>{

        //creating token hash
        const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt:Date.now()},
        });

        if(!user){
            return next(new ErrorHandler("Reset Password token is invalid or has been expured",400));
        }

        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler("Password does not match",400));
        }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire =undefined;

            await user.save();

            sendToken(user, 200, res);
    }
)

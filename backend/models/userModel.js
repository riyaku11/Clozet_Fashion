const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,"Name should not exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"],
        default:"anshkr"
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"],
    
    },
    password:{
        type:String,
        required:[true,"please enter your password"],       
        minLength:[8, "Password should be greater than 8 characters"],
        select: false
    },
    avatar:{
        type:imageSchema,
        required:true
    },
    role:{
        type: String,
        required:[true,"please enter your role"],       
        minLength:[3, "role should be greater than 8 characters"],
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);

})

//JWT TOKEN
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
} 


//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User", userSchema);
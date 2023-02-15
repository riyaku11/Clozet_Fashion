const mongoose = require("mongoose");

const connectDatabase=  ()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true, useUnifiedTopology:true}).then((data)=>{
        console.log("connected to mongodb successfully !");
        console.log(`mongodb connected with server : ${data.connection.host}`);
        // console.log(process.env.DB_URI);
    }).catch((err)=>{
        console.log("oops theres an error");
    console.log(err);
    })
    
} 


module.exports = connectDatabase;
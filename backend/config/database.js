const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const connectDatabase=  ()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true, useUnifiedTopology:true}).then((data)=>{
        console.log("connected to mongodb successfully !");
        console.log(`mongodb connected with server : ${data.connection.host}`);
        // console.log(process.env.DB_URI);
    })
    
} 


module.exports = connectDatabase;
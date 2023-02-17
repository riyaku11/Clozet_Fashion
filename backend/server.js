const express = require("express");
const app = require("./app")

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught exception error`);
    process.exit(1);
})


//config
dotenv.config();

//connecting database
connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
    console.log(process.env.PORT)
})



// unhandled promise rejections
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
server.close(()=>{
    process.exit(1);
})
});



const express = require("express");
const app = express();

const errorHandler = require("./middleware/error");
app.use(express.json());

//routes imports
const productRoute = require("./routes/productRoute");


app.use("/api/v1",productRoute);

//middleware for errors
app.use(errorHandler)


module.exports= app;
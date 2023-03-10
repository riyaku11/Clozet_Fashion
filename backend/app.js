const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

//routes imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute")

app.use("/api/v1",productRoute);
app.use("/api/v1",userRoute);
app.use("/api/v1",orderRoute);


//middleware for errors
app.use(errorHandler)


module.exports= app;
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsynErrors = require("../middleware/catchAsyncErrors");

//create new Order
exports.newOrder = catchAsynErrors(
    async(req,res,next)=>{

        const {shippingInfo,
             orderItems,
             paymentInfo,
             itemsPrice,
             taxPrice,
             shippingPrice,
             totalPrice
            } = req.body;

         const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id
         })   

         res.status(201).json({
            success: true,
            order
         })

    }
);

//get single order
exports.getSingleOrder = catchAsynErrors(
    async (req,res,next)=>{
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if(!order){
            return next(new ErrorHandler("Order not found with this ID", 404));
        }

        res.status(200).json({
            success: true,
            order
        })
    }
)

//get logged in user orders
exports.myOrders = catchAsynErrors(
    async (req,res,next)=>{
        const orders = await Order.find({user: req.user._id});

        res.status(200).json({
            success: true,
            orders
        })
    }
)

//get all orders --admin
exports.getAllOrders = catchAsynErrors(
    async (req,res,next)=>{
        const orders = await Order.find();

        let totalAmount = 0;

        orders.forEach((order)=>{
            // console.log(order.paymentInfo.totalPrice)
            totalAmount += order.paymentInfo.totalPrice;
        })

        res.status(200).json({
            success: true,
            totalAmount,
            orders
        })
    }
)


//update Order Status --admin
exports.updateOrder = catchAsynErrors(
    async (req,res,next)=>{
        const order = await Order.findById(req.params.id);

        if (!order){
            return next(new ErrorHandler("Order not foundwith this Id", 404));
        }

        if(order.orderStatus === "Delivered"){
            return next(new ErrorHandler("You have already delivered this order",400))
        }
//added async
        order.orderItems.forEach(async (order)=>{
            await updateStock(order.product, order.quantity);
        })

        order.orderStatus = req.body.status;

        if(req.body.status === "Delivered"){
            order.deliveredAt = Date.now();
        }
await order.save({validateBeforeSave: false});
        res.status(200).json({
            success: true,
        })
    }
);

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false});
}

//delete order --admin
exports.deleteOrder = catchAsynErrors(
    async (req,res,next)=>{
        const order = await Order.findById(req.params.id);

        if (!order){
            return next(new ErrorHandler("Order not foundwith this Id", 404));
        }

        await order.remove();

        res.status(200).json({
            success: true,
        })
    }
)

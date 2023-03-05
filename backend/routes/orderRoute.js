const express = require("express");
const { newOrder, myOrders,getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser ,authorizeRoles} = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder)
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder)

router.route("/orders/:id").get(isAuthenticatedUser, myOrders)

router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles,getAllOrders)
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles,updateOrder)
router.route("/admin/order/:id").delete(isAuthenticatedUser,authorizeRoles,deleteOrder)


module.exports = router;
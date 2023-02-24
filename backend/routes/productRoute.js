const express = require("express");
const { getAllProducts , createProduct, updateProduct,deleteProduct, getProductDetails} = require("../controllers/productController");
const { isAuthenticatedUser ,authorizeRoles} = require("../middleware/auth");
// const {authorizeRoles } =require("../controllers/userController")

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product/new").post(isAuthenticatedUser, authorizeRoles,createProduct);

router.route("/product/:id").put(isAuthenticatedUser,authorizeRoles,updateProduct);

router.route("/product/:id").delete(isAuthenticatedUser , authorizeRoles, deleteProduct);

router.route("/product/:id").get(getProductDetails);

module.exports= router;
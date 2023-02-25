const express = require("express");
const { getAllProducts , createProduct, updateProduct,deleteProduct, getProductDetails, createProductReview} = require("../controllers/productController");
const { isAuthenticatedUser ,authorizeRoles} = require("../middleware/auth");
// const {authorizeRoles } =require("../controllers/userController")

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles,createProduct);

router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles,updateProduct);

router.route("/admin/product/:id").delete(isAuthenticatedUser , authorizeRoles, deleteProduct);

router.route("/product/:id").get(getProductDetails);

// router.route("/review").put(isAuthenticatedUser,createProductReview);

module.exports= router;
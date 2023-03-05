const express = require("express");
const { getAllProducts , createProduct, updateProduct,deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview} = require("../controllers/productController");
const { isAuthenticatedUser ,authorizeRoles} = require("../middleware/auth");
// const {authorizeRoles } =require("../controllers/userController")

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles,createProduct);

router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles,updateProduct);

router.route("/admin/product/:id").delete(isAuthenticatedUser , authorizeRoles, deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview);

router.route("/reviews").get(getProductReviews);

router.route("/reviews").delete(isAuthenticatedUser, deleteReview);


module.exports= router;
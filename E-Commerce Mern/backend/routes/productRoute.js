const express = require("express");
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetail, createProductReview} = require("../controller/product.controller");
const { isAuthenticatedUSer , authorizeRoles} = require("../middleware/auth");


const router = express.Router();



router.route("/products").get(getAllProducts)
router.route("/product/new").post(isAuthenticatedUSer,authorizeRoles("admin"),createProduct);
router.route("/product/:id")
.delete(isAuthenticatedUSer,authorizeRoles("admin"),deleteProduct)
.put(isAuthenticatedUSer,authorizeRoles("admin"),updateProduct)

router.router("product/:id").get(getProductDetail);
router.route("/review").put(isAuthenticatedUSer , createProductReview)







module.exports = router
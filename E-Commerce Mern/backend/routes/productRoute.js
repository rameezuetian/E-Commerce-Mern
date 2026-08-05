const express = require("express");
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetail} = require("../controller/product.controller");
const { isAuthenticatedUSer , authorizeRoles} = require("../middleware/auth");


const router = express.Router();



router.route("/products").get(getAllProducts)
router.route("/product/new").post(isAuthenticatedUSer,authorizeRoles("admin"),createProduct);
router.route("/product/:id")
.delete(isAuthenticatedUSer,authorizeRoles("admin"),deleteProduct)
.get(getProductDetail)
.put(isAuthenticatedUSer,authorizeRoles("admin"),updateProduct)

module.exports = router
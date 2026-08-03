const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");



// create product -- admin

exports.createProduct = catchAsyncErrors(async (req, res , next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    }
    )
})

// Get all products 
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    });
})


// Update Product -- Admin
exports.updateProduct =catchAsyncErrors(
     async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found" , 404))
    }

    product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        success: true,
        product
    });
})

//  get product detais
exports.getProductDetail = catchAsyncErrors(
     async (req , res , next) =>{
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found" , 404))
    }


     res.status(200).json({
        success: true,
        product
    });



}
)




// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(
    async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
       return next(new ErrorHandler("Product not found" , 404))
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
})
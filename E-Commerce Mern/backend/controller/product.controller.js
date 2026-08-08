const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const sendToken = require("../utils/jwtToke");



// create product -- admin

exports.createProduct = catchAsyncErrors(async (req, res , next)=>{

    req.body.user = req.user.id;


    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    }
    )
})

// Get all products 
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 5;

    const productCount =  await Product.countDocuments();


    const apiFeature = ApiFeatures(Product.find()  , req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;

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
        product,
        productCount,
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


// Create New Review or update the review
exports.createProductReview = catchAsyncErrors(async (req , res, next)=>{
    const {rating , comment , productId} = req.body;

    const review = {
        user: req.user._id,
        name:req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id)
    if(isReviewed){
        product.reviews.forEach(rev =>{
            rev.rating = rating,
            rev.comment = comment
        })

    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    let avg = 0;
    product.ratings = product.reviews.forEach(rev=>{
        avg = avg + rev.rating
    })/product.reviews.length;

    await product.save({validateBeforeSave : false})

    sendToken(user, 200 , res)

})

//  GEt all the reviews of a product
exports.getProductReviews = catchAsyncErrors( async (req , res , next)=>{
    const product = await Product.findById(req.body.id);

    if(!product){
        return next(new ErrorHandler("Product not found" ,404));
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews,
    })
})


// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res , next)=>{
    const product = await Product.findById(req.query.id);
    
    if(!product){
        return next(new ErrorHandler("Product not found" ,404));
    }
    const reviews = product.reviews.filter(rev=> rev._id.toString() !== req.query.id.toString())


    let avg = 0;
   reviews.forEach((rev)=>{
        avg +=rev.rating
    });

   const ratings = avg / product.reviews.length;

   const numOfReviews = reviews.length;

   await product.findByIdAndUpdate(req.query.prodcutId,{
    reviews,
    ratings,
    numOfReviews,
   },{
    new : true,
    runValidators : true,
    useFindAndModify:false,
   })

    res.status(200).json({
        success:true
    })

})
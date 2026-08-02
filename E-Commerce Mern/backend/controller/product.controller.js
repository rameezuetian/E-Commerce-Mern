const Product = require("../models/productModel")




// create product -- admin

exports.createProduct = async (req, res , next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    }
    )
}

// Get all products 
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    });
};


// Update Product -- Admin
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
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
};

//  get product detais
exports.getProductDetail = async (req , res , next) =>{
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }


     res.status(200).json({
        success: true,
        product
    });



}




// Delete Product -- Admin
exports.deleteProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
};
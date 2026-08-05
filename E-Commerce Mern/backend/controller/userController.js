const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToke")

// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a simple id",
            url: "profilepicUrl",
        },
    });

   sendToken(user , 200 , res); 


    // Login User

    exports.loginUser = catchAsyncError(async (req ,res , next)=>{
        const {email , password}= req.body;


        if(!email || !password){
            return next(new ErrorHandler("Please enter email & passowrd" , 400));
        }

        const user = User.findOne({email}).select("+password");

        if(!user){
            return next(new ErrorHandler("Invalid email or password"));
        }

        const isPasswordMatched =await  user.comparePassword(password);

        if(!isPasswordMatched){
            return next(new ErrorHandler("invalid email or password" , 401));
        }

    sendToken(user , 200 , res);
    })


    // logout  user
    exports.logout = catchAsyncError(async (req , res , next)=>{
       res.cookie("token" , null , {
        expires : new Date(Date.now()),
        httpOnly : true,
       })
       
       
        res.status(200).json({
            success:true,
            message:"Logged Out"
        })
    })


});
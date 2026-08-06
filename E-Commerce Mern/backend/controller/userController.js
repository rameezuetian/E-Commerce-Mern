const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToke")
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto")
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

// Forgot password
exports.forgotPassword = catchAsyncError(async (req, res , next)=>{
    const user = await User.findOne({email:req.body.email});


    if(!user){
        return next(new ErrorHandler("User not found ", 404));
    }

    // GEt ResetPassword Token
    const resetToken  = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`


    const message =  `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then , please ignore it`

    try{
        
        await sendEmail({
            email : user.email,
            subject : `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message : `Email sent to ${user.email} successfully`
        })
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message , 500))
    }
 });


 exports.resetPassword = catchAsyncError(async (req, res , next)=>{
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });


    if(!token){
        return next(new ErrorHandler("Reset Password Token is  invlaid or had been expired", 400));

    }



    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not password", 400))
    }


    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;


    await user.save();

    sendToken(user, 200, res);
 })



//   Get User Details

exports.getUserDetail = catchAsyncError( async (req, res , next)=>{
    const user = await User.findById(req.user.id);


    res.status(200).json({
        success:true,
        user,
    })
})


//   update User Password

exports.updatePassword = catchAsyncError( async (req, res , next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect", 401));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save()
    sendToken(user, 200 , res)
})



//   update User Profile

exports.updateProfile = catchAsyncError( async (req, res , next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }

    //  we will add cloudinary later

    const user = User.findByIdAndUpdate(req.user.id , newUserData , {
        new : true,
        runValidators: true,
        useFindAndModify : false,
    })

    res.status(200).json({
        success :true,
    })
})

//  Get all the users --admin
exports.getAllUser = catchAsyncError(async (req, res, next)=>{
    const user = await User.find();

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
    };

    res.status(200).json({
        success:true,
        user
    })
})


exports.getSingleUser = catchAsyncError(async (req, res, next)=>{
    const user = await User.find();

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
    };

    res.status(200).json({
        success:true,
        user
    })
})

//   update User Role --admin

exports.updateUserRole = catchAsyncError( async (req, res , next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }

    //  we will add cloudinary later

    const user = User.findByIdAndUpdate(req.user.id , newUserData , {
        new : true,
        runValidators: true,
        useFindAndModify : false,
    })

    res.status(200).json({
        success :true,
    })
})

//   delete User profile -- admin

exports.deleteProfile = catchAsyncError( async (req, res , next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`{User does not exist with id: ${req.params.id}`))
    };


    await user.remove();

    res.status(200).json({
        success :true,
    })
})
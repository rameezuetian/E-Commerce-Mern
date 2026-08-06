const ErrorHandler = require("../utils/errorhandler");



module.exports = (err , req, res , next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    // Wrong Mongodb id error
    if(err.name === "CastError"){
        const message = `Resource not found . Invalid  : ${err.path}`;
        err = new ErrorHandler(message , 400);
    }

    // mongodb dublicate error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyvalue)} Entered`
        err = new ErrorHandler(message , 400)
    }
      // json web token error
     if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid try , again`;
        err = new ErrorHandler(message , 400);
    }


    // json web token expire error
     if(err.name === "TokenExpireError"){
        const message = `Json Web Token is Expired try , again`;
        err = new ErrorHandler(message , 400);
    }

    res.status(err.statusCode).json({
        success :false ,
        message : err.message,
    });
}
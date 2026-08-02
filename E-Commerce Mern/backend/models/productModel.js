const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
    name:{
        type :String,
        required : [true , "Please Enter Prduct Name"]
    },
    description :{
        type : String ,
        required : [true , "Please Enter product Description"]
    },
    price :{
        type : Number,
        required : [true , "Please Enter product price"],
        maxLength :[ 8  , "Price cannot exceed 8 character"]
    },
    rating : {
        type: Number,
        default : 8
    },
    images:[
        {
            public_id:{
            type:String,
            required: true
        },
        url:{
            type:String,
            required: true
        },
        }
    ],
    category:{
        type :String,
        required : [true , "Please enter product Category"],
    },
    Stock :{
        type : Number,
        required : [true , "Please enter product stock"],
        maxLength : [4 ,"STock cannot exceed  4 characters"],
        default : 1
    },
    numOfReview :{
        type : Number,
        default : 0
    },
    reviews :[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required :true,
            },
            comment:{
                type:String,
                required :true
            }
        }
    ],
    createdAT :{
        type:Date,
        default:Date.now
    }

})


module.exports =  mongoose.model("Product" , productSchema);
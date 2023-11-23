const {Schema,Types,model}=require('mongoose')
const userSchema=Schema({
    name:{
        type:String
    },
    phone:{
        type:Number
    },
    password:{
        type:String 
    },
    authToken:{
        type:String
    },
    otpVerify:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true,versionKey:false})

module.exports=model("user",userSchema)
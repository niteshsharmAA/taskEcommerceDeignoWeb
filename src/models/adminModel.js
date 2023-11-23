const {Schema,Types,model}=require('mongoose')
const userSchema=Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String 
    },
    authToken:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true,versionKey:false})

module.exports=model("admin",userSchema)
const mongoose=require('mongoose')

const productschema=mongoose.Schema({

    productName:{
        type:String
    },
    image:{
        type:String
    },
    price:{
        type:String
    },
     category:{
       type: mongoose.Schema.Types.ObjectId
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports=new mongoose.model('product',productschema);

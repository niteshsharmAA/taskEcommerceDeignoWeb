let mongoose=require('mongoose')

const orderSchema=mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    product:{
        type:Array
    },
    addressId:{
        type:mongoose.Schema.Types.ObjectId
    },
    total:{
        type:Number
    },
    orderId:{
        type:String
    },
    orderStatus:{
        type:String
    },
    orderDate:{
        type:Date
    },
    coupon:{
        type:String
    },
    paymentStatus:{
        type:String,
        default:"pending"
    },

    isDeleted:{
        type:Boolean,
        default:false
    }
})
module.exports=new mongoose.model('order',orderSchema)

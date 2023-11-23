const services=require('./services')
const {orderModel}=require('../../models/index')
const{updateOne}=require('../../utils/dbOperations')
const { fixLink } = require("../../utils/fileUploader")
exports.orderList=async()=>{
    data=await services.orderListSer()

    return{
        statusCode:200,
        status:true,
        message:"order List",
        data:data
    }
}

exports.orderProduct=async({query,hostname})=>{

   let data=await services.orderItemSer(query)
   data = fixLink({ data: data, hostname, fieldName: "image", folderName: "Product"})
    return{
        statusCode:200,
        status:true,
        message:"order List",
        data:data
    }
}

exports.paymentStatus=async({query})=>{
    const data=await updateOne(orderModel,{orderId:query.orderId},{paymentStatus:"paid"})
    return{
        statusCode:200,
        status:true,
        message:"payment approve",
        data:data
    }
}
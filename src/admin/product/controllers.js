const {productModel,categoryModel}=require('../../models/index')
const {findOne,create,updateOne,find}=require('../../utils/dbOperations')
const { fixLink } = require("../../utils/fileUploader")
const services=require('./services')
exports.addProduct=async({body})=>{

    let category=await findOne(categoryModel,{_id:body.category})
    if(!category){
        return{
            statusCode:400,
            status:false,
            message:"Not Found This Categoery",
            data:{}
        }
    }

    await create(productModel,body)
   
    return{
        statusCode:200,
        status:true,
        message:"Product Added Successfully",
        data:body
    }
}

exports.getProduct=async({hostname})=>{
    let data=await services.productDataSer()
    data = fixLink({ data: data, hostname, fieldName: "image", folderName: "Product"})
    return{
        statusCode:200,
        status:true,
        message:"product List",
        data
    }
}

exports.editProduct=async({body})=>{

    let product=await findOne(productModel,{_id:body.id})
    console.log(product,"prrr")
    if(!product){
        return{
            statusCode:400,
            status:false,
            message:"Not Found This Product",
            data:{}
        }
    }

    let category=await findOne(categoryModel,{_id:body.category})
    if(!category){
        return{
            statusCode:400,
            status:false,
            message:"Not Found This Categoery",
            data:{}
        }
    }

    await updateOne(productModel,{_id:body.id},body)
    return{
        statusCode:200,
        status:true,
        message:"Product Updated Successfully",
        data:body
    }
}

exports.deleteProduct=async({body})=>{

    let product=await findOne(productModel,{_id:body.id})
    console.log(product,"prrr")
    if(!product){
        return{
            statusCode:400,
            status:false,
            message:"Not Found This Product",
            data:{}
        }
    }

    await updateOne(productModel,{_id:body.id},{isDeleted:true})
   
    return{
        statusCode:200,
        status:true,
        message:"Product Deleted Successfully",
        data:body
    }


}


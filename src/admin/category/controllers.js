const {categoryModel}=require('../../models/index')
const {findOne,create,updateOne,find}=require('../../utils/dbOperations')
exports.addCategory=async({body})=>{
    const{name,category}=body

    let checkCategory=await findOne(categoryModel,{name:name})
    if(checkCategory){
        return{
            statuscode:400,
            status:false,
            message:"Category Name Already Exist",
            data:{}
        }
    }
    await create(categoryModel,body)
    return{
        statuscode:200,
        status:true,
        message:"Category Added Successfuly",
        data:body
    }
}

exports.getCategory=async({query})=>{
   let data= await find(categoryModel,{category:query.category})
    return{
        statuscode:200,
        status:true,
        message:"Category Added Successfuly",
        data:data
    }
}
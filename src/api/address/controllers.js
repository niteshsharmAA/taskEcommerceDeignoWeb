const{addressModel}=require('../../models/index')
const{create}=require('../../utils/dbOperations')
exports.addAddress=async({user,body})=>{
    
    body.name=user.name
    body.phone=user.phone
    body.userId=user._id

    await create(addressModel,body)
    return{
        statusCode:200,
        status:true,
        message:"Address Added Successfully",
        data:body
    }
    

}
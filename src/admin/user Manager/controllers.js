const { userModel } = require('../../models/index')
const { fixLink } = require("../../utils/fileUploader")
const { findOne, create, updateOne,find } = require('../../utils/dbOperations')
exports.getUser=async({hostname})=>{
    let data=await find(userModel,{isDeleted:false})
    // data = fixLink({ data: data, hostname, fieldName: "image", folderName: "User"})
    for (a of data){

        delete a._doc.password
        delete a._doc.authToken
    }
    return{
        statusCode:200,
        status:true,
        message:"User List",
        data
    }
}
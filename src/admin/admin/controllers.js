const { adminModel } = require('../../models/index')
const { findOne, create, updateOne } = require('../../utils/dbOperations')
const jwt = require('jsonwebtoken')
const {JWT_SECRET } = process.env
let bcrypt = require("bcryptjs");

exports.registerAdmin = async ({ body }) => {
        let { password } = body
        // const check = await findOne(userModel, { email: body.email, isDeleted: false })
        // if (check) {
        //     return {
        //         statusCode: 400,
        //         status:false,
        //         message: "Number Already Exist",
        //         data: {}
        //     }
        // }
        body.password = await bcrypt.hash(password, 10)
        
        let data = await create(adminModel, body)
        if (data) {
            return {
                statusCode: 200,
                status:true,
                message: "Register Successfully",
                data: body.email
            }
        } else {
            return {
                statusCode: 400,
                status:false,
                message: "Failed",
                data: {}
            }
        }
}

exports.loginAdmin = async ({ body }) => {

    const checkUser = await findOne(adminModel, { email: body.email, isDeleted: false })
    if (!checkUser) {
        return {
            statusCode: 400,
            status:false,
            message: "User Not Found",
            data: {}
        }
    }

    let isMatch = await bcrypt.compare(body.password, checkUser.password)
    if (!isMatch) {
        return {
            statusCode: 400,
            status:false,
            message: "Wrong Password",
            data: {}
        }
    }
    const token = jwt.sign({ _id: checkUser._id }, JWT_SECRET);
    checkUser.authToken = token;
    await checkUser.save();
    delete checkUser._doc.password
    return {
        statusCode: 200,
        status:true,
        message: "Login Successfully",
        data: {
            checkUser
        }
    }

}
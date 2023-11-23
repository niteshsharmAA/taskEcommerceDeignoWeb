const { userModel } = require('../../models/index')
const { findOne, create, updateOne } = require('../../utils/dbOperations')
const jwt = require('jsonwebtoken')
const { TWILIO_SERVICE_SID, TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID, JWT_SECRET } = process.env
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
})
let bcrypt = require("bcryptjs");

exports.registerUser = async ({ body }) => {
        let { password } = body
        const check = await findOne(userModel, { phone: body.phone, isDeleted: false })
        if (check) {
            return {
                statusCode: 400,
                status:false,
                message: "Number Already Exist",
                data: {}
            }
        }
        body.password = await bcrypt.hash(password, 10)
        
        let data = await create(userModel, body)
        if (data) {
            return {
                statusCode: 200,
                status:true,
                message: "Register Successfully",
                data: body.phone
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

exports.loginUser = async ({ body }) => {

    const checkUser = await findOne(userModel, { phone: body.phone, isDeleted: false })
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

exports.generateOTP = async (req) => {
    try {

        const { countryCode, phone } = req.body

        const checkUser=await findOne(userModel,{phone:phone})
        if(!checkUser){
            return {
                statusCode: 400,
                status:false,
                message: "Can't Find User",
                data: {}
            }
        }
        // const otpResponse = await client.verify
        //     .v2.services(TWILIO_SERVICE_SID)
        //     .verifications.create({
        //         to: `+${countryCode}${phone}`,
        //         channel: "sms",
        //     });
          const otpResponse = true

        if (otpResponse) {
            return {
                statusCode: 200,
                status:true,
                message: "otp send successfuly",
                data: null
            }
        } else {
            return {
                statusCode: 400,
                status:false,
                message: "error",
                data: {}
            }
        }
    } catch (err) {
        throw err
    }
}

exports.verifyOTP = async ({ body }) => {
    const { countryCode, phone, otp } = body;
    try {
        // const verifiedResponse = await client.verify
        //     .v2.services(TWILIO_SERVICE_SID)
        //     .verificationChecks.create({
        //         to: `+${countryCode}${phone}`,
        //         code: otp,
        //     });
          const verifiedResponse = { valid: otp === 1234 }

        if (verifiedResponse.valid) {
            let checkUser = await updateOne(userModel, { phone: phone }, { otpVerify: true });
            if (checkUser) {
                return {
                    statusCode: 200,
                    status:true,
                    message: "OTP Matched",
                    data: checkUser._id
                }
            }else{
                return {
                    statusCode: 400,
                    status:false,
                    message: "User Not Found",
                    data: {}
                }
            }
            
        } else {
            return {
                statusCode: 400,
                status:false,
                message: "Wrong OTP",
                data: {},
            };
        }
    } catch (err) {
        return {
            statusCode: 400,
            status:false,
            message: "Error verifying OTP",
            data: err,
        };
    }
};

exports.forgotPassword = async ({ body }) => {
    let { password, confirmPassword, userId } = body
    if (password != confirmPassword) {
        return {
            statusCode: 400,
            status:false,
            message: "Password and Change password not matched",
            data: {}
        }
    }

    const checkOldPass=await findOne(userModel,{_id:userId})
    let isMatch = await bcrypt.compare(password, checkOldPass.password)
    if(isMatch){
        return{
            statusCode: 400,
            status:false,
            message: "Can't Use Old password, Use New Password",
            data: {}
        }
    }

    password = await bcrypt.hash(password, 10)
    const user = await updateOne(userModel, { _id: userId }, { otpVerify: false, password: password})
    if (user) {
        return {
            statusCode: 200,
            status:true,
            message: "Password Change Successfully",
            data: userId
        }
    }


}
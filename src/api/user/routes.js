const { Router } = require("express")
const responseHandler = require("../../utils/responseHandler")
const validate=require('../../utils/validate')
const{registerVal,loginVal,generateOTPVal,verifyOTPVal,forgotPasswordVal}=require('./validators')
// const auth=require('../../utils/apiAuth')
const {registerUser,loginUser,generateOTP,verifyOTP,forgotPassword} = require("./controllers");

const app = Router();

app.post("/register_user",validate(registerVal),responseHandler(registerUser))
app.post("/login_user",validate(loginVal),responseHandler(loginUser))
app.post("/generate_otp",validate(generateOTPVal),responseHandler(generateOTP))
app.post("/verify_otp",validate(verifyOTPVal),responseHandler(verifyOTP))
app.post("/forgot_password",validate(forgotPasswordVal),responseHandler(forgotPassword))
module.exports = app;

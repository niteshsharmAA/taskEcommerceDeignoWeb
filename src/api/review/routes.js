const { Router } = require("express")
const responseHandler = require("../../utils/responseHandler")
const validate = require('../../utils/validate')
    // const{registerVal,loginVal,generateOTPVal,verifyOTPVal,forgotPasswordVal}=require('./validators')
const auth = require('../../utils/apiAuth')
const { addReview, getReview } = require("./controller");

const app = Router();

app.post("/reviews", auth, responseHandler(addReview))
app.get("/reviews/:productId", auth, responseHandler(getReview))

module.exports = app;
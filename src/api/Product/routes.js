const { Router } = require("express")
const responseHandler = require("../../utils/responseHandler")
const validate = require('../../utils/validate')
    // const{registerVal,loginVal,generateOTPVal,verifyOTPVal,forgotPasswordVal}=require('./validators')
const auth = require('../../utils/apiAuth')
const { productList } = require("./controllers");

const app = Router();

app.get("/product_list", auth, responseHandler(productList))
app.post("/wishlist", auth, responseHandler(productList))

module.exports = app;
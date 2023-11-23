const { Router } = require("express")
const responseHandler = require("../../utils/responseHandler")
const validate=require('../../utils/validate')
// const{registerVal,loginVal,generateOTPVal,verifyOTPVal,forgotPasswordVal}=require('./validators')
const auth=require('../../utils/apiAuth')
const {categoryList} = require("./controllers");

const app = Router();

app.get("/category_list",auth,responseHandler(categoryList))

module.exports = app;

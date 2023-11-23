const { Router } = require("express")
const responseHandler = require("../../utils/responseHandler")
const validate=require('../../utils/validate')
const{payVal}=require('./validators')
const auth=require('../../utils/apiAuth')
const {createOrder,payOrder} = require("./controllers");

const app = Router();

app.post("/create_order",auth,responseHandler(createOrder))
app.post("/pay_order",auth,validate(payVal),responseHandler(payOrder))

module.exports=app
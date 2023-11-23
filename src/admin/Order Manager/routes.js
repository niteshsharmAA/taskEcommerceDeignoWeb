const { Router } = require("express")
const responseHandler = require("../../utils/responseHandler")
// const validate=require('../../utils/validate')
const auth=require('../../utils/adminAuth')
const {orderList,orderProduct,paymentStatus} = require("./controllers");

const app = Router();

app.get("/order_list",auth,responseHandler(orderList))
app.get("/order_product",auth,responseHandler(orderProduct))
app.put("/payment_status",auth,responseHandler(paymentStatus))
module.exports=app
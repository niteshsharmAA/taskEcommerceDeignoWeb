const { Router } = require("express")
const responseHandler = require("../../utils/responseHandler")
const validate=require('../../utils/validate')
// const{registerVal,loginVal,generateOTPVal,verifyOTPVal,forgotPasswordVal}=require('./validators')
const auth=require('../../utils/apiAuth')
const {addToCart,cartItem,removeItemFromCart,updateItemFromCart} = require("./controllers");

const app = Router();

app.post('/add_to_cart',auth,responseHandler(addToCart))
app.get('/cart_item',auth,responseHandler(cartItem))
app.put('/remove_item_fromCart',auth,responseHandler(removeItemFromCart))
app.put('/update_item_fromCart',auth,responseHandler(updateItemFromCart))

module.exports = app;

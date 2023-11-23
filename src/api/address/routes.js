const { Router } = require("express")
const responseHandler = require("../../utils/responseHandler")
const validate=require('../../utils/validate')
const{addressVal}=require('./validators')
const auth=require('../../utils/apiAuth')
const {addAddress} = require("./controllers");

const app = Router();

app.post('/add_address',auth,validate(addressVal),responseHandler(addAddress))

module.exports=app
const { Router } = require("express")
const responseHandler = require("../../utils/responseHandler")
const validate=require('../../utils/validate')
// const{payVal}=require('./validators')
const auth=require('../../utils/adminAuth')
const {getUser} = require("./controllers");

const app = Router();

app.get("/get_all_user",auth,responseHandler(getUser))


module.exports=app
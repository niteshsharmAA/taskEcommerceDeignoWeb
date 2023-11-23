const { Router } = require("express")
const responseHandler = require("../../utils/responseHandler")
const validate=require('../../utils/validate')
const{registerVal,loginVal}=require('./validators')

const {registerAdmin,loginAdmin} = require("./controllers");

const app = Router();

app.post("/register_admin",validate(registerVal),responseHandler(registerAdmin))
app.post("/login_admin",validate(loginVal),responseHandler(loginAdmin))

module.exports=app
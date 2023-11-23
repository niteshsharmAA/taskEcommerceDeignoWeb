const { Router } = require("express")
const responseHandler = require("../../utils/responseHandler")
const validate=require('../../utils/validate')
const{categoryVal}=require('./validators')
const auth=require('../../utils/adminAuth')
const {addCategory,getCategory} = require("./controllers");

const app = Router();
app.post("/add_category",auth,validate(categoryVal),responseHandler(addCategory))
app.get("/get_category",auth,responseHandler(getCategory))

module.exports = app;

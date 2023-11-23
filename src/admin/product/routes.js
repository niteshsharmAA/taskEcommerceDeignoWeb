const { Router } = require("express")
const responseHandler = require("../../utils/responseHandler")
const validate=require('../../utils/validate')
const{productVal}=require('./validators')
const auth=require('../../utils/adminAuth')
const {addProduct,getProduct,editProduct,deleteProduct} = require("./controllers");
const { uploadFile } = require("../../utils/fileUploader");
const upload = require("../../utils/multer");
const app = Router();
app.post("/add_product",auth,upload.single("image"), uploadFile,validate(productVal),responseHandler(addProduct))
app.get("/get_product",auth,responseHandler(getProduct))
app.put('/edit_product',auth,upload.single("image"), uploadFile,responseHandler(editProduct))
app.put('/delete_product',auth,responseHandler(deleteProduct))
module.exports = app

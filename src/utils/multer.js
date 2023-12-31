const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadPath = path.join(__dirname, "../../public/uploads")
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

    
        if (!req.body.type) return cb(new Error("Multer: type field not found in request body"))
        const typePath = path.join(uploadPath, req.body.type)
        if (!fs.existsSync(typePath)) {
            fs.mkdirSync(typePath)
        }
        cb(null, typePath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

module.exports = multer({ storage: storage })
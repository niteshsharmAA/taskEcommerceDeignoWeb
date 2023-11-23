const fs = require('fs')
const path = require('path')

exports.uploadFile = (req, res, next) => {
    try {
        if (req.files) 
        {
            for (let file of req.files)
            {
                req.body[file.fieldname] ? req.body[file.fieldname].push(file.filename) : req.body[file.fieldname] = [file.filename]
            }
        }
        else if (req.file)
        {
            req.body[req.file.fieldname] = req.file.filename;
        }
        delete req.body.type
        next()
    } catch (error) {
        console.log(error)
    }
}

exports.fixLink = ({data, hostname, fieldName, folderName, defaultImage}) => {
    if (Array.isArray(data))
    {
        return data.map((obj) => this.fixLink({data:obj, hostname, fieldName, folderName, defaultImage}))
    }
    else
    {
        if (fieldName.includes("."))
        {
            const fieldArray = fieldName.split(".");
            data[fieldArray[0]] = this.fixLink({ data: data[fieldArray[0]], hostname, fieldName: fieldArray.slice(1).join("."), folderName, defaultImage})
            return data
        }
        if (Array.isArray(data[fieldName]))
        {
            data[fieldName] = data[fieldName].map((ele) => {
                if (ele) return `http://${hostname}:${process.env.ADMIN_PORT}/uploads/${folderName}/` + ele;
                else return defaultImage;
            })
        }
        else 
        {
            if (data[fieldName]) data[fieldName] = `http://${hostname}:${process.env.ADMIN_PORT}/uploads/${folderName}/` + data[fieldName];
            else data[fieldName] = defaultImage;
        }
        return data;
    }
}

exports.deleteFile = ({imageName, folderName}) => {
    if (imageName) fs.unlinkSync(path.join(__dirname, "../../public/uploads/", folderName, imageName))
}
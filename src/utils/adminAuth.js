const jwt = require('jsonwebtoken')
const { adminModel } = require('../models')

module.exports = async (req, res, next) => {
    try {
        if (req.headers['authorization']) {
            const token = req.headers['authorization'].split(" ").pop()
            const { _id } = jwt.verify(token, process.env.JWT_SECRET)
            req.user=await adminModel.findOne({_id,authToken:token,isDeleted:false})
            if(req.user) return next();
            else throw new Error()
        }else{
            res.status(401).send({
                status:false,
                message: "token not found",
                data:{}
            })
        }
    } catch (err) {
        console.log(err)
        res.status(401).send({
            status: false,
            message: "invalid token",
            data: {}
        })
    }
}
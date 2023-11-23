const { productModel, categoryModel } = require('../../models/index')
const { findOne, create, updateOne, find } = require('../../utils/dbOperations')
const services = require('./services')
exports.productList = async({ query }) => {
        let data = await services.productSer(query.category)
        return {
            statusCode: 200,
            status: true,
            message: "Product List",
            data: data
        }
    }
    //bonus task
exports.wishlist = async(req) => {
    let data = await services.productWishlist(req)
    return {
        statusCode: 200,
        status: true,
        message: "Added WishList Item..",
        data: data
    }
}
exports.getWishListItem = async(req) => {
    let data = await services.getProductWishListItem(req)
    return {
        statusCode: 200,
        status: true,
        message: " Get WishList..",
        data: data
    }
}
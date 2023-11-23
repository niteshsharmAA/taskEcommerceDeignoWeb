const { query } = require('express')
const { productModel, userModel, wishlistItem } = require('../../models/index')
const { Types } = require('mongoose');

exports.productSer = async(category) => {
    let pipeline = []

    if (category) {
        pipeline.push({
            $match: {
                isDeleted: false,
                category: new Types.ObjectId(category)
            },
        })
    } else {
        pipeline.push({
            $match: {
                isDeleted: false,
            },
        })
    }
    pipeline.push({
        $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            pipeline: [{
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "sub",
                },
            }, ],
            as: "category",
        },
    })

    pipeline.push({
        $unwind: {
            path: "$category",
        },
    })

    return await productModel.aggregate(pipeline)
}

exports.productWishlist = async(req) => {
    const { userId, product } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const wishlistItem = new WishlistItem({ userId, product });
    await wishlistItem.save();

    return wishlistItem;
}

exports.getProductWishListItem = async(req) => {
    const userId = req.params.userId;
    const wishlistItems = await wishlistItem.find({ userId });
    return wishlistItems;

}
const mongoose = require('mongoose')

const wishListItemSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = new mongoose.model('wishListItem', wishListItemSchema);
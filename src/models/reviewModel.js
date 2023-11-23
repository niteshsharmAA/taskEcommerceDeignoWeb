const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId
    },
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = new mongoose.model('review', reviewSchema);
const { reviewModel } = require('../../models/index')

exports.addReview = async({ body, user }) => {

    try {
        const { productId, user, rating, comment } = req.body;

        const productReview = await reviewModel.findById(productId);
        if (!productReview) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new reviewModel({ productId, user, rating, comment });
        await review.save();

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.getReview = async({ req, res }) => {
    try {
        const productId = req.params.productId;
        const reviews = await Review.find({ productId });
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
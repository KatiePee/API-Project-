const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const {requireAuth} = require('../../utils/auth.js');
const { validateCreateSpot, validateEditSpot} = require('../../utils/validation');
const { spotNotFound, userNotFound, unauthorized } = require('../../utils/errors')

router.get('/current', requireAuth, async (req, res, next) => {
    const user = req.user.toJSON();
    const reviewsPromise = await Review.findAll({
        where: { userId : user.id},
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                include: [{
                    model: SpotImage,
                    attributes: ['url'],
                    where: { preview: true },
                    required: false,
                }]
            },
            {
                model: ReviewImage
            }
        ]
    });

    const reviews = reviewsPromise.map(review => {
        review = review.toJSON();

        let url = null;
        if(review.Spot.SpotImages){
            url = review.Spot.SpotImages[0].url
        }

        review.Spot.previewImage = url;
        delete review.Spot.SpotImages;
        delete review.Spot.updatedAt;
        delete review.Spot.createdAt;
        delete review.Spot.description;
        return review

    })
    res.json({Reviews: reviews})
})



module.exports = router;
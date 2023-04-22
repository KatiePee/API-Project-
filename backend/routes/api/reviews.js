const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const {requireAuth} = require('../../utils/auth.js');
const {validateEditReview} = require('../../utils/validation');
const { unauthorized, reviewNotFound, maxImages } = require('../../utils/errors')

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

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const user = req.user.toJSON();
    const reviewId = req.params.reviewId;
    const { url } = req.body;
    const review = await Review.findByPk(reviewId);

    if(!review) return reviewNotFound(next);
    if(review.userId !== user.id) return unauthorized(next);
    const imageCount = await ReviewImage.count({where: {reviewId}})
    if(imageCount > 10) return maxImages(next);

    const reviewImage = await ReviewImage.create({reviewId, url})  
    res.json({
        "id": reviewImage.id,
        "url": reviewImage.url,
      })
    
})

router.put('/:reviewId', validateEditReview, requireAuth, async(req, res, next) => {
    const user = req.user.toJSON();
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId)

    if(!review) return reviewNotFound(next);
    if(review.userId !== user.id) return unauthorized(next);

    const keys = Object.keys(req.body);
    keys.forEach(key => {
        review[key] = req.body[key]
        console.log(req.body[key])
    })

    await review.save();
    res.json(review)
})

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const user = req.user.toJSON();
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    
    if(!review) return reviewNotFound(next);
    if(review.userId !== user.id) return unauthorized(next);

    await review.destroy();
    res.json({"message": "Successfully deleted"})
})

module.exports = router;
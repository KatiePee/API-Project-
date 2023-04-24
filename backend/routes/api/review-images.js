const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const {requireAuth} = require('../../utils/auth.js');
const { validateCreateSpot, validateEditSpot, validateCreateReview, validateCreateBooking, validateCreateBookingsOverlap} = require('../../utils/validation');
const { spotNotFound, userNotFound, unauthorized, userAlreadyReviewed, unauthorizedBooking } = require('../../utils/errors')

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const user = req.user.toJSON();
    const imageId = req.params.imageId;
    const image = await SpotImage.findByPk(imageId, {
        include: { model: Spot, attributes: ['ownerId']}
    });
    
    if(!image) return imageNotFound(next);
    if(image.Spot.ownerId !== user.id) return unauthorized(next)
    await image.destroy()
    res.json(image)
})
module.exports = router;
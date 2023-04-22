const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const {requireAuth} = require('../../utils/auth.js');
const {validateEditReview, } = require('../../utils/validation');
const { unauthorized, reviewNotFound, maxImages } = require('../../utils/errors')

router.get('/current', requireAuth, async (req, res, next) => {
    const user = req.user.toJSON();
    const bookingsPromise = await Booking.findAll({
        where: { userId : user.id},
        include: [
            {
                model: Spot,
                include: [{
                    model: SpotImage,
                    attributes: ['url'],
                    where: { preview: true },
                    required: false,
                }]
            },
        ]
    });

    const bookings = bookingsPromise.map(booking => {
        booking = booking.toJSON();

        let url = null
        if(booking.Spot.SpotImages.length){
            url = booking.Spot.SpotImages[0].url
        }

        booking.Spot.previewImage = url
        delete booking.Spot.SpotImages;
        delete booking.Spot.description 
        return booking
    })
    res.json({Bookings: bookings})
})


module.exports = router;
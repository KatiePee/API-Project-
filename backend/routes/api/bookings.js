const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const {requireAuth} = require('../../utils/auth.js');
const { validateCreateBooking, validateCreateBookingsOverlap, checkBooking, validateEditBookingsOverlap } = require('../../utils/validation');
const { unauthorized, reviewNotFound, maxImages, bookingNotFound, pastBooking } = require('../../utils/errors')

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


router.put('/:bookingId', requireAuth, checkBooking,  validateCreateBooking, validateEditBookingsOverlap,  async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const user = req.user.toJSON();
    const {startDate, endDate} = req.body;

    const booking = await Booking.findByPk(bookingId)
    if(!booking) return bookingNotFound(next);

    if(booking.userId !== user.id) return unauthorized(next)
    booking.startDate = startDate;
    booking.endDate = endDate
    await booking.save()
    res.status(200).json(booking)
})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const user = req.user.toJSON();
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    
    if(!booking) return bookingNotFound(next);
    if(booking.userId !== user.id) return unauthorized(next);
    if(new Date(booking.startDate) < new Date()) return pastBooking(next)

    await booking.destroy();
    res.json({"message": "Successfully deleted"})
})
module.exports = router;
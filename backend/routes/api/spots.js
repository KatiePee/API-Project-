const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { validateCreateSpot, validateEditSpot, validateCreateReview, validateCreateBooking, validateCreateBookingsOverlap, validateSpotQuery } = require('../../utils/validation');
const { spotNotFound, userNotFound, unauthorized, userAlreadyReviewed, unauthorizedBooking } = require('../../utils/errors');
const { Op } = require('sequelize')

router.get('/', validateSpotQuery, async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const pagination = {};
    if (size) {
        size = parseInt(size)
        if (size <= 20) {
            pagination.limit = parseInt(size)
        } else pagination.limit = 20;
    } else {
        pagination.limit = 20
    };
    if (page) {
        page = parseInt(page);
        if (page >= 10) {
            page = 10;
        }
        pagination.offset = pagination.limit * (page - 1)
    }

    const where = {};
    if (minLat) {
        minLat = parseInt(minLat)
        where.lat = { [Op.gte]: minLat }
    }
    if (maxLat) {
        maxLat = parseInt(maxLat)
        where.lat = { [Op.lte]: maxLat }
    }
    if (minLng) {
        minLng = parseInt(minLng)
        where.lng = { [Op.gte]: minLng }
    }
    if (maxLng) {
        maxLng = parseInt(maxLng);
        where.lng = { [Op.lte]: maxLng }
    }
    if (minPrice) {
        minPrice = parseFloat(minPrice);
        where.price = { [Op.gte]: minPrice }
    }
    if (maxPrice) {
        maxPrice = parseFloat(maxPrice);
        where.price = { [Op.lte]: maxPrice }
    }

    const spotsPromise = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: ['stars']
            },
            {
                model: SpotImage,
                attributes: ['url'],
                where: { preview: true },
                required: false,
            },
        ],
        ...pagination,
        where
    });
    const spots = spotsPromise.map(spot => {
        spot = spot.toJSON();

        let starAvg = null;
        if (spot.Reviews.length) {
            starAvg = spot.Reviews.reduce((acc, curr) => acc + (curr.stars) / spot.Reviews.length, 0)
        };
        spot.avgRating = starAvg ? starAvg.toFixed(2) : null;

        let url = null
        if (spot.SpotImages.length) {
            url = spot.SpotImages[0].url
        }

        spot.previewImage = url
        delete spot.Reviews;
        delete spot.SpotImages;
        return spot
    })

    const Spots = { Spots: spots };
    if (page || size) {
        Spots.page = page || 1;
        Spots.size = size || 20;
    }

    res.json(Spots)
})

router.get('/current', requireAuth, async (req, res, next) => {
    if (!req.user) {
        return userNotFound(next)
    }
    const currentUser = req.user.toJSON();
    const currentUserSpotsPromise = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: ['stars']
            },
            {
                model: SpotImage,
                attributes: ['url'],
                where: { preview: true },
                required: false,
            }
        ],
        where: { ownerId: currentUser.id }
    })

    const currentUserSpots = currentUserSpotsPromise.map(spot => {
        spot = spot.toJSON();

        let starAvg = null;
        if (spot.Reviews.length) {
            starAvg = spot.Reviews.reduce((acc, curr) => acc + (curr.stars) / spot.Reviews.length, 0)
        };
        spot.avgRating = starAvg ? starAvg.toFixed(2) : null;

        let url = null
        if (spot.SpotImages.length) {
            url = spot.SpotImages[0].url
        }

        spot.previewImage = url
        delete spot.Reviews;
        delete spot.SpotImages;
        return spot
    })
    res.json({ Spots: currentUserSpots })
})

router.post('/', requireAuth, validateCreateSpot, async (req, res, next) => {
    const user = req.user.toJSON();
    const ownerId = user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    return res.status(201).json(newSpot)
})

router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;
    let spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: Review,
                attributes: ['stars']
            },
            {
                model: SpotImage
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                as: "Owner"
            }
        ]
    });
    if (!spot) {
        return spotNotFound(next)
    }

    spot = spot.toJSON();
    let starAvg = null;
    if (spot.Reviews.length) {
        starAvg = spot.Reviews.reduce((acc, curr) => acc + (curr.stars) / spot.Reviews.length, 0)
    };
    spot.numReviews = spot.Reviews.length;
    spot.avgStarRating = starAvg ? starAvg.toFixed(2) : null;
    delete spot.Reviews;
    return res.json(spot)
})

router.get('/:spotId/reviews', async (req, res, next) => {
    const spotId = req.params.spotId;
    if (!(await Spot.findByPk(spotId))) return spotNotFound(next)
    const reviews = await Review.findAll({
        where: { spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage
            }
        ]
    });

    res.json({ Reviews: reviews })

})

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const user = req.user.toJSON();
    const spotId = req.params.spotId;
    if (!(await Spot.findByPk(spotId))) return spotNotFound(next)
    const bookingsPromise = await Booking.findAll({
        where: { spotId },
        // attributes: ['spotId', 'startDate', 'endDate']
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Spot, attributes: ['ownerId'] }
        ]
    });

    const bookings = bookingsPromise.map(booking => {
        booking = booking.toJSON()
        if (user.id === booking.Spot.ownerId) {
            delete booking.Spot
            return booking;
        } else {
            delete booking.User;
            delete booking.id;
            delete booking.userId;
            delete booking.createdAt;
            delete booking.updatedAt;
            delete booking.Spot
            return booking
        }
    })

    res.json({ Bookings: bookings })
})

router.put('/:spotId', requireAuth, validateEditSpot, async (req, res, next) => {
    const user = req.user.toJSON();
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId)

    if (!spot) return spotNotFound(next);
    if (spot.ownerId !== user.id) return unauthorized(next);

    const keys = Object.keys(req.body);
    keys.forEach(key => {
        spot[key] = req.body[key]
    })

    await spot.save();
    res.json(spot)
})

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const user = req.user.toJSON();
    const spotId = req.params.spotId;
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) return spotNotFound(next);
    if (spot.ownerId !== user.id) return unauthorized(next);

    const spotImage = await SpotImage.create({ spotId, url, preview })
    res.json({
        "id": spotImage.id,
        "url": spotImage.url,
        "preview": spotImage.preview
    })
})

router.post('/:spotId/reviews', requireAuth, validateCreateReview, async (req, res, next) => {
    const spotId = req.params.spotId;
    const user = req.user.toJSON();
    const { review, stars } = req.body;

    if (!(await Spot.findByPk(spotId))) return spotNotFound(next);
    if (await Review.findOne({ where: { userId: user.id, spotId: spotId } })) return userAlreadyReviewed(next);

    const newReview = await Review.create({ userId: user.id, spotId, review, stars })
    res.status(201).json(newReview)

})

router.post('/:spotId/bookings', requireAuth, validateCreateBooking, validateCreateBookingsOverlap, async (req, res, next) => {
    const spotId = req.params.spotId;
    const user = req.user.toJSON();
    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(spotId)
    if (!spot) return spotNotFound(next);

    const booking = await Spot.findOne({ where: { ownerId: user.id, id: spotId } })
    if (booking) return unauthorizedBooking(next)

    const newBooking = await Booking.create({ userId: user.id, spotId, startDate, endDate })
    res.status(200).json(newBooking)

})

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const user = req.user.toJSON();
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) return spotNotFound(next);
    if (spot.ownerId !== user.id) return unauthorized(next);

    await spot.destroy();
    res.json({ "message": "Successfully deleted" })
})

module.exports = router;

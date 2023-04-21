const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const {requireAuth} = require('../../utils/auth.js');
const { validateCreateSpot, validateEditSpot, validateCreateReview} = require('../../utils/validation');
const { spotNotFound, userNotFound, unauthorized } = require('../../utils/errors')

router.get('/', async(_req, res) => {
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
    });
    const spots = spotsPromise.map(spot => {
        spot = spot.toJSON();

        let starAvg = null;
        if(spot.Reviews.length) {
            starAvg = spot.Reviews.reduce((acc, curr) => acc + (curr.stars)/spot.Reviews.length, 0)
        };
        spot.avgRating = starAvg;

        let url = null
        if(spot.SpotImages.length){
            url = spot.SpotImages[0].url
        }

        spot.previewImage = url
        delete spot.Reviews;
        delete spot.SpotImages;
        return spot
    })
    res.json({Spots: spots})
})

router.get('/current', requireAuth,  async (req, res, next) => {
    if(!req.user){
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
        if(spot.Reviews.length) {
            starAvg = spot.Reviews.reduce((acc, curr) => acc + (curr.stars)/spot.Reviews.length, 0)
        };
        spot.avgRating = starAvg;

        let url = null
        if(spot.SpotImages.length){
            url = spot.SpotImages[0].url
        }

        spot.previewImage = url
        delete spot.Reviews;
        delete spot.SpotImages;
        return spot
    })
    res.json({Spots: currentUserSpots})
})

router.post('/', validateCreateSpot, requireAuth, async (req, res, next) => {
    const user = req.user.toJSON();
    const ownerId = user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price});

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
    if(!spot){
        return spotNotFound(next)
    }
    
    spot = spot.toJSON();
    let starAvg = null;
    if(spot.Reviews.length) {
        starAvg = spot.Reviews.reduce((acc, curr) => acc + (curr.stars)/spot.Reviews.length, 0)
    };
    spot.numReviews = spot.Reviews.length;
    spot.avgStarRating = starAvg;
    delete spot.Reviews;    
    return res.json(spot)
})

router.get('/:spotId/reviews', async (req, res, next) => {
    const spotId = req.params.spotId;
    if(!(await Spot.findByPk(spotId))) return spotNotFound(next)
    const reviews = await Review.findAll({
        where: {spotId},
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

    res.json({Reviews: reviews})

})

router.put('/:spotId', validateEditSpot, requireAuth, async (req, res, next) => {
    const user = req.user.toJSON();
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId)

    if(!spot) return spotNotFound(next);
    if(spot.ownerId !== user.id) return unauthorized(next);

    const keys = Object.keys(req.body);
    keys.forEach(key => {
        spot[key] = req.body[key]
        console.log(req.body[key])
    })

    await spot.save();
    res.json(spot)
})

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const user = req.user.toJSON();
    const spotId = req.params.spotId;
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(spotId);

    if(!spot) return spotNotFound(next);
    if(spot.ownerId !== user.id) return unauthorized(next);
    
    const spotImage = await SpotImage.create({spotId, url, preview})  
    console.log(spotId)
    res.json({
        "id": spotImage.id,
        "url": spotImage.url,
        "preview": spotImage.preview
      })
})

router.post('/:spotId/reviews', validateCreateReview, requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const user = req.user.toJSON();
    const {review, stars} = req.body;

    if(!(await Spot.findByPk(spotId))) return spotNotFound(next)

    const newReview = await Review.create({userId: user.id, spotId, review, stars})
    res.status(201).json(newReview)

})

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const user = req.user.toJSON();
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    
    if(!spot) return spotNotFound(next);
    if(spot.ownerId !== user.id) return unauthorized(next);

    await spot.destroy();
    res.json({"message": "Successfully deleted"})
})

module.exports = router;

const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User } = require('../../db/models');
const Sequelize =require('../../db/models')
const cookieParser = require('cookie-parser');
const {requireAuth} = require('../../utils/auth.js');
const { handleValidationErrors, validateCreateSpot, validateEditSpot} = require('../../utils/validation');
const { Op } = require('sequelize');
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
        // subQuery: false,  
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
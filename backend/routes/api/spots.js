const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User } = require('../../db/models');
const Sequelize =require('../../db/models')
const cookieParser = require('cookie-parser');
const {requireAuth} = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async(_req, res) => {
    const spotsPromise = await Spot.findAll({
        include: [
           {
            model: Review,
            attributes: ['stars']
           },
           {
            model: SpotImage,
            where: { preview: true },
            attributes: ['url']
           }
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
        const err = new Error('There is currently no user logged in');
        err.title = 'There is currently no user logged in';
        err.errors = { message: 'There is currently no user logged in' };
        err.status = 401;
        return next(err);
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
             where: { preview: true },
             attributes: ['url']
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
        const err = new Error("Spot couldn't be found");
        err.title = "Spot couldn't be found";
        err.errors = { message: "Spot couldn't be found"};
        err.status = 404;
        return next(err);
    }
    
    spot = spot.toJSON();
    let starAvg = null;
    if(spot.Reviews.length) {
        starAvg = spot.Reviews.reduce((acc, curr) => acc + (curr.stars)/spot.Reviews.length, 0)
    };
    spot.numReviews = spot.Reviews.length;
    spot.avgStarRating = starAvg;
    // spot[Owner] = spot[User]
    delete spot.Reviews;    
   



    console.log(spot);
    res.json(spot)

})

const validateSpot = [
    check('address')
        .not().isEmpty().withMessage('address is required')
        .isLength({min: 1, max: 30}).withMessage('address must be between 1 and 30 character'),
    check('city')
        .not().isEmpty().withMessage('city is required')
        .isLength({min: 1, max: 30}).withMessage('city must be between 1 and 30 character'),
    check('state')
        .not().isEmpty().withMessage('state is required')
        .isLength({min: 1, max: 30}).withMessage('state must be between 1 and 30 character'),
    check('country')
        .not().isEmpty().withMessage('country is required')
        .isLength({min: 1, max: 30}).withMessage('country must be between 1 and 30 character'),
    check('lat')
        .not().isEmpty().withMessage('lat is required')
        .isFloat({min: -90, max: 90}).withMessage('Invalid latitude. lat must be between -90 and 90'),
    check('lng')
        .not().isEmpty().withMessage('lng is required')
        .isFloat({min: -180, max: 180}).withMessage('Invalid longitude. lng must be between -180 and 180'),
    check('name')
        .not().isEmpty().withMessage('name is required')
        .isLength({min: 1, max: 30}).withMessage('name must be between 1 and 30 character'),
    check('description')
        .not().isEmpty().withMessage('description is required'),
    check('price')
        .not().isEmpty().withMessage('price is required')
        .isFloat({min: 0}).withMessage('price must be more than 0'),
]

router.post('/', requireAuth, async (req, res, next) => {
    const owner = req.user.toJSON();
    const { address, city, state, country, lat, lng, name, description, price } = req.body;


})
module.exports = router;
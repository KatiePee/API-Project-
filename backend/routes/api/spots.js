const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User } = require('../../db/models');
const Sequelize =require('../../db/models')
const cookieParser = require('cookie-parser');

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

router.get('/current', async (req, res, next) => {
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
    spot.avgRating = starAvg;
    // spot[Owner] = spot[User]
    delete spot.Reviews;    
   



    console.log(spot);
    res.json(spot)

})
module.exports = router;
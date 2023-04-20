const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage } = require('../../db/models');
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
    const token = req.cookies.token;
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
module.exports = router;
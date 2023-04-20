//make a router
//find all spots
//lazy load the aggrate data for avg reviews
//lazy load preview image
//append those bad boys to the obj
const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage } = require('../../db/models');
const Sequelize =require('../../db/models')

router.get('/', async(_req, res, next) => {
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

module.exports = router;
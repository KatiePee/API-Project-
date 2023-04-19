//make a router
//find all spots
//lazy load the aggrate data for avg reviews
//lazy load preview image
//append those bad boys to the obj
const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage } = require('../../db/models');

router.get('/', async(_req, res, next) => {
    const spots = await Spot.findAll();
    res.json(spots)
})

module.exports = router;
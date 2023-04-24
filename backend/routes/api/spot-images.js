const express = require('express');
const router = express.Router();
const { Spot, SpotImage } = require('../../db/models');
const {requireAuth} = require('../../utils/auth.js');
const {  unauthorized, imageNotFound} = require('../../utils/errors')

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const user = req.user.toJSON();
    const imageId = req.params.imageId;
    const image = await SpotImage.findByPk(imageId, {
        include: { model: Spot, attributes: ['ownerId']}
    });
    
    if(!image) return imageNotFound(next);
    if(image.Spot.ownerId !== user.id) return unauthorized(next)
    await image.destroy()
    res.json({
        "message": "Successfully deleted"
      })
})
module.exports = router;
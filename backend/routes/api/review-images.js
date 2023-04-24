const express = require('express');
const router = express.Router();
const { Review, ReviewImage } = require('../../db/models');
const {requireAuth} = require('../../utils/auth.js');
const { unauthorized, imageNotFound } = require('../../utils/errors')

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const user = req.user.toJSON();
    const imageId = req.params.imageId;
    const image = await ReviewImage.findByPk(imageId, {
        include: { model: Review, attributes: ['userId']}
    });
    
    if(!image) return imageNotFound(next);
    if(image.Review.userId !== user.id) return unauthorized(next)
    await image.destroy()
    res.json({
        "message": "Successfully deleted"
      })
})
module.exports = router;
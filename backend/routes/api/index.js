//api/index.js
const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use(restoreUser);

router.use('/session', require('./session.js'));

router.use('/users', require('./users.js'));

router.use('/spots', require('./spots.js'));

router.use('/reviews', require('./reviews.js'))

router.use('/bookings', require('./bookings.js'))

router.use('/spot-images', require('./spot-images.js'))

router.use('/review-images', require('./review-images.js'))

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


module.exports = router;
const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const {requireAuth} = require('../../utils/auth.js');
const { validateCreateSpot, validateEditSpot, validateCreateReview, validateCreateBooking, validateCreateBookingsOverlap} = require('../../utils/validation');
const { spotNotFound, userNotFound, unauthorized, userAlreadyReviewed, unauthorizedBooking } = require('../../utils/errors')


module.exports = router;
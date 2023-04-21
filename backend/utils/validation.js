// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) { 
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);
    
    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateEditSpot = [
  check('address')
      .optional()
      .isLength({min: 1, max: 30}).withMessage('address must be between 1 and 30 character'),
  check('city')
      .optional()
      .isLength({min: 1, max: 30}).withMessage('city must be between 1 and 30 characters'),
  check('state')
      .optional()
      .isLength({min: 1, max: 30}).withMessage('state must be between 1 and 30 characters'),
  check('country')
      .optional()
      .isLength({min: 1, max: 30}).withMessage('country must be between 1 and 30 characters'),
  check('lat')
      .optional()
      .isFloat({min: -90, max: 90}).withMessage('Invalid latitude. lat must be between -90 and 90'),
  check('lng')
      .optional()
      .isFloat({min: -180, max: 180}).withMessage('Invalid longitude. lng must be between -180 and 180'),
  check('name')
      .optional()
      .isLength({min: 1, max: 30}).withMessage('name must be between 1 and 30 characters'),
  check('description')
      .optional()
      .isLength({min: 1, max: 2048}).withMessage('description must be between 1 and 2048 characters'),
  check('price')
      .optional()
      .isFloat({min: 0}).withMessage('price must be more than 0'),
  handleValidationErrors
]

const validateCreateSpot = [
  check('address')
      .not().isEmpty()
      .isLength({min: 1, max: 30}).withMessage('address is required and must be between 1 and 30 character'),
  check('city')
      .not().isEmpty()
      .isLength({min: 1, max: 30}).withMessage('city is required and must be between 1 and 30 characters'),
  check('state')
      .not().isEmpty()
      .isLength({min: 1, max: 30}).withMessage('state is required and  must be between 1 and 30 characters'),
  check('country')
      .not().isEmpty()
      .isLength({min: 1, max: 30}).withMessage('country is required and must be between 1 and 30 characters'),
  check('lat')
      .not().isEmpty()
      .isFloat({min: -90, max: 90}).withMessage('Invalid latitude. lat must be between -90 and 90'),
  check('lng')
      .not().isEmpty()
      .isFloat({min: -180, max: 180}).withMessage('Invalid longitude. lng must be between -180 and 180'),
  check('name')
      .not().isEmpty()
      .isLength({min: 1, max: 30}).withMessage('name is required and must be between 1 and 30 characters'),
  check('description')
      .not().isEmpty()
      .isLength({min: 1, max: 2048}).withMessage('description is required and must be between 1 and 2048 characters'),
  check('price')
      .not().isEmpty()
      .isFloat({min: 0}).withMessage('price is required and  must be more than 0'),
  handleValidationErrors
]

const validateCreateReview = [
  check('review')
    .not().isEmpty()
    .isLength({min: 5, max: 2048}).withMessage('review is required and must be between 1 and 2048 characters'),
  check('stars')
    .not().isEmpty()
    .isInt({min: 1, max: 5}).withMessage('stars is required and must be an integer between 1 and 5')
]
module.exports = {
  handleValidationErrors,
  validateEditSpot,
  validateCreateSpot,
  validateCreateReview
};
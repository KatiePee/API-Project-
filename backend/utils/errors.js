const express = require('express');
require('express-async-errors');

const spotNotFound = (next) =>{
    const err = new Error("Spot couldn't be found");
    err.title = "Spot couldn't be found";
    err.errors = { message: "Spot couldn't be found"};
    err.status = 404;
    return next(err);
};

const userNotFound = (next) => {
    const err = new Error("User couldn't be found");
    err.title = "User couldn't be found";
    err.errors = { message: "User couldn't be found"};
    err.status = 404;
    return next(err);
};

const reviewNotFound = (next) =>{
const err = new Error("Review couldn't be found");
    err.title = "Review couldn't be found";
    err.errors = { message: "Review couldn't be found"};
    err.status = 404;
    return next(err);
};

const bookingNotFound = (next) =>{
    const err = new Error("Booking couldn't be found");
        err.title = "Booking couldn't be found";
        err.errors = { message: "Booking couldn't be found"};
        err.status = 404;
        return next(err);
};

const unauthorized = (next) => {
    const err = new Error("Unauthorized User");
    err.title = "Unauthorized User";
    err.errors = { message: "Forbidden"};
    err.status = 403;
    return next(err);
};

const unauthorizedBooking = (next) => {
    const err = new Error("Sorry, Spot must NOT belong to the current user");
    err.title = "Unauthorized User";
    err.errors = { message: "Forbidden"};
    err.status = 403;
    return next(err);
}
const userAlreadyReviewed = (next) => {
    const err = new Error("User already has a review for this spot");
    err.title = "User already has a review for this spot";
    err.errors = { message: "User already has a review for this spot"};
    err.status = 500;
    return next(err);
};

const maxImages = (next) => {
    const err = new Error("Maximum number of images for this resource was reached");
    err.title = "Maximum number of images for this resource was reached";
    err.errors = { message: "Maximum number of images for this resource was reached"};
    err.status = 403;
    return next(err);
};

const pastBooking = (next) => {
    const err = new Error("Bookings that have been started can't be deleted");
    err.title = "Bookings that have been started can't be deleted";
    err.errors = { message: "Bookings that have been started can't be deleted"};
    err.status = 403;
    return next(err);
};


module.exports = {
    spotNotFound, 
    userNotFound,
    bookingNotFound,
    unauthorized,
    unauthorizedBooking,
    userAlreadyReviewed,
    reviewNotFound,
    maxImages,
    pastBooking    
}
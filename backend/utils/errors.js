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

const unauthorized = (next) => {
    console.log('hitting this!')
    const err = new Error("Unauthorized User");
    err.title = "Unauthorized User";
    err.errors = { message: "Forbidden"};
    err.status = 404;
    return next(err);
};

module.exports = {spotNotFound, userNotFound, unauthorized,}
const express = require('express');// why dont we need to have stuff like path and fs in the dependencies
require('express-async-errors'); // why is this one different?
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
app.use(morgan('dev')); //morgan middleware for logginh req and res info
app.use(cookieParser());
app.use(express.json());

//security middleware
if (!isProduction) {
    //enable cors only in development
    app.use(cors());
}

//helmet helps set a variety of headers to better sequre your app
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

//set the _csrf token and create req.csrfToken method
app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
}))

const routes = require('./routes');

app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });

  app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
  });

  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });
module.exports = app;

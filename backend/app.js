const express = require('express');// why dont we need to have stuff like path and fs in the dependencies
require('express-async-errors'); // why is this one different?
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

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

module.exports = app;

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const eJwt = require('express-jwt');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const clrs = require('colors');
const PORT = process.env.PORT || 4200;
const corsOptions = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true
};

require('dotenv').config();

// Require passport config
require('./passport');

app.use(cors(corsOptions));

// Parses the text as URL encoded data. Parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: true
}));

// Parses the text as JSON and exposes the resulting object on req.body
app.use(bodyParser.json());

const addToken = (req, res) => {
    const token = jwt.sign({
        name:  req.user.name,
        id: req.authUser.id,
        img: req.user.image
    }, process.env.VILNIUS3D_SECRET,
        {
            expiresIn: 60 * 120
        });

    console.log(clrs.bgMagenta('JWT token', token))
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).send({ ...req.authUser, token: token });
};

app.route('/auth')
    .post(passport.authenticate('google-token', {
        session: false
    }), (req, res, next) => {
        console.log(clrs.bgGreen('Logged User: ', req.user));
        console.log(clrs.bgGreen('Authenticated?: ', req.isAuthenticated()));

        if (!req.user) {
            res.send(401, "Not authorized");
        }

        //  user for token
        req.authUser = {
            name: req.user.name,
            id: req.user.googleId,
            img: req.user.image
        }
        next();
    }, addToken);

// token validation
var authenticate = eJwt({
    secret: process.env.VILNIUS3D_SECRET,
    getToken: function (req) {
        console.log(clrs.blue(req.headers.authorization));
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        return null;
    }
});

var getCurrentUser = function (req, res, next) {
    // By default, the decoded token is attached to req.user
    // https://www.npmjs.com/package/express-jwt
    console.log('User', req.user);
    res.json(req.user)
};

app.route('/auth/user')
    .get(authenticate, getCurrentUser);


app.listen(PORT, () => {
    console.log(clrs.green(`App is running on port ${PORT}`));
});
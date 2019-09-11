const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const eJwt = require('express-jwt');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
var fs = require('fs');
const uploadDir = __dirname + '/uploads';

const { createDBUser, getDBUsers, deleteDBUser } = require('./users');
const { getScenes, saveScene, updateScene, deleteScene } = require('./scenes');

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

app.use(fileUpload());

app.use('/uploads', express.static('uploads'));
app.use('/uploads/users', express.static('uploads/users'));

// Parses the text as JSON and exposes the resulting object on req.body
app.use(bodyParser.json({
    // limit: '50mb', extended: true
}));

// Parses the text as URL encoded data. Parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    // limit: '50mb',
    extended: true
}));


const addToken = (req, res) => {
    const token = jwt.sign({
        name: req.authUser.name,
        id: req.authUser.id,
        img: req.authUser.img
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
            res.status(401).send('Not authorized');
        }

        //  user for token
        req.authUser = {
            name: req.user.name,
            id: req.user.googleId,
            img: req.user.img
        }
        next();
    }, addToken);

// token validation
const authenticate = eJwt({
    secret: process.env.VILNIUS3D_SECRET,
    getToken: function (req) {
        console.log(clrs.blue(req.headers.authorization));
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        return null;
    }
});

// ------------------------- //

const getCurrentUser = function (req, res, next) {
    // By default, the decoded token is attached to req.user
    // https://www.npmjs.com/package/express-jwt
    console.log('User', req.user);
    res.json(req.user)
};

app.route('/auth/user')
    .get(authenticate, getCurrentUser);

// ------------------------- //

// TODO use router

// ------------------------- //

// Get users
app.route('/users')
    .get(authenticate, getDBUsers)


// Post user
app.route('/user')
    // .post(authenticate, saveUser);
    .post(authenticate, createDBUser);

// Delete user
app.route('/user/:id')
    .delete(authenticate, deleteDBUser);

// ------------------------- //

// Post scene
app.route('/scenes')
    // .post(authenticate, getScenes);
    .get(getScenes);

app.route('/scene')
    .post(authenticate, saveScene);

// Update / Delete scene
app.route('/scene/:id')
    .put(authenticate, updateScene)
    .delete(authenticate, deleteScene);


app.listen(PORT, () => {
    // Check if upload dir exists
    // Only perfom on boot to avoid performance issues
    // However express-fileupload should create dir if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    
    
    // create users dir
    if (!fs.existsSync(uploadDir + '/users')) {
        fs.mkdirSync(uploadDir + '/users');
    }
    
    console.log(uploadDir)
    console.log(clrs.green(`App is running on port ${PORT}`));
});
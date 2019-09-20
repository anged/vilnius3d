const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const eJwt = require('express-jwt');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
const fs = require('fs');
const uploadDir = __dirname + '/uploads';
const nocache = require('nocache');
const path = require('path');

const { createDBUser, getDBUsers, deleteDBUser } = require('./users');
const { getScenes, saveScene, updateScene, deleteScene } = require('./scenes');
const isDev = process.env.NODE_ENV === 'development';
const clrs = require('colors');
const PORT = process.env.PORT || 4200;
const corsOptions = {
    origin: isDev ? process.env.VILNIUS3D_DEV_ORIGIN : process.env.VILNIUS3D_PROD_ORIGIN,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true
};

require('dotenv').config();

// Require passport config
require('./passport');

app.use(nocache())

app.use(cors(corsOptions));

app.use(fileUpload());

// In prod env we store node files in 'api' subdirectory
app.use('/', express.static('../'));

app.use('/api/uploads', express.static('uploads'));
app.use('/api/uploads/users', express.static('uploads/users'));

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
            expiresIn: 60 * 60 * 2
            // expiresIn: 60
        });

    console.log(clrs.bgMagenta('JWT token', token))
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).send({ ...req.authUser, token: token });
};

app.route('/api/auth')
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

app.route('/api/auth/user')
    .get(authenticate, getCurrentUser);

// ------------------------- //

// TODO use router

// ------------------------- //

// Get users
app.route('/api/users')
    .get(authenticate, getDBUsers)


// Post user
app.route('/api/user')
    // .post(authenticate, saveUser);
    .post(authenticate, createDBUser);

// Delete user
app.route('/api/user/:id')
    .delete(authenticate, deleteDBUser);

// ------------------------- //

// GET scenes
app.route('/api/scenes')
    // .get(authenticate, getScenes);
    .get(getScenes);

    // Post scene
app.route('/api/scene')
    .post(authenticate, saveScene);

// Update / Delete scene
app.route('/api/scene/:id')
    .put(authenticate, updateScene)
    .delete(authenticate, deleteScene);

// get all routes in prod, unless its api route
app.route('*')
    .get((req,res) => {
        res.sendFile(path.join(__dirname + '/../index.html'));
    });

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
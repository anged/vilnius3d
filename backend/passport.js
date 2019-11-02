const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const { getDBUser } = require('./users');
require('dotenv').config();

const env = process.env

passport.use(new GoogleTokenStrategy({
    clientID: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {
    console.log('Tokens', accessToken, refreshToken, profile);
    getDBUser(profile).then(authedUser => {
        let user;
        if (authedUser) {
            user = {
                ...authedUser
            }
        }
        return done(null, user);
    }).catch(err => {
        // TODO implement error
        console.log(err);
        // return done(err, null)
    });
}));
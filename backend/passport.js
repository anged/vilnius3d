const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;

require('dotenv').config();

const env = process.env

passport.use(new GoogleTokenStrategy({
    clientID: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {
    console.log('Tokens', accessToken, refreshToken, profile);
    return done(null, {
        name: profile.displayName,
        googleId: profile.id,
        image: profile._json.picture,
        role: 'superAdmin'
    })
}));
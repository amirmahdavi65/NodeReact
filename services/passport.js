const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// get users schema from mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // this id is a reference to id that mongo creates for user
  // not any particular provider like google or facebook
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

// this strategy injects an object with 'google' identifier
// so passport knows how to authenticate using this id below
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    // done is the object passport expects us to call when done!
    (accessToken, refreshToken, profile, done) => {
      // find is a promise to the found object not the actual one
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // first arg is error object, second is success result
            done(null, existingUser);
          }
          else {
            // google's unique identifier for users, remember email is not a good option cuz it could change
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        });
    }
  )
);
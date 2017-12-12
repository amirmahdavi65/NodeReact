const express = require ('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express(); // creates a single express application

// this strategy injects an object with 'google' identifier
// so passport knows how to authenticate using this id below
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile:', profile);
    }
  )
);

// use google strategy to handle this route and authenticate
app.get(
  '/auth/google',
  passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get(
  '/auth/google/callback',
  passport.authenticate('google')
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

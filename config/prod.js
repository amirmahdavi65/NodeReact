// these are all pulled from heroku environment variables, safe to commit to git
module.exports = {
  googleClientID: process.env.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY // just some random string
};

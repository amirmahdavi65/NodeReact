const express = require('express');
const mongoose = require('mongoose');

// this lib puts session itself in cookie, express-session puts a reference
// and the actual session is stored in a remote database
// this is 4K limited but exp-session has unlimited space on our database
// have a look at it later
const cookieSession = require('cookie-session');

const passport = require('passport'); // this is the library
const keys = require('./config/keys');

// this should always become before the following line to avoid errors
// cuz passport depends on it, otherwise app will crash
require('./models/User');

// don't need to assign it to any variable
// just need to execute once
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// creates a single express application
const app = express();


// cookie session library attaches the cookie mechanism to the pipeline
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // last 30 days
    keys: [keys.cookieKey]
  })
);
// pulls user id out of cookie data, not quite precise???
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

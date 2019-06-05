const express = require('express');
const mongoose = require('mongoose');

// this lib puts session itself in cookie, express-session puts a reference
// and the actual session is stored in a remote database
// this is 4K limited but exp-session has unlimited space on our database
// have a look at it later
const cookieSession = require('cookie-session');

const passport = require('passport'); // this is the library
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// this should always become before the following line to avoid errors
// cuz passport depends on it, otherwise app will crash
require('./models/User');
require('./models/Survey');

// don't need to assign it to any variable
// just need to execute once
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// creates a single express application
const app = express();

// apply a new middle-ware to access body
app.use(bodyParser.json());

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

// every request will sequentially try the following checks until it's served
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // express serves up production assets
  app.use(express.static('client/build'));

  // express serves index.html if it doesn't recognize the path
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

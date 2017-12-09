const express = require ('express');
const app = express(); // creates a single express application

// get() creates a route handler for http get method
// '/' is the default route
app.get('/', (req, res) => {
  res.send({ from: 'amir', to: 'ava', message: 'hey ava, you look cute :)' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

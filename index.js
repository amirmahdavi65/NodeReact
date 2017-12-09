const express = require ('express');
const app = express(); // creates a single express application

// get() creates a route handler for http get method
// '/' is the default route
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;
app.listen(5000);

const mongoose = require('mongoose');
// const Schema = mongoose.Schema; condensed to following due to ES2015 destructuring feature
const { Schema } = mongoose;

// mongo is schema less but mongoose requires us to define it
const userSchema = new Schema({
  googleId: String
});

// tell mongo to create the schema using collection name and schema
// will create if does not exist
mongoose.model('users', userSchema);

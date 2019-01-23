const mongoose = require('mongoose');

function connectToDB() {
  mongoose.connect('mongodb://localhost:27017/Restaurants', { useNewUrlParser: true }).then(() => {
    console.log('Connected to db');
  });
}

module.exports = { connectToDB };

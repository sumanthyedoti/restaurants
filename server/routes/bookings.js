const express = require('express');
const { Users } = require('../models/users');

const router = express.Router();

router.use((req, res, next) => {
  const { username } = req.headers;
  console.log(username);
  Users.findOne({ username }).then((user) => {
    if (!user) {
      res.status(404).send({
        errorMessage: 'User not found!',
      });
      res.end();
    }
    next();
  }).catch((err) => {
    res.status(500).send(err);
    res.end();
  });
});

router.get('/', (req, res) => {
  const { username } = req.headers;
  Users.findOne({ username })
    .then((user) => {
      res.send({
        bookings: user.bookings,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
const booktable = {
  restaurant: '2900',
  time_and_date: 'tomorrow',
  num_of_people: 4,
};

router.post('/', (req, res) => {
  const { username } = req.headers;
  Users.updateOne({ username }, { $push: { 'bookings.table': booktable } })
    .then((result) => {
      if (result.nModified === 1) {
        res.send({
          message: 'Table Booked',
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

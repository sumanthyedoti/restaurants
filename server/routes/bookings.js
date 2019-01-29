const express = require('express');
const { Users } = require('../models/users');

const router = express.Router();

router.use((req, res, next) => {
  const { username } = req.headers;
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
      res.status(500).send({
        errorMessage: 'Invalid request',
      });
    });
});


router.post('/', (req, res) => {
  const { username } = req.headers;
  Users.updateOne({ username }, { $push: { 'bookings.table': req.body } })
    .then((result) => {
      if (result.nModified === 1) {
        res.send({
          message: 'Table Booked',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        errorMessage: 'Invalid request',
      });
    });
});

module.exports = router;

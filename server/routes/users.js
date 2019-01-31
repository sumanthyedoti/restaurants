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

router.put('/update', (req, res) => {
  const { username } = req.headers;
  Users.updateOne({ username }, { $set: req.body })
    .then((response) => {
      res.send({
        message: 'User data updated successfully!',
        response,
      });
    }).catch((err) => {
      res.status(404).send(err);
      res.end();
    });
});

module.exports = router;

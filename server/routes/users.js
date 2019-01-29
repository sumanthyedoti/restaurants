const express = require('express');
const { Users } = require('../models/users');

const router = express.Router();

// const user = new Users({
//   username: 'y_sumanth',
//   email: 'yedoti.sumanth@mountblue.io',
//   name: 'Yedoti Sumanth',
// });
// user.save()
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

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

router.get('/:username', (req, res) => {
  const { username } = req.params;
  Users.findOne({ username }).then((user) => {
    if (!user) {
      res.status(404).send({
        errorMessage: 'User not found!',
      });
      res.end();
    }
    res.send({
      user,
    });
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

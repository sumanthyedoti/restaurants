const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const restaurants = require('./routes/restaurants');
const users = require('./routes/users');
const bookings = require('./routes/bookings');
const { Users } = require('./models/users');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/login/:username', (req, res) => {
  const { username } = req.params;
  Users.findOne({ username }).then((user) => {
    if (!user) {
      res.status(404).send({
        errorMessage: 'User not found!',
      });
      res.end();
      return;
    }
    res.send({
      user,
    });
    res.end();
    
  }).catch((err) => {
    res.status(500).send(err);
    res.end();
    
  });
});

app.post('/register', (req, res) => {
  const { username } = req.body;
  const { name } = req.body;
  const { email } = req.body;
  if (username === undefined || name === undefined || email === undefined) {
    res.status(400).json({
      errorMessage: 'Invalid Request',
    });
    res.end();
    return;
  }
  const user = new Users({
    username,
    name,
    email,
  });
  user.save().then((user) => {
    res.json({
      user,
      message: 'User added',
    });
    res.end();
    
  }).catch((err) => {
    res.status(500).send(err);
  });
});

app.use('/api/restaurants', restaurants);
app.use('/api/user', users);
app.use('/api/bookings', bookings);

app.listen(port, () => {
  console.log(`Server connect at port ${port}`);
  db.connectToDB();
});

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
app.use('/api/restaurants', restaurants);
app.use('/api/user', users);
app.use('/api/bookings', bookings);

app.post('/register', (req, res) => {
  const { username } = req.body;
  const { name } = req.body;
  const { email } = req.body;
  if (username === undefined || name === undefined || email === undefined) {
    res.status(400).json({
      errorMessage: 'Invalid Request',
    });
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
    return user;
  }).catch((err) => {
    res.status(500).send(err);
  });
});

app.listen(port, () => {
  console.log(`Server connect at port ${port}`);
  db.connectToDB();
});

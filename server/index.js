const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.listen(port, () => {
  console.log(`Server connect at port ${port}`);
  db.connectToDB();
});

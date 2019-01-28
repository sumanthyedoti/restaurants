const express = require('express');
const { Restaurants } = require('../models/restaurants');

const router = express.Router();

function capitalizeFirstLetter(searchStr) {
  if (searchStr === searchStr.toUpperCase() && searchStr.split(' ').length < 2) {
    return searchStr;
  }
  const string = searchStr.trim().replace(/\s\s+/g, ' ')
    .split(' ')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
    .join(' ');

  return string;
}

/** Reastaurents DB creation */
// Restaurants.create().then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log(err);
// });

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Restaurants.findOne({ id }).then((restaurant) => {
    res.json({
      restaurant,
    });
  }).catch((err) => {
    res.status(500).send(err);
  });
});

router.get('/', (req, res) => {
  Restaurants.find({}).sort({ 'user_rating.aggregate_rating': -1 }).limit(20)
    .then((restaurants) => {
      res.json({
        restaurants,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/search/:searchText', (req, res) => {
  const searchText = capitalizeFirstLetter(req.params.searchText);
  Restaurants.find({
    $or: [
      { name: { $regex: searchText, $options: 'i' } },
      { cuisines: { $regex: searchText, $options: 'i' } },
      { 'location.locality_verbose': { $regex: searchText, $options: 'i' } },
    ],
  }).limit(20)
    .then((restaurants) => {
      res.json({
        restaurants,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/search/:id', (req, res) => {
  const id = capitalizeFirstLetter(req.params.id);
  Restaurants.find({ id })
    .then((restaurant) => {
      res.json({
        restaurant,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


module.exports = router;

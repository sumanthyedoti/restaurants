const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const RestaurantsSchema = new Schema({
  has_online_delivery: {
    type: Number,
  },
  photos_url: {
    type: String,
  },
  url: {
    type: String,
  },
  price_range: {
    type: Number,
  },
  apikey: {
    type: String,
  },
  user_rating: {
    type: {
      rating_text: {
        type: String,
      },
      rating_color: {
        type: String,
      },
      votes: {
        type: String,
      },
      aggregate_rating: {
        type: String,
      },
    },
  },
  name: {
    type: String,
  },
  cuisines: {
    type: String,
  },
  is_delivering_now: {
    type: Number,
  },
  menu_url: {
    type: String,
  },
  average_cost_for_two: {
    type: Number,
  },
  has_table_booking: {
    type: Number,
  },
  featured_image: {
    type: String,
  },
  currency: {
    type: String,
  },
  id: {
    type: String,
  },
  thumb: {
    type: String,
  },
});
const Restaurants = mongoose.model('restaurants', RestaurantsSchema);

module.exports = {
  Restaurants,
};

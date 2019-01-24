const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username required!'],
    unique: true,
    minlength: 2,
    trim: true,
    validate: {
      validator(username) {
        return /^[a-z][a-z0-9_]+$/.test(username);
      },
      message: 'Username is not valid. <br> -> Should start with an alphabet. <br> -> Use only a-z, _, 0-9!',
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
    validate: {
      validator(name) {
        return /^[a-zA-Z][a-zA-Z\s]+$/.test(name);
      },
      message: 'Name is not valid. <br> -> Should not contain any special characters. <br> -> Use only A-Z, a-z, [space]',
    },
  },
  email: {
    type: String,
    required: [true, 'Email required!'],
    unique: true,
    minlength: 6,
    trim: true,
    validate: {
      validator(email) {
        return /\S+@\S+\.\S+/.test(email);
      },
      message: 'Please use valid Email!',
    },
  },
  favorites: {
    type: [{
      type: String,
      trim: true,
    }],
  },
  location: {
    city: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  bookings: {
    table: {
      type: [{
        idRestaurant: {
          type: String,
        },
        time_and_date: {
          type: String,
        },
        num_of_people: {
          type: Number,
        },
      }],
    },
    food: {
      type: [{
        idRestaurant: {
          type: String,
        },
        time_and_date: {
          type: String,
        },
        items: [{
          name: {
            type: String,
          },
          count: {
            type: Number,
          },
        }],
      }],
    },
  },
});
const Users = mongoose.model('users', UsersSchema);

module.exports = { Users };

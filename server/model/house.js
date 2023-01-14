const houses = require('../data/houses');
const mongoose = require('./index');

const Schema = mongoose.Schema;

const houseSchema = new Schema({
  userId: String,
  host_name: String,
  image: String,
  description: String,
  location: String
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
const houses = require('../data/houses');
const mongoose = require('./index');

const Schema = mongoose.Schema;

const houseSchema = new Schema({
  userId: String,
  host_name: String,
  houseTitle: String,
  location: String,
  type: String,
  bedrooms: Number,
  bathrooms: Number,
  description: String,
  image: String,
  startDate: String,
  endDate: String
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
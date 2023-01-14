
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/houses', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connected to MongoDB!");
})
.catch(err => {
  console.log(`Error while connecting to MongoDB: ${err}`);
});


module.exports = mongoose;
require('dotenv').config();

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_URL, {
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
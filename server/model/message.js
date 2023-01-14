const mongoose = require('./index');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  userId: String,
  content: String,
  timestamp: Date
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
const mongoose = require('./index');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  senderId: String,
  text: String,
  chatId: String,
},
{
  timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
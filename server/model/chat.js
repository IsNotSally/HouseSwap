const mongoose = require('./index');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  members: [String]
},
{
  timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
const Message = require("../model/message");

exports.addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new Message({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200)
    res.send(result);
  } catch (error) {
    res.status(500)
    res.send(error)
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await Message.find({ chatId : chatId });
    res.status(200)
    res.send(result);
  } catch (error) {
    res.status(500)
    res.send(error);
  }
};

const Message = require("../model/message");

exports.postMessage = async (req, res) => {
  try {
    const {message} = new Message(req.body)
    res.status(201);
    res.send(message)
  } catch (error) {
    console.log(error);
  }
}

exports.getMessages = async (req, res) => {
  try {
    const all = await Message.find();
    res.status(201);
    res.send(all)
  } catch (error) {
    console.log(error);
  }
}

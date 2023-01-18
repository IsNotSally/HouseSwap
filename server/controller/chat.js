const Chat = require("../model/chat");

exports.createChat= async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId]
  })
  try {
    const result = await newChat.save();
    res.status(200)
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

exports.userChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.params.id] },
    });
    res.status(200)
    res.send(chats)
  } catch (error) {
    console.log(error);
  }
}

exports.findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: {$all: [req.params.firstId, req.params.secondId ] },
    });
    res.status(200)
    res.send(chat)
  } catch (error) {
    console.log(error);
  }
}
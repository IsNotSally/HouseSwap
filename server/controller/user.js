const User = require("../model/user");
const bcrypt = require('bcrypt');
const House = require("../model/house");
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my-secret-house'

exports.create = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const {_id} = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({_id, message: "Welcome!", accessToken});
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({accessToken, id: user._id, message: "Login correctly!"});
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
}

exports.logout= async (req, res) => {
  try {
   
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Stay with us!' });
  }
}

exports.getUser= async (req, res) => {
 
  try {
    const user = await User.findById({_id: req.params.id});
    if (user) {
      res.status(200)
      res.send(user)
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500)
    console.log(error);
  }
}


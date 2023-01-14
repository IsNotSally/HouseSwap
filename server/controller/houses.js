const houses = require("../data/houses");
const House = require("../model/house");
const User = require("../model/user");

exports.importHouses = async (req, res) => {
  try {
    await House.deleteMany({})
    const importHouses = await House.create(houses);
    res.status(201);
    res.send()
  } catch (error) {
    console.log(error);
  }
}

exports.getAllHouses = async (req, res) => {
  try {
    const all = await House.find();
    res.status(201);
    res.send(all)
  } catch (error) {
    console.log(error);
  }
}

exports.getHouseById = async (req, res) => {
  try {
    const house = await House.findById({ _id: req.params.id });
    res.status(201);
    res.send(house)
  } catch (error) {
    console.log(error);
  }
}

// exports.search = async (req, res) => {
//   try {
//     const searchQuery = req.body.search;
//     res.status(201);
//     res.send(`Results for: ${searchQuery}`)
//   } catch (error) {
//     console.log(error);
//   }
// }

exports.postHouse = async (req, res) => {
  try {
    const  userId  = req.params.id;
    const { home } = req.body
    const newHouse = await new House({
      host_name: home.hostname,
      description: home.description,
      location: home.location
    })
    const {_id} = await newHouse.save();
    await User.findOneAndUpdate({ _id: userId }, { $addToSet: { houses: _id } },
      { new: true })
    res.status(201);
    res.send({newHouse, message: 'You have created the house successfully!' })
  } catch (error) {
    console.log(error);
    res.status(401)
    res.send({ message: 'You must complete all the infos here!' })
  }
}

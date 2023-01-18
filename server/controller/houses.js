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

exports.postHouse = async (req, res) => {
  const  {userId, form}  = req.body;
  try {
    const newHouse = await new House({
      userId: userId,
      host_name: form.host_name,
      description: form.description,
      location: form.location,
      houseTitle: form.houseTitle,
      type:form.type,
      bedrooms:form.bedrooms,
      bathrooms:form.bathrooms,
      image: form.image,
      startDate: form.startDate,
      endDate: form.endDate
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

exports.getUserHouse= async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById({_id: userId})
    res.status(201);
    res.send(user.houses)
  } catch (error) {
    console.log(error);
    res.status(401)
    res.send({ message: "You haven't create any home yet!" })
  }
}
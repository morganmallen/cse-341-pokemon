const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  //#swagger.tags['Pokemon']
  mongodb
    .getDatabase()
    .db()
    .collection("pokemon")
    .find()
    .toArray((err, pokemon) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(pokemon);
    });
};

const getSingle = (req, res) => {
  //#swagger.tags['Pokemon']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid pokemon id to find the pokemon.");
  }
  const pokemonId = new ObjectId(req.params.id);
  mongodb
    .getDatabase()
    .db()
    .collection("pokemon")
    .find({ _id: pokemonId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result[0]);
    });
};

const createPokemon = async (req, res) => {
  //#swagger.tags['Pokemon']
  const pokemon = {
    name: req.body.name,
    primaryType: req.body.primaryType,
    secondaryType: req.body.secondaryType,
    weakness: req.body.weakness,
    strength: req.body.strength,
    color: req.body.color,
    size: req.body.size,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("pokemon")
    .insertOne(pokemon);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while inserting the pokemon"
      );
  }
};

const updatePokemon = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid pokemon id to update a pokemon.");
  }
  //#swagger.tags['Pokemon']
  const pokemonId = new ObjectId(req.params.id);
  const pokemon = {
    name: req.body.name,
    primaryType: req.body.primaryType,
    secondaryType: req.body.secondaryType,
    weakness: req.body.weakness,
    strength: req.body.strength,
    color: req.body.color,
    size: req.body.size,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("pokemon")
    .replaceOne({ _id: pokemonId }, pokemon);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the pokemon");
  }
};

const deletePokemon = async (req, res) => {
  //#swagger.tags['Pokemon']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid pokemon id to delete a pokemon.");
  }
  const pokemonId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("pokemon")
    .deleteOne({ _id: pokemonId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the pokemon");
  }
};

module.exports = {
  getAll,
  getSingle,
  createPokemon,
  updatePokemon,
  deletePokemon,
};

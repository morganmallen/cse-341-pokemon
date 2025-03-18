const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags['Pokemon']
  try {
    const pokemon = await mongodb
      .getDatabase()
      .db()
      .collection("pokemon")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(pokemon);
  } catch (err) {
    console.error("Error fetching pokemon", err);
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags['Pokemon']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid pokemon id to find the pokemon.");
    }

    const pokemonId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("pokemon")
      .find({ _id: pokemonId })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error in getSingle pokemon:", err);
    res.status(400).json({ message: err.message });
  }
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

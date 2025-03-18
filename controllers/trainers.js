const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags['Trainers']
  try {
    const trainers = await mongodb
      .getDatabase()
      .db()
      .collection("trainers")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(trainers);
  } catch (err) {
    console.error("Error fetching trainers:", err);
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags['Trainer']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid trainer id to find the pokemon.");
    }

    const trainerId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("trainers")
      .find({ _id: trainerId })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error in getSingle trainer:", err);
    res.status(400).json({ message: err.message });
  }
};

const createTrainer = async (req, res) => {
  //#swagger.tags['Trainers']
  const trainer = {
    name: req.body.name,
    region: req.body.region,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("trainers")
    .insertOne(trainer);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while inserting the trainer"
      );
  }
};

const updateTrainer = async (req, res) => {
  //#swagger.tags['Trainers']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid trainer id to update a trainer.");
  }
  const trainerId = new ObjectId(req.params.id);
  const trainer = {
    name: req.body.name,
    region: req.body.region,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("trainers")
    .replaceOne({ _id: trainerId }, trainer);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the trainer");
  }
};

const deleteTrainer = async (req, res) => {
  //#swagger.tags['Trainers']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid trainer id to delete a trainer.");
  }
  const trainerId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("trainers")
    .deleteOne({ _id: trainerId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the trainer");
  }
};

module.exports = {
  getAll,
  getSingle,
  createTrainer,
  updateTrainer,
  deleteTrainer,
};

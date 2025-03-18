const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags['Trainers']
  const result = await mongodb.getDatabase().db().collection("trainers").find();
  result.toArray().then((trainers) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(trainers);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags['Trainers']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid trainer id to get a trainer.");
  }
  const trainerId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("trainers")
    .find({ _id: trainerId });
  result.toArray().then((trainers) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(trainers[0]);
  });
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

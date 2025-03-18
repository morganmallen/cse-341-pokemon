const express = require("express");
const router = express.Router();

const trainersController = require("../controllers/trainers");
const validation = require("../middleware/validate");

router.get("/", trainersController.getAll);

router.get("/:id", trainersController.getSingle);

router.post("/", validation.saveTrainer, trainersController.createTrainer);

router.put("/:id", validation.saveTrainer, trainersController.updateTrainer);

router.delete("/:id", trainersController.deleteTrainer);

module.exports = router;

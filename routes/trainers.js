const express = require("express");
const router = express.Router();

const trainersController = require("../controllers/trainers");
const validation = require("../middleware/validate");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", trainersController.getAll);

router.get("/:id", trainersController.getSingle);

router.post(
  "/",
  isAuthenticated,
  validation.saveTrainer,
  trainersController.createTrainer
);

router.put(
  "/:id",
  isAuthenticated,
  validation.saveTrainer,
  trainersController.updateTrainer
);

router.delete("/:id", isAuthenticated, trainersController.deleteTrainer);

module.exports = router;

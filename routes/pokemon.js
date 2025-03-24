const express = require("express");
const router = express.Router();

const pokemonController = require("../controllers/pokemon");
const validation = require("../middleware/validate");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", pokemonController.getAll);

router.get("/:id", pokemonController.getSingle);

router.post(
  "/",
  isAuthenticated,
  validation.savePokemon,
  pokemonController.createPokemon
);

router.put(
  "/:id",
  isAuthenticated,
  validation.savePokemon,
  pokemonController.updatePokemon
);

router.delete("/:id", isAuthenticated, pokemonController.deletePokemon);

module.exports = router;

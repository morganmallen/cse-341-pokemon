const express = require("express");
const router = express.Router();

const pokemonController = require("../controllers/pokemon");
const validation = require("../middleware/validate");

router.get("/", pokemonController.getAll);

router.get("/:id", pokemonController.getSingle);

router.post("/", validation.savePokemon, pokemonController.createPokemon);

router.put("/:id", validation.savePokemon, pokemonController.updatePokemon);

router.delete("/:id", pokemonController.deletePokemon);

module.exports = router;

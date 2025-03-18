const validator = require("../helpers/validate");

const savePokemon = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    primaryType: "required|string",
    secondaryType: "string",
    weakness: "string",
    strength: "required|string",
    color: "required|string",
    size: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveTrainer = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    region: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePokemon,
  saveTrainer,
};

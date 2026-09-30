const express = require("express");

const {
  listMeters,
  getMeter,
  getConsumption,
} = require("../controllers/meter.controller");

const router = express.Router();

router.get("/", listMeters);

router.get("/:meterId/consumption", getConsumption);

router.get("/:meterId", getMeter);

module.exports = router;
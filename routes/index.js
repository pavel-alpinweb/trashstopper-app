const express = require("express");
const router = express.Router();

const ctrlMap = require("../controllers/map");

router.get("/", ctrlMap.get);
router.get("/allPlaces", ctrlMap.getPlacaMarks);

module.exports = router;
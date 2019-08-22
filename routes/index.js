const express = require("express");
const router = express.Router();

const ctrlMap = require("../controllers/map");

router.get("/", ctrlMap.get);
router.get("/allPlaces", ctrlMap.getPlacaMarks);
router.post("/placemark", ctrlMap.createPlace);
router.get("/placemark/:id", ctrlMap.getPlace);
router.put("/placemark/:id", ctrlMap.updatePlace);

module.exports = router;
const express = require("express");
const router = express.Router();

const ctrlMap = require("../controllers/map");

router.get("/", ctrlMap.get);

module.exports = router;
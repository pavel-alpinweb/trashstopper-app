const db = require("../models/db");

module.exports.get = function(req, res) {
    res.render("pages/index");
};

module.exports.getPlacaMarks = function(req, res){
    const result = db.get("placeMarks").value();
    res.send(result);
};
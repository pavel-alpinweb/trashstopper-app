const db = require("../models/db");

module.exports.get = function(req, res) {
    res.render("pages/index");
};

module.exports.getPlacaMarks = function(req, res){
    const result = db.get("placeMarks").value();
    res.send(result);
};

module.exports.createPlace = function(req, res){
    const place = req.body;
    const placeMark = {
        coords: place.coords,
        id: place.id,
        placeName: place.placeName
    };
    db.get("places").push(place).write();
    db.get("placeMarks").push(placeMark).write();
    res.sendStatus(200);
};

module.exports.getPlace = function (req, res) {
    const id = Number(req.params.id);
    const result = db.get("places").find({ id: id }).value();
    res.send(result);
}
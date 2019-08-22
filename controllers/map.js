const db = require("../models/db");
const multiparty = require('multiparty');
const fs = require("fs");

function savePlaceData(req, res, dbfunction){
    // create a form to begin parsing
    const form = new multiparty.Form();
    let uploadFile = {uploadPath: ''};
    let errors = [];
    let place = {};
    form.on('error', function(err){
        if(fs.existsSync(uploadFile.uploadPath)) {
            fs.unlinkSync(uploadFile.uploadPath);
            console.log(err);
        }
    });

    form.on('close', function() {
        if(errors.length == 0) {
            place.id = Number(place.id);
            place.coords = JSON.parse(place.coords);
            place.imageArray = JSON.parse(place.imageArray);
            dbfunction(place);
        } else {
            if(fs.existsSync(uploadFile.uploadPath)) {
                fs.unlinkSync(uploadFile.uploadPath);
            }
            console.log(errors);
            res.sendStatus(500);
        }
    });

    form.on('field', function (name, value) {
        console.log(`${name} : ${value}`);
        if(name == "isNew") {
            place[name] = Boolean(value);
        } else {
            place[name] = value;
        }
    });

    // listen on part event for image file
    form.on('part', function(part) {
        if(part.filename){
            uploadFile.path = "./public/content/" + part.filename;
            uploadFile.filename = part.filename;
            if(errors.length == 0) {
                var out = fs.createWriteStream(uploadFile.path);
                part.pipe(out);
            }
            else {
                part.resume();
            }
        }
    });

    // parse the form
    form.parse(req); 
}

module.exports.get = function(req, res) {
    res.render("pages/index");
};

module.exports.getPlacaMarks = function(req, res){
    const result = db.get("placeMarks").value();
    res.send(result);
};

module.exports.createPlace = function(req, res){
    savePlaceData(req, res, (place)=>{
        const placeMark = {
            coords: place.coords,
            id: place.id,
            placeName: place.placeName
        };
        db.get("places").push(place).write();
        db.get("placeMarks").push(placeMark).write();
    });
    res.sendStatus(200);
};

module.exports.getPlace = function (req, res) {
    const id = Number(req.params.id);
    const result = db.get("places").find({ id: id }).value();
    res.send(result);
}
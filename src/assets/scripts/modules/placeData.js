class PlaceData {
    constructor() {
        this.coords = [],
        this.mapAddress = "",
        this.placeName = "",
        this.id = 1,
        this.placeType = "trashPlace",
        this.isNew = true,
        this.imageArray = {
            trash: [],
            clean: [],
            boxes: []
        }
    }
};

export default PlaceData;
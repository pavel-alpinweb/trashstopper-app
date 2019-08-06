const model = {
    placeMarksArray: [
        [42.947290603654984, 74.59746025390625],
        [42.831162453900845, 74.40897606201173],
        [42.83470003785928, 74.65479515380856],
        [42.79577539713646, 74.481073840332],
        [42.825476623823434, 74.77770469970703],
        [42.82446575443727, 74.34649132080077],
        [42.911844386420285, 74.38116691894528]
    ],
    placeData: {
        mapAddress: "",
        placeName: "",
        placeType: "trashPlace"
    },
    getAllCoords(){
        return this.placeMarksArray;
    },
    getPlaceData(){
        return this.placeData;
    }
};

export default model;
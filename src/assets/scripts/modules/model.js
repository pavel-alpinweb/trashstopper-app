const model = {
    placeMarksArray: [
        {
            coords: [42.947290603654984, 74.59746025390625],
            placeName: "Пользовательское название места"
        },
        {
            coords: [42.831162453900845, 74.40897606201173],
            placeName: "Пользовательское название места"
        },
        {
            coords: [42.79577539713646, 74.481073840332],
            placeName: "Пользовательское название места"
        },
        {
            coords: [42.825476623823434, 74.77770469970703],
            placeName: "Пользовательское название места"
        },
        {
            coords: [42.82446575443727, 74.34649132080077],
            placeName: "Пользовательское название места"
        },
        {
            coords: [42.911844386420285, 74.38116691894528],
            placeName: "Пользовательское название места"
        }       
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
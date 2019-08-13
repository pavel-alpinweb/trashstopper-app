const fileBtnArray = document.querySelectorAll('[data-file-btn]');

const model = {
    placeMarksArray: [
        {
            coords: [42.947290603654984, 74.59746025390625],
            id:1,
            placeName: "Пользовательское название места"
        }
    ],
    // {
    //     coords: [42.947290603654984, 74.59746025390625],
    //     placeName: "Пользовательское название места"
    // }
    placeData: {
        coords: [],
        mapAddress: "",
        placeName: "",
        placeType: "trashPlace",
        imageArray: {
            trash: [],
            clean: [],
            boxes: []
        }
    },
    async getAllCoords(){
        let response = await fetch('/allPlaces');
        if (response.ok) { 
            let json = await response.json();
            this.placeMarksArray = json;
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
        return this.placeMarksArray;
    },
    async getPlaceData(id, callback){
        let response = await fetch('/placemark' + id);
        if (response.ok) { 
            let json = await response.json();
            callback(json);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    },
    async postPlaceData(data, callback){
        let response = await fetch('/placemark', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        });
        if (response.ok) {
            callback();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    },
    addPhoto(){
        for (const element of fileBtnArray) {
            element.addEventListener('click', (e)=>{
                e.preventDefault();
            });
        }
    }
};

export default model;
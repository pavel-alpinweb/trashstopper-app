const model = {
    placeMarksArray: [],
    placeData: {
        coords: [],
        mapAddress: "",
        placeName: "",
        id:1,
        placeType: "trashPlace",
        isNew: false,
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
    async getPlaceData(id){
        let response = await fetch('/placemark/' + id);
        if (response.ok) { 
            let json = await response.json();
            return json;
        } else {
            alert("Ошибка HTTP: " + response.status);
            return false;
        }
    },
    async postPlaceData(place){
        var data = new FormData();
        data.append('coords', JSON.stringify(place.coords));
        data.append('mapAddress', place.mapAddress);
        data.append('placeName', place.placeName);
        data.append('id', place.id);
        data.append('placeType', place.placeType);
        data.append('isNew', place.isNew);
        data.append('imageArray', JSON.stringify(place.imageArray));
        if(place.files){
            for (const file of place.files) {
                data.append('files[]', file);
            }
        }
        console.log(data);
        console.log(place);
        let response = await fetch('/placemark', {
          method: 'POST',
          body: data
        });
        if (response.ok) {
            return true;
        } else {
            alert("Ошибка HTTP: " + response.status);
            return false;
        }
    },
    async updatePlaceData(data){
        let response = await fetch('/placemark/' + data.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          body: JSON.stringify(data)
        });
        if (response.ok) {
            alert("Данные о месте обновленны");
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
};

export default model;
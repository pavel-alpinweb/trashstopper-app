const fileBtnArray = document.querySelectorAll('[data-file-btn]');

const model = {
    placeMarksArray: [],
    // {
    //     coords: [42.947290603654984, 74.59746025390625],
    //     placeName: "Пользовательское название места"
    // }
    placeData: {
        mapAddress: "",
        placeName: "",
        placeType: "trashPlace",
        imageArray: {
            trash: ["assets/content/trash1.jpg","assets/content/trash2.jpg","assets/content/trash3.jpg","assets/content/trash4.jpg"],
            clean: ["assets/content/clean1.jpg","assets/content/clean2.jpg","assets/content/clean3.jpg","assets/content/clean4.jpg"],
            boxes: ["assets/content/box1.jpg","assets/content/box2.jpg"]
        }
    },
    async getAllCoords(){
        let response = await fetch('/allCoords');
        if (response.ok) { // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            let json = await response.json();
            this.placeMarksArray = json;
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
        return this.placeMarksArray;
    },
    getPlaceData(){
        return this.placeData;
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
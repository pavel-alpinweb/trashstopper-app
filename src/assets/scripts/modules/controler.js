import view from './view';
import model from './model';
import PlaceData from './placeData';

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);
async function init () {
    
    let coords;
    let addressText;
    let placemark;
    let trashFilesArray = [];
    let cleanFilesArray = [];
    let boxesFilesArray = [];
    let dataFilesArray = [];
    
    const nameInput = document.querySelector('[data-role="place-name"]');
    const idElem = document.querySelector('[data-id]');
    const fileBtnArray = document.querySelectorAll('[data-role="file-btn"]');

    const fileInputsArray = document.querySelectorAll('[data-input-file]');
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    const map = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [42.8736, 74.6057], // Бишкек
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    });
    let cluster = view.createCluster(map);
    let coordsArray = await model.getAllCoords();
    if(coordsArray.length > 0){
        for (const coords of coordsArray) {
            placemark = view.createPlacemark(map, coords.coords, coords.placeName, coords.id);
            cluster.add(placemark);
        }
    }
    map.events.add('click', (e)=>{
        coords = e.get('coords');
        ymaps.geocode(coords)
            .then(function (res) {
                let firstGeoObject = res.geoObjects.get(0);
                let placeData = new PlaceData;
                addressText = firstGeoObject.getAddressLine();
                placeData.mapAddress = addressText;
                view.showForm(placeData);
                view.initHideForm();
                view.initShowGallery();
            });
    });
    const sendBtn = document.querySelector('[data-role="send-data"]');
    sendBtn.addEventListener('click', async (e)=>{
        e.preventDefault();
        let placeData = new PlaceData;
        placeData.id = Date.now();
        placeData.mapAddress = addressText;
        placeData.coords = coords;
        placeData.placeName = nameInput.value;
        placeData.placeType = document.querySelector('input[name="place-type"]:checked').value;
        placeData.isNew = false;
        placeData.imageArray.trash = trashFilesArray;
        placeData.imageArray.clean = cleanFilesArray;
        placeData.imageArray.boxes = boxesFilesArray;
        if(dataFilesArray.length > 0){
            placeData.files = dataFilesArray;
        }
        let isSuccess = await model.postPlaceData(placeData);
        if(isSuccess){
            placemark = view.createPlacemark(map, coords, placeData.placeName, placeData.id);
            cluster.add(placemark);
            dataFilesArray = [];
        } 
        view.hideForm();
    });
    const updateBtn = document.querySelector('[data-role="update-data"]');
    updateBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        let placeData = model.placeData;
        placeData.id = idElem.dataset.id;
        placeData.mapAddress = addressText;
        placeData.coords = coords;
        placeData.placeName = nameInput.value;
        placeData.placeType = document.querySelector('input[name="place-type"]:checked').value;
        model.postPlaceData(placeData);
        view.hideForm();
    });
    document.body.addEventListener('click',async (e)=>{
        if(e.target.dataset.role == "getPlaceData"){
            let id = e.target.id;
            model.placeData = await model.getPlaceData(id);
            if(model.placeData){
                view.showForm(model.placeData);
                view.initHideForm();
                view.initShowGallery();
            }
        }
    });
    function addPhoto(){
        for (const element of fileBtnArray) {
            element.addEventListener('click', (e)=>{
                e.preventDefault();
                const fileEl = e.target.dataset.fileBtn;
                const fileInput = document.querySelector(`[data-file="${fileEl}"]`);
                fileInput.click();
            });
        }
        for (const input of fileInputsArray) {
            input.addEventListener('change', (e)=>{
                const loadingFilesArray = e.target.files;
                let filesUrls = [];
                let inputDataName = e.target.dataset.file;
                    for (const file of loadingFilesArray) {
                        let isValidType = (file.type == 'image/png'
                            || file.type == 'image/jpeg'
                            || file.type == 'image/jpg');
                        let isValidSize = file.size / 1024 / 1024 < 2;
                        if (!isValidType) {
                            alert(`Можно загружать только изображения форматов: png, jpeg, jpg. 
                            Файл: ${file.name} имеет не верный формат.`);
                        } else if(!isValidSize) {
                            alert(`Файл не должен привышать размер 2mb. 
                            Файл: ${file.name} имеет слишком большой размер.`);
                        } else {
                            const reader = new FileReader();
                            reader.onload = function () {
                                filesUrls.push(`/content/${file.name}`);
                                view.displayUserImage(inputDataName, reader.result);
                                dataFilesArray.push(file);
                            };
                            reader.readAsDataURL(file);
                        }
                    }
                    if(inputDataName == "trash") {
                        trashFilesArray = filesUrls;
                    } else if (inputDataName == "clean") {
                        cleanFilesArray = filesUrls;
                    } else if (inputDataName == "boxes") {
                        boxesFilesArray = filesUrls;
                    }
            }); 
        }
    }
    addPhoto();
    view.initSlidePhoto();
}

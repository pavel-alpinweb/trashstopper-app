import view from './view';
import model from './model';

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);
async function init () {
    let coords;
    let addressText;
    let placemark;
    const nameInput = document.querySelector('[data-role="place-name"]');

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
                let placeData = {...model.placeData};
                addressText = firstGeoObject.getAddressLine();
                placeData.mapAddress = addressText;
                view.showForm(placeData);
                view.initHideForm();
                view.initShowGallery();
            });
    });
    const sendBtn = document.querySelector('[data-role="send-data"]');
    sendBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        let placeData = {...model.placeData};
        placeData.id = Date.now();
        placeData.mapAddress = addressText;
        placeData.coords = coords;
        placeData.placeName = nameInput.value;
        placeData.placeType = document.querySelector('input[name="place-type"]:checked').value;
        model.postPlaceData(placeData, ()=>{
            placemark = view.createPlacemark(map, coords, addressText, placeData.id);
            cluster.add(placemark);
        });
        view.hideForm();
    });
    document.body.addEventListener('click',(e)=>{
        if(e.target.dataset.role == "getPlaceData"){
            let id = e.target.id;
            model.getPlaceData(id,(placeData)=>{
                view.showForm(placeData);
                view.initHideForm();
                view.initShowGallery();
            });
        }
    });
    view.initSlidePhoto();
    model.addPhoto();
}

import view from './view';
import model from './model';

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);
function init () {
    let coords;
    let addressText;
    let placemark;

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
    let coordsArray = model.getAllCoords();
    if(coordsArray.length > 0){
        for (const coords of coordsArray) {
            placemark = view.createPlacemark(map, coords.coords, coords.placeName);
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
        placemark = view.createPlacemark(map, coords, addressText);
        cluster.add(placemark);
        view.hideForm();
    });
    document.body.addEventListener('click',(e)=>{
        if(e.target.dataset.role == "getPlaceData"){
            let placeData = model.getPlaceData();
            view.showForm(placeData);
            view.initHideForm();
            view.initShowGallery();
        }
    });
    view.initSlidePhoto();
    model.addPhoto();
}

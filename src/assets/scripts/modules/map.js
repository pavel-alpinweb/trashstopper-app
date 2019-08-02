import view from './view';
import model from './model';

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);
function init () {
    let coords;
    let addressText;

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
    let coordsArray = model.getAllCoords();
    for (const coords of coordsArray) {
        view.createPlacemark(map, coords, 'text');
    }
    map.events.add('click', (e)=>{
        coords = e.get('coords');
        console.log(coords);
        ymaps.geocode(coords)
            .then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);
                addressText = firstGeoObject.getAddressLine();
                view.showForm(addressText);
                view.initHideForm();
            });
        const sendBtn = document.querySelector('[data-role="send-data"]');
        sendBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            view.createPlacemark(map, coords, addressText);
            view.hideForm();
        });
    });
}

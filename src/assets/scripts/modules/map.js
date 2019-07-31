import view from './view';

// Дождёмся загрузки API и готовности DOM.
const myMap = ymaps.ready(init);
function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    const map = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [42.8736, 74.6057], // Москва
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    });
    map.events.add('click', (e)=>{
        const coords = e.get('coords');
        console.log(coords);
        view.createPlace(map, coords);
    });
}

export default myMap;
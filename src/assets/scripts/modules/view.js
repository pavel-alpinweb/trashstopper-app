const view = {
    createPlace(map, coords){
        map.geoObjects.add(new ymaps.Placemark(coords, {
            balloonContent: 'цвет <strong>влюбленной жабы</strong>'
        }, {
            preset: 'islands#circleIcon',
            iconColor: '#3caa3c'
        }));
    }
};

export default view;
const view = {
    createPlacemark(map, coords, textAddress){
        map.geoObjects.add(new ymaps.Placemark(coords, {
            balloonContent: `<button>${textAddress}</button>`
        }, {
            preset: 'islands#circleIcon',
            iconColor: '#3caa3c'
        }));
    }
};

export default view;
const view = {
    createPlacemark(map, coords, textAddress){
        map.geoObjects.add(new ymaps.Placemark(coords, {
            balloonContent: `<button>${textAddress}</button>`
        }, {
            preset: 'islands#circleIcon',
            iconColor: '#3caa3c'
        }));
    },
    showForm(name, data){
        const form = document.querySelector(`[data-form="${name}"]`);
        form.classList.remove("hide");
    }
};

export default view;
const view = {
    createPlacemark(map, coords, textAddress){
        map.geoObjects.add(new ymaps.Placemark(coords, {
            balloonContent: `<button>${textAddress}</button>`
        }, {
            preset: 'islands#circleIcon',
            iconColor: '#3caa3c'
        }));
    },
    showForm(data){
        const form = document.querySelector('[data-window="form-container"]');
        const addressEl = document.querySelector('[data-role="addressLine"]');
        addressEl.innerText = data;
        form.classList.remove("hide");
    },
    hideForm(){
        const form = document.querySelector('[data-window="form-container"]');
        form.classList.add("hide");
    },
    initHideForm(){
        const closeBtns = document.querySelectorAll('[data-close="close-form"]');
        for (const btn of closeBtns) {
            btn.addEventListener('click', this.hideForm);
        }
    }
};

export default view;
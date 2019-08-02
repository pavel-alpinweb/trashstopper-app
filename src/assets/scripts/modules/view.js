const view = {
    createPlacemark(map, coords, textAddress){
        let placemark = new ymaps.Placemark(coords, {
            balloonContent: `<button>${textAddress}</button>`
        }, {
            preset: 'islands#circleIcon',
            iconColor: '#3caa3c'
        });
        map.geoObjects.add(placemark);
        console.log(placemark);
        return placemark;
    },
    createCluster(map){
        const cluster = new ymaps.Clusterer({ 
            clusterDisableClickZoom: true,
            clusterOpenBalloonOnClick: true,
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonPanelMaxMapArea: 0,
            clusterBalloonContentLayoutWidth: 200,
            clusterBalloonContentLayoutHeight: 130,
            clusterBalloonPagerSize: 5
        });
        map.geoObjects.add(cluster);
        return cluster;
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
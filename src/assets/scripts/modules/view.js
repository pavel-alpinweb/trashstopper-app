const form = document.querySelector('[data-window="form-container"]');

const addressEl = document.querySelector('[data-role="addressLine"]');
const inputEl = document.querySelector('[data-role="place-name"]');

const radioElTrash = document.querySelector('[data-place="trash-place"]');
const radioElClean = document.querySelector('[data-place="clean-place"]');
const radioElBox = document.querySelector('[data-place="trashBox-place"]');

const trashGallery = document.querySelector('[data-gallery="trashGallery"]');
const cleanGallery = document.querySelector('[data-gallery="cleanGallery"]');
const boxesGallery = document.querySelector('[data-gallery="boxesGallery"]');

const view = {
    createPlacemark(map, coords, textAddress){
        let placemark = new ymaps.Placemark(coords, {
            balloonContent: `<button class="main-btn" data-role="getPlaceData">${textAddress}</button>`
        }, {
            preset: 'islands#circleIcon',
            iconColor: '#3caa3c'
        });
        map.geoObjects.add(placemark);
        return placemark;
    },
    createCluster(map){
        const cluster = new ymaps.Clusterer({ 
            clusterDisableClickZoom: true,
            clusterOpenBalloonOnClick: true,
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonPanelMaxMapArea: 0,
            clusterBalloonContentLayoutWidth: 600,
            clusterBalloonContentLayoutHeight: 70,
            clusterBalloonPagerSize: 5
        });
        map.geoObjects.add(cluster);
        return cluster;
    },
    showForm(data){       
        addressEl.innerText = data.mapAddress;
        inputEl.value = data.placeName;
        trashGallery.innerHTML = "";
        cleanGallery.innerHTML = "";
        boxesGallery.innerHTML = "";
        if(data.placeType == "trashBox"){
            radioElBox.click();
        } else if(data.placeType == "cleanPlace"){
            radioElClean.click();
        } else if(data.placeType == "trashPlace"){
            radioElTrash.click();
        }

        if(data.imageArray.trash.length != 0){
            for (const src of data.imageArray.trash) {
                const image = document.createElement('img');
                image.className='photo-preview';
                image.src = src;
                trashGallery.append(image);
            }  
        }
        if(data.imageArray.clean.length != 0){
            for (const src of data.imageArray.clean) {
                const image = document.createElement('img');
                image.className='photo-preview';
                image.src = src;
                cleanGallery.append(image);
            }  
        }
        if(data.imageArray.boxes.length != 0){
            for (const src of data.imageArray.boxes) {
                const image = document.createElement('img');
                image.className='photo-preview';
                image.src = src;
                boxesGallery.append(image);
            }  
        }

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
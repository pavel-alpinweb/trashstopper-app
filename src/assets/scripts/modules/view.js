const form = document.querySelector('[data-window="form-container"]');
const gallery = document.querySelector('[data-window="gallery-container"]');

const addressEl = document.querySelector('[data-role="addressLine"]');
const inputEl = document.querySelector('[data-role="place-name"]');
const idElem = document.querySelector('[data-id]');

const radioElTrash = document.querySelector('[data-place="trash-place"]');
const radioElClean = document.querySelector('[data-place="clean-place"]');
const radioElBox = document.querySelector('[data-place="trashBox-place"]');

const trashGallery = document.querySelector('[data-gallery="trashGallery"]');
const cleanGallery = document.querySelector('[data-gallery="cleanGallery"]');
const boxesGallery = document.querySelector('[data-gallery="boxesGallery"]');

const closeBtns = document.querySelectorAll('[data-close="close-form"]');
const closeGalleryBtns = document.querySelectorAll('[data-close="close-gallery"]');

const gallerySlide = document.querySelector('[data-slide]');
const nextSlideBtn = document.querySelector('[data-control="next-slide"]');
const prevSlideBtn = document.querySelector('[data-control="prev-slide"]');

const sendBtn = document.querySelector('[data-role="send-data"]');
const updateBtn = document.querySelector('[data-role="update-data"]');


let galleryArray = [];

let trashGalleryArray = [];
let cleanGalleryArray = [];
let boxesGalleryArray = [];

const view = {
    createPlacemark(map, coords, textAddress, id){
        let placemark = new ymaps.Placemark(coords, {
            balloonContent: `<button class="main-btn" data-role="getPlaceData", id="${id}">${textAddress}</button>`
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
        idElem.setAttribute('data-id', data.id);
        if(data.placeType == "trashBox"){
            radioElBox.click();
        } else if(data.placeType == "cleanPlace"){
            radioElClean.click();
        } else if(data.placeType == "trashPlace"){
            radioElTrash.click();
        }
        if(data.isNew){
            updateBtn.classList.add("hide");
            sendBtn.classList.remove("hide");
        } else {
            updateBtn.classList.remove("hide");
            sendBtn.classList.add("hide");
        }
        if(data.imageArray.trash.length != 0){
            let index = 0;
            trashGalleryArray = data.imageArray.trash;
            for (const src of data.imageArray.trash) {
                const image = document.createElement('img');
                image.className='photo-preview';
                image.src = src;
                image.setAttribute('data-photo', index);
                image.setAttribute('data-type-photo', 'trash');
                index++;
                trashGallery.append(image);
            }  
        }
        if(data.imageArray.clean.length != 0){
            let index = 0;
            cleanGalleryArray = data.imageArray.clean;
            for (const src of data.imageArray.clean) {
                const image = document.createElement('img');
                image.className='photo-preview';
                image.src = src;
                image.setAttribute('data-photo', index);
                image.setAttribute('data-type-photo', 'clean');
                index++;
                cleanGallery.append(image);
            }  
        }
        if(data.imageArray.boxes.length != 0){
            let index = 0;
            boxesGalleryArray = data.imageArray.boxes;
            for (const src of data.imageArray.boxes) {
                const image = document.createElement('img');
                image.className='photo-preview';
                image.src = src;
                image.setAttribute('data-photo', index);
                image.setAttribute('data-type-photo', 'boxes');
                index++;
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
        for (const btn of closeBtns) {
            btn.addEventListener('click', this.hideForm);
        }
    },
    initShowGallery(){
        document.body.addEventListener('click',(e)=>{
            if(e.target.dataset.typePhoto){
                if(e.target.dataset.typePhoto == 'trash'){
                    galleryArray = trashGalleryArray;
                } else if(e.target.dataset.typePhoto == 'clean'){
                    galleryArray = cleanGalleryArray;
                } else if(e.target.dataset.typePhoto == 'boxes'){
                    galleryArray = boxesGalleryArray;
                }
                this.hideForm();
                const src = galleryArray[e.target.dataset.photo];
                gallerySlide.src = src;
                gallerySlide.setAttribute('data-slide', e.target.dataset.photo);
                gallery.classList.remove("hide");
                this.initHideGallery();
            }
        });
    },
    initHideGallery(){
        for (const btn of closeGalleryBtns) {
            btn.addEventListener('click', ()=>{
                gallery.classList.add("hide");
                form.classList.remove("hide");
            });
        }
    },
    initSlidePhoto(){
        nextSlideBtn.addEventListener('click', ()=>{
            let index = gallerySlide.getAttribute('data-slide');
            index++;
            if(index == galleryArray.length){
                index = 0;
            }
            gallerySlide.setAttribute('data-slide', index);
            const src = galleryArray[index];
            gallerySlide.src = src;
        });
        prevSlideBtn.addEventListener('click', ()=>{
            let index = gallerySlide.getAttribute('data-slide');
            index--;
            if(index == -1){
                index = galleryArray.length-1;
            }
            gallerySlide.setAttribute('data-slide', index);
            const src = galleryArray[index];
            gallerySlide.src = src;
        });
    },
    displayUserImage(container, url){
        const imageLoadContainer = document.querySelector(`[data-image-container="${container}"]`);
        const image = document.createElement('IMG');
        image.setAttribute('src', url);
        image.className='photo-preview photo-preview--small';
        imageLoadContainer.append(image);
    }
};

export default view;
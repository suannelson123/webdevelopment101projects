
document.addEventListener('DOMContentLoaded', function () {
    const pageLimitSelect = document.getElementById('pageLimit');
    let currentPage = 1;
    let photosPerPage = 10;
    let currentAlbumId = null;

    document.getElementById('prevPageBtn').addEventListener('click', () => loadPhotos(currentAlbumId, currentPage - 1));
    document.getElementById('nextPageBtn').addEventListener('click', () => loadPhotos(currentAlbumId, currentPage + 1));
    document.getElementById('setPageLimitBtn').addEventListener('click', setPhotosPerPage);
    document.querySelector('.searchbtn').addEventListener('click', searchByAlbumId);
    document.addEventListener('keyup', (e) => e.key === 'Enter' && searchByAlbumId());

    function setPhotosPerPage() {
        const newPageLimit = parseInt(pageLimitSelect.value, 10);
        if (!isNaN(newPageLimit) && newPageLimit > 0) {
            photosPerPage = newPageLimit;
            currentPage = 1;
            loadPhotos(currentAlbumId);
        }
    }

    function loadPhotos(albumId = null, page = 1) {
        let apiUrl = `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${photosPerPage}`;
        if (albumId) apiUrl += `&albumId=${albumId}`;

        fetch(apiUrl)
            .then(res => res.ok ? res.json() : Promise.reject(`Network Error: ${res.status}`))
            .then(photos => {
                console.log('Fetched Data:', photos);

                const photoContainer = document.getElementById('photo-container');
                photoContainer.innerHTML = '';

                if (photos.length > 0) {
                    photos.forEach(photo => {
                        const photoElement = document.createElement('div');
                        photoElement.className = 'photo-card';
                        photoElement.innerHTML = `
                            <p>ID: ${photo.id}</p> <p> Album ID: ${photo.albumId}</p> 
                            <img src="${photo.url}" alt="${photo.title}">
                            <p>${photo.title}</p>
                        `;

                        photoElement.querySelector('img').onclick = () => showPopup(photo.url, photo.title);
                        photoContainer.appendChild(photoElement);
                    });

                    const nextPageBtn = document.getElementById('nextPageBtn');
                    nextPageBtn.disabled = photos.length < photosPerPage;
                } else {
                    const nextPageBtn = document.getElementById('nextPageBtn');
                    nextPageBtn.disabled = true;
                }

                currentPage = page;
                updatePageCounter();
            })
            .catch(error => console.error('Error:', error));
    }

    function updatePageCounter() {
        document.getElementById('currentPage').textContent = `Page: ${currentPage}`;
        document.getElementById('prevPageBtn').disabled = currentPage === 1;
    }

    function searchByAlbumId() {
        const albumId = document.getElementById('album-id').value;
        if (albumId !== '') {
            currentAlbumId = albumId;
            currentPage = 1;
            loadPhotos(currentAlbumId);
        } else {
            alert('Enter a valid Album ID');
        }

        if(isNaN(albumId)) {
            alert('Enter a valid Album ID');
        }
        
    }

    function showPopup(imgSrc, imgTitle) {
        const popupImage = document.querySelector('.popup-image');
        popupImage.style.display = 'block';
        popupImage.querySelector('.img-popup').src = imgSrc;
        popupImage.querySelector('.img-title').innerText = imgTitle;
        document.querySelector('.close-button').onclick = () => popupImage.style.display = 'none';
    }

    setPhotosPerPage();
});
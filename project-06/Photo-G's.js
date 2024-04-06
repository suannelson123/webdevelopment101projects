document.addEventListener("DOMContentLoaded", function () {
  let currentPage = 1;
  let currentSearchQuery = "";
  const searchQuery = document.getElementById("search-input").value;
  const searchBtn = document.getElementById("searchbtn");
  const categoryLinks = document.querySelectorAll(".categories-text a");

  searchBtn.addEventListener("click", () => {
    currentSearchQuery = searchQuery;
    currentPage = 1;
    searchPhotos(currentSearchQuery);
  });

  categoryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const clickedCategory = event.target.innerText;
      console.log(clickedCategory);
      currentSearchQuery = clickedCategory;
      currentPage = 1;
      searchPhotos(currentSearchQuery);
    });
  });

  const prevPageBtn = document.getElementById("prevPageBtn");
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      console.log(`page: ${currentPage}`);
      searchPhotos(currentSearchQuery);
    }
  });

  const nextPageBtn = document.getElementById("nextPageBtn");
  nextPageBtn.addEventListener("click", () => {
    currentPage++;
    console.log(`page: ${currentPage}`);
    searchPhotos(currentSearchQuery);
  });


  function searchPhotos(searchQuery) {
    let apiUrl = `https://api.unsplash.com/photos?client_id=mBgkSytgoWrvs5bmy8in4FqTVY03mjCbj-BGDcMHpwA&page=${currentPage}&per_page=50`;

    if (searchQuery) {
      apiUrl = `https://api.unsplash.com/search/photos?client_id=mBgkSytgoWrvs5bmy8in4FqTVY03mjCbj-BGDcMHpwA&page=${currentPage}&per_page=50&query=${searchQuery}`;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const photoContainer = document.getElementById("photos-container");
        photoContainer.innerHTML = "";

        const photos = data.results || data;

        if (photos.length > 0) {
          photos.forEach((photo) => {
            const photoElement = document.createElement("div");
            const userImage = document.createElement("div");
            userImage.className = "user-image";
            photoElement.className = "photo-card";

            photoElement.innerHTML = `
              <img src="${photo.urls.regular}" alt="${photo.description}">
            `;

            userImage.innerHTML = `
              <img src="${photo.user.profile_image.large}" alt="${photo.user.name}">
              <p class="not-absolute">${photo.user.name}</p>
            `;

            photoElement.appendChild(userImage);
            photoContainer.appendChild(photoElement);
          });
        }

        const totalPages = data.total_pages;

        document.querySelectorAll(".photo-card img").forEach((image) => {
          image.addEventListener("click", () => {
            const popupImage = document.querySelector(".popup-image-container");
            if (popupImage) {
              popupImage.classList.add("open-full-image");

              const fullPhoto = document.querySelector(".full-photo");
              const userProfile = document.querySelector(
                ".user-info img.user-profile"
              );
              const userName = image
                .closest(".photo-card")
                .querySelector(".not-absolute").innerText;

              const clickedPhoto = photos.find((p) => p.user.name === userName);

              if (fullPhoto) {
                fullPhoto.src = image.getAttribute("src");
              }

              if (userProfile) {
                userProfile.src = image
                  .closest(".photo-card")
                  .querySelector(".user-image img")
                  .getAttribute("src");
              }

              const popUpUserName = document.querySelector(".user-name");
              if (popUpUserName) {
                popUpUserName.textContent = userName;
              }
            }
          });
        });

        const closeFullImage = document.querySelector(
          ".popup-image-container .close-button"
        );
        closeFullImage.addEventListener("click", () => {
          const popupImage = document.querySelector(".popup-image-container");
          popupImage.classList.remove("open-full-image");
        });

        if (totalPages !== undefined) {
          console.log(`Total Pages: ${totalPages}`);
        }

        if (photos.length == 0) {
          nextPageBtn.disabled = true;
        } else {
          nextPageBtn.disabled = false;
        }

        const homePage = document.querySelector(".looka-1j8o68f");
        const homePageNav = document.querySelector(".nav-p");
        const anchorTagElement = homePageNav.querySelector("a");
        homePage.style.cursor = "pointer";
        homePage.addEventListener("click", () => {
          window.location.reload();
        });
        anchorTagElement.addEventListener('click', () => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  searchPhotos();

  document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const searchQuery = document.getElementById("search-input").value;
      currentSearchQuery = searchQuery;
      currentPage = 1;
      searchPhotos(currentSearchQuery);
    }
  });
});

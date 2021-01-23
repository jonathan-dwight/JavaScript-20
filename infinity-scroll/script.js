import { apiKey } from "./keys.js";

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API

const count = 10;
const key = apiKey;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`;

// helper function to set attributes on dom elements;
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};

// check if all images were loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
    }
};

// Create elements for links and photos, add to DOM
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });

        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener("load", imageLoaded);
        // put img inside a tag
        item.append(img);
        imageContainer.appendChild(item);
    });
};

// get photos from Unsplash API

const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
};

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000 &&
        ready
    ) {
        ready = false;
        getPhotos();
    }
});

// window.innerHeight - total height of browser window
// window.scrollY - how much a user has scrolled from the top
// document.body.offsetHeight - height of everything in the body including what is not within view
// need to subtratct from offset

getPhotos();

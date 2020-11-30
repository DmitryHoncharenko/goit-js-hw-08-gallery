import gallery from './gallery-items.js';

const imageItem = document.querySelector('.gallery');
const images = imageGallary(gallery);

imageItem.insertAdjacentHTML('afterbegin', images);

function imageGallary(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a class="gallery__link" 
          href = "${original}"
        >
          <img class="gallery__image"
            src = "${preview}"
            data-source = "${original}"
            alt = "${description}"
          />
        </a>
      </li>
    `;
    })
  .join('');
}

const largeImage = document.querySelector('.lightbox__image');

imageItem.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  
  const imageRef = event.target;
  
  const largeImageURL = imageRef.dataset.source;
  const largeImageAlt = imageRef.alt;

  setLargeImageSrc(largeImageURL, largeImageAlt);

  const onLargeImage = largeImage.closest('.lightbox');
  onLargeImage.classList.add('is-open');

  const lightboxRef = document.querySelector('.js-lightbox');
  
  lightboxRef.addEventListener('click', closeLightBox);
  
  function closeLightBox(event) {
    if (event.target.nodeName === 'IMG') {
      return;
    }
    onLargeImage.classList.remove('is-open');
    largeImage.src = '';
    largeImage.alt = '';
  }
}

function setLargeImageSrc(original, description) {
  largeImage.src = original;
  largeImage.alt = description;
};


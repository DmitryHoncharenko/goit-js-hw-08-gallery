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

  setLargeImageSrc(largeImageURL);
  setLargeImageAlt(largeImageAlt);

  const onLargeImage = largeImage.closest('.lightbox');
  onLargeImage.classList.add('is-open');

  const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
  const lightboxRef = document.querySelector('.js-lightbox');

  closeBtn.addEventListener('click', () => {
    onLargeImage.classList.remove('is-open');
  });
  
  lightboxRef.addEventListener('click', () => {
    onLargeImage.classList.remove('is-open');
  })
}

function setLargeImageSrc(original) {
  largeImage.src = original;
}

function setLargeImageAlt(description) {
  largeImage.alt = description;
}

// const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
// closeBtn.addEventListener('click', () => {
//   onLargeImage.classList.remove('is-open');
// })




/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */
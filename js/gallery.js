import { isEscEvent } from './utils.js';
import { createMiniature } from './miniature.js';
import { showPreviewOverlay, hidePreviewOverlay } from './big-photo-overlay.js';

const userPhotosList = document.querySelector('.pictures');
const overlayCloseButton = document.querySelector('.big-picture__cancel');


const onOverlayEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    hidePreviewOverlay();
    document.removeEventListener('keydown', onOverlayEscKeydown);
  }
};

const onOverlayCloseButtonClick = (evt) => {
  evt.preventDefault();

  hidePreviewOverlay();
  overlayCloseButton.removeEventListener('click',  onOverlayCloseButtonClick);
  document.removeEventListener('keydown', onOverlayEscKeydown);
};

const onMiniatureClick = (photo) => {
  showPreviewOverlay(photo);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onOverlayEscKeydown);
  overlayCloseButton.addEventListener('click', onOverlayCloseButtonClick);
};

const addPhotos = (photos) => {
  // userPhotosList.append(...photos.map(createMiniature));
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(createMiniature(photo, onMiniatureClick));
  });

  userPhotosList.append(fragment);
};

export {addPhotos};

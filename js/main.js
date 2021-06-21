import {createPostedPhotos} from './mocks.js';
import {addPhotoMiniatures} from './miniatures.js';

import {isEscEvent} from './utils.js';

const userPhotos = createPostedPhotos();
addPhotoMiniatures(userPhotos);

// Код для 2й части 7го раздела
console.log(userPhotos);

const picturesList = document.querySelector('.pictures');
const pictures = picturesList.querySelectorAll('.picture');
const bigPictureOverlay = document.querySelector('.big-picture');
const bigPictureImage = bigPictureOverlay.querySelector('.big-picture__img')
  .querySelector('img');
const bigPictureLikes = bigPictureOverlay.querySelector('.likes-count');
const bigPictureCaption = bigPictureOverlay.querySelector('.social__caption');
const bigPictureCommentsList = bigPictureOverlay.querySelector('.social__comments');
const commentsCount = bigPictureOverlay.querySelector('.social__comment-count');
const commentsLoader = bigPictureOverlay.querySelector('.social__comments-loader');
const pageBody = document.querySelector('body');
const overlayCloseButton = bigPictureOverlay.querySelector('.big-picture__cancel');

pictures.forEach((picture, i) => {
  picture.addEventListener('click', () => {
    // console.log(i);
    bigPictureOverlay.classList.remove('hidden');
    bigPictureImage.src = userPhotos[i].url;
    bigPictureLikes.textContent = userPhotos[i].likes;
    bigPictureCaption.textContent = userPhotos[i].description;
    bigPictureCommentsList.innerHTML = '';
    // Добаление комментариев
    const pictureComments = userPhotos[i].comments;
    const commentFragment = document.createDocumentFragment();
    pictureComments.forEach((comment) => {
      const newComment = document.createElement('li');
      newComment.classList.add('social__comment');
      newComment.innerHTML = `<img class="social__picture" src="${  comment.avatar  }" alt="${  comment.name }" width="35" height="35"> <p class="social__text">${  comment.comment  }</p>`;

      commentFragment.appendChild(newComment);
    });

    bigPictureCommentsList.appendChild(commentFragment);

    // Скрываем лишнее
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    // Вешаем класс на body
    pageBody.classList.add('modal-open');

    // Реализыция закрытия окна - УЛУЧШИТЬ!
    overlayCloseButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      bigPictureOverlay.classList.add('hidden');
      pageBody.classList.remove('modal-open');
    });

    document.addEventListener('keydown', (evt) => {
      if ((isEscEvent(evt))) {
        evt.preventDefault();
        bigPictureOverlay.classList.add('hidden');
        pageBody.classList.remove('modal-open');
      }
    });
  });
});

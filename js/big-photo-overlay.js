import {isEscEvent} from './utils.js';

const picturesList = document.querySelector('.pictures');
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

const closeOverlay = (evt) => {
  evt.preventDefault();
  bigPictureOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
};

/**
 * Открывает большое изображение миниатюры фотографии
 * @param {*} userPictures Принимает массив с фотографиями пользователей
 */
const showPreviewOverlay = (userPictures) => {
  const pictures = picturesList.querySelectorAll('.picture');

  pictures.forEach((picture, i) => {
    picture.addEventListener('click', () => {
      bigPictureOverlay.classList.remove('hidden');
      bigPictureImage.src = userPictures[i].url;
      bigPictureLikes.textContent = userPictures[i].likes;
      bigPictureCaption.textContent = userPictures[i].description;
      bigPictureCommentsList.innerHTML = '';
      // Добаление комментариев
      const pictureComments = userPictures[i].comments;
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

      // Реализыция закрытия окна
      overlayCloseButton.addEventListener('click', (evt) => {
        closeOverlay(evt);
      });

      document.addEventListener('keydown', (evt) => {
        if ((isEscEvent(evt))) {
          closeOverlay(evt);
        }
      });
    });
  });
};

export {showPreviewOverlay};

import {isEscEvent} from './utils.js';

const picturesList = document.querySelector('.pictures');
const bigPictureOverlay = document.querySelector('.big-picture');
const bigPictureImage = bigPictureOverlay.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureOverlay.querySelector('.likes-count');
const bigPictureCaption = bigPictureOverlay.querySelector('.social__caption');
const bigPictureCommentsList = bigPictureOverlay.querySelector('.social__comments');
const commentsCount = bigPictureOverlay.querySelector('.social__comment-count');
const commentsLoader = bigPictureOverlay.querySelector('.social__comments-loader');
const pageBody = document.body;
const overlayCloseButton = bigPictureOverlay.querySelector('.big-picture__cancel');

const closeOverlay = () => {
  bigPictureOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
};

const onOverlayCloseButtonClick =(evt) => {
  evt.preventDefault();
  closeOverlay();

  overlayCloseButton.removeEventListener('click', onOverlayCloseButtonClick);
};

const onOverlayEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeOverlay();

    document.removeEventListener('keydown', onOverlayEscKeydown);
  }
};

/**
 * Открывает большое изображение миниатюры фотографии
 * @param {*} userPictures Принимает массив с фотографиями пользователей
 */
const showPreviewOverlay = (userPictures) => {
  const pictures = picturesList.querySelectorAll('.picture');

  pictures.forEach((picture, i) => {
    picture.addEventListener('click', () => {
      const currentPicture = userPictures[i];

      // Скрываем лишнее
      commentsCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      bigPictureImage.src = currentPicture.url;
      bigPictureLikes.textContent = currentPicture.likes;
      bigPictureCaption.textContent = currentPicture.description;
      bigPictureCommentsList.innerHTML = '';
      // Добаление комментариев
      const pictureComments = currentPicture.comments;
      const commentFragment = document.createDocumentFragment();
      pictureComments.forEach((comment) => {
        const newComment = document.createElement('li');
        newComment.classList.add('social__comment');
        newComment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"> <p class="social__text"></p>';
        const newCommentImg = newComment.children[0];
        const newCommentP = newComment.children[1];
        newCommentImg.src = comment.avatar;
        newCommentImg.alt = comment.name;
        newCommentP.textContent = comment.comment;

        commentFragment.appendChild(newComment);
      });

      bigPictureCommentsList.appendChild(commentFragment);

      // Покахзываем окно
      bigPictureOverlay.classList.remove('hidden');

      // Вешаем класс на body
      pageBody.classList.add('modal-open');

      // Реализыция закрытия окна

      overlayCloseButton.addEventListener('click', onOverlayCloseButtonClick);

      document.addEventListener('keydown', onOverlayEscKeydown);
    });
  });
};

export {showPreviewOverlay, pageBody};

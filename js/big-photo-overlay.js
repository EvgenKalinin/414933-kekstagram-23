import {isEscEvent} from './utils.js';

const COMMENT_STEP = 5;
let commentsToShow = 0;
let loadMoreComments = null;
let closeOverlay = null;

const picturesList = document.querySelector('.pictures');
const bigPictureOverlay = document.querySelector('.big-picture');
const bigPictureImage = bigPictureOverlay.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureOverlay.querySelector('.likes-count');
const bigPictureCaption = bigPictureOverlay.querySelector('.social__caption');
const bigPictureCommentsList = bigPictureOverlay.querySelector('.social__comments');
const commentsCount = bigPictureOverlay.querySelector('.social__comment-count');
const commentsShown = bigPictureOverlay.querySelector('.comments-shown');
const commentsQuantity = bigPictureOverlay.querySelector('.comments-count');
const commentsLoader = bigPictureOverlay.querySelector('.social__comments-loader');
const pageBody = document.body;
const overlayCloseButton = bigPictureOverlay.querySelector('.big-picture__cancel');


const onCommentLoaderClick = (evt) => {
  evt.preventDefault();

  if (typeof loadMoreComments === 'function') {
    loadMoreComments();
  }
};

const onOverlayCloseButtonClick = (evt) => {
  evt.preventDefault();

  if (typeof loadMoreComments === 'function') {
    closeOverlay();
  }
};

const onOverlayEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    if (typeof loadMoreComments === 'function') {
      closeOverlay();
    }
  }
};

closeOverlay = () => {
  bigPictureOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  overlayCloseButton.removeEventListener('click', onOverlayCloseButtonClick);
  commentsLoader.removeEventListener('click', onCommentLoaderClick);
  document.removeEventListener('keydown', onOverlayEscKeydown);
};


const commentTemplate = bigPictureOverlay.querySelector('.social__comment').cloneNode(true);

const renderPictureComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    const picture = newComment.querySelector('.social__picture');
    const text = newComment.querySelector('.social__text');

    picture.src = comment.avatar;
    picture.alt = comment.name;
    text.textContent = comment.comment;

    fragment.appendChild(newComment);
  });

  return fragment;
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

      bigPictureImage.src = currentPicture.url;
      bigPictureLikes.textContent = currentPicture.likes;
      bigPictureCaption.textContent = currentPicture.description;
      bigPictureCommentsList.innerHTML = '';

      // Добаление комментариев

      const comments = currentPicture.comments;

      if (comments.length > 0) {
        const showedComments = comments.slice(0, COMMENT_STEP);

        commentsShown.textContent = showedComments.length;
        commentsQuantity.textContent = comments.length;

        commentsToShow = showedComments.length;

        bigPictureCommentsList.classList.remove('hidden');
        commentsCount.classList.remove('hidden');
        commentsLoader.classList.add('hidden');

        const pictureFragment = renderPictureComments(showedComments);
        bigPictureCommentsList.appendChild(pictureFragment);

        if (comments.length >= COMMENT_STEP) {
          commentsLoader.classList.remove('hidden');
          commentsLoader.addEventListener('click', onCommentLoaderClick);
        }
      } else {
        bigPictureCommentsList.classList.add('hidden');
        commentsCount.classList.add('hidden');
        commentsLoader.classList.add('hidden');
      }

      loadMoreComments = () => {
        const showedCount = commentsToShow + COMMENT_STEP > comments.length
          ? comments.length
          : commentsToShow + COMMENT_STEP;

        const nextShowedComments = comments.slice(commentsToShow, showedCount);

        commentsToShow = showedCount;
        commentsShown.textContent = showedCount;

        const pictureFragment = renderPictureComments(nextShowedComments);
        bigPictureCommentsList.appendChild(pictureFragment);

        if (showedCount >= comments.length) {
          commentsLoader.classList.add('hidden');
          commentsLoader.removeEventListener('click', onCommentLoaderClick);
        }
      };

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

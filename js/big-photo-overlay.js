const COMMENT_STEP = 5;

let commentsToShow = 0;
let loadMoreComments = null;


const bigPictureOverlay = document.querySelector('.big-picture');
const bigPictureImage = bigPictureOverlay.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureOverlay.querySelector('.likes-count');
const bigPictureCaption = bigPictureOverlay.querySelector('.social__caption');
const bigPictureCommentsList = bigPictureOverlay.querySelector('.social__comments');
const commentsCount = bigPictureOverlay.querySelector('.social__comment-count');
const commentsShown = bigPictureOverlay.querySelector('.comments-shown');
const commentsQuantity = bigPictureOverlay.querySelector('.comments-count');
const commentsLoader = bigPictureOverlay.querySelector('.social__comments-loader');

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

const onCommentLoaderClick = (evt) => {
  evt.preventDefault();

  if (typeof loadMoreComments === 'function') {
    loadMoreComments();
  }
};

const hidePreviewOverlay = () => {
  loadMoreComments = null;

  document.body.classList.remove('modal-open');
  bigPictureOverlay.classList.add('hidden');
  commentsLoader.removeEventListener('click', onCommentLoaderClick);
};

const showPreviewOverlay = (photo) => {
  const { url, likes, description } = photo;

  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCaption.textContent = description;
  bigPictureCommentsList.innerHTML = '';

  const comments = photo.comments;

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

  bigPictureOverlay.classList.remove('hidden');
};

export {
  showPreviewOverlay,
  hidePreviewOverlay
};

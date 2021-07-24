const COMMENT_STEP = 5;

let commentsToShow = 0;
let loadMoreComments = null;

const bigPictureOverlay = document.querySelector('.big-picture');
const bigPictureImage = bigPictureOverlay.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureOverlay.querySelector('.likes-count');
const bigPictureCaption = bigPictureOverlay.querySelector('.social__caption');
const bigPictureCommentsList = bigPictureOverlay.querySelector('.social__comments');
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
    text.textContent = comment.message;

    fragment.appendChild(newComment);
  });

  return fragment;
};

function onCommentLoaderClick(evt)  {
  evt.preventDefault();

  loadMoreComments();
}

const showCommentsLoader = () => {
  commentsToShow = 0;
  commentsLoader.classList.remove('hidden');
  commentsLoader.addEventListener('click', onCommentLoaderClick);
};

const hideCommentsLoader = () => {
  commentsLoader.classList.add('hidden');
  commentsLoader.removeEventListener('click', onCommentLoaderClick);
};

const renderComments = (comments) => {
  const showedCount = commentsToShow + COMMENT_STEP > comments.length
    ? comments.length
    : commentsToShow + COMMENT_STEP;

  commentsShown.textContent = showedCount;
  commentsQuantity.textContent = comments.length;

  const nextShowedComments = comments.slice(commentsToShow, showedCount);
  bigPictureCommentsList.appendChild(renderPictureComments(nextShowedComments));

  if (showedCount >= comments.length) {
    hideCommentsLoader();
  }

  commentsToShow = showedCount;
};

const hidePreviewOverlay = () => {
  loadMoreComments = null;

  document.body.classList.remove('modal-open');
  bigPictureOverlay.classList.add('hidden');
};

const showPreviewOverlay = (photo) => {
  const { url, likes, description } = photo;

  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCaption.textContent = description;
  bigPictureCommentsList.innerHTML = '';

  const comments = photo.comments;

  showCommentsLoader();
  renderComments(comments);

  loadMoreComments = () => {
    renderComments(comments);
  };

  bigPictureOverlay.classList.remove('hidden');
};

export {
  showPreviewOverlay,
  hidePreviewOverlay
};

/**
 * Отрисовывет елементы по данным из моков
 * @param {function} getMocks - функция создающая моки
 */
const addPhotoMiniatures = (getMocks) => {
  const userPhotosList = document.querySelector('.pictures');
  const userPhotoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const userPhotos = getMocks();

  const userPhotosListFragment = document.createDocumentFragment();

  userPhotos.forEach(({url, likes, comments}) => {
    const photoElement = userPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    userPhotosListFragment.appendChild(photoElement);
  });

  userPhotosList.appendChild(userPhotosListFragment);
};

export {addPhotoMiniatures};

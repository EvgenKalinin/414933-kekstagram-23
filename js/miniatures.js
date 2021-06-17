const userPhotosList = document.querySelector('.pictures');
const userPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

/**
 * Отрисовывет елементы по данным
 * @param {array} userPhotos - получаемые данные
 */
const addPhotoMiniatures = (userPhotos) => {
  const userPhotosListFragment = document.createDocumentFragment();

  userPhotos.forEach(({url, likes, comments}) => {
    const photoItem = userPhotoTemplate.cloneNode(true);
    photoItem.querySelector('.picture__img').src = url;
    photoItem.querySelector('.picture__likes').textContent = likes;
    photoItem.querySelector('.picture__comments').textContent = comments.length;
    userPhotosListFragment.appendChild(photoItem);
  });

  userPhotosList.appendChild(userPhotosListFragment);
};

export {addPhotoMiniatures};

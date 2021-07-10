const userPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createMiniature = (photo, onClick) => {
  const {url, likes, comments} = photo;

  const photoItem = userPhotoTemplate.cloneNode(true);

  photoItem.querySelector('.picture__img').src = url;
  photoItem.querySelector('.picture__likes').textContent = likes;
  photoItem.querySelector('.picture__comments').textContent = comments.length;

  photoItem.addEventListener('click', (evt) => {
    evt.preventDefault();
    onClick(photo);
  });

  return photoItem;
};

export {createMiniature};

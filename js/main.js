import {createPostedPhotos} from './mocks.js';
import {addPhotoMiniatures} from './miniatures.js';

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
const bigPictureCommentsList = bigPictureOverlay.querySelectorAll('.social__comments');
const bigPictureComments = bigPictureOverlay.querySelectorAll('.social__comment');
// const bigPictureComment = bigPictureOverlay.querySelector('.social__comment');

// НЕ СРАБОТАЛА
// picturesList.addEventListener('click', (evt) => {
//   console.log(pictures.indexOf(evt.target));
// });

// {/* <li class="social__comment">
//     <img
//         class="social__picture"
//         src="{{аватар}}"
//         alt="{{имя комментатора}}"
//         width="35" height="35">
//     <p class="social__text">{{текст комментария}}</p>
// </li> */}


pictures.forEach((picture, i) => {
  picture.addEventListener('click', () => {
    console.log(i);
    bigPictureOverlay.classList.remove('hidden');
    bigPictureImage.src = userPhotos[i].url;
    bigPictureLikes.textContent = userPhotos[i].likes;
    bigPictureCaption.textContent = userPhotos[i].description;
    bigPictureComments.forEach((comment) => comment.remove());
    // Дальше не работает
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    newComment.innerHTML = '<p>test</p>';

    bigPictureCommentsList.appendChild(newComment);
  });
});

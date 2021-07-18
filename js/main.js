import {addPhotos} from './gallery.js';
import {addNewUserPhoto} from './form.js';
// import {createPostedPhotos} from './mocks.js';

import { getData } from './api.js';
import {showAlert} from './utils.js';


// const userPhotos = createPostedPhotos();

/*
setSorterBar((sortName) => {
  userPhotos(sortName);
});
**/

addNewUserPhoto();
// addPhotos(userPhotos);

getData((data) => {
  addPhotos(data);
},
() => showAlert('Упс! Что то пошло не так...'),
);



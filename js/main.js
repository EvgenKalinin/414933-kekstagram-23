import {addPhotos} from './gallery.js';
import {addNewUserPhoto} from './form.js';

import { getData } from './api.js';
import {showAlert} from './utils.js';

addNewUserPhoto();

getData((data) => {
  addPhotos(data);
},
() => showAlert('Упс! Что то пошло не так...'),
);



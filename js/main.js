import {addPhotos} from './gallery.js';
import {addNewUserPhoto} from './form.js';

import {createPostedPhotos} from './mocks.js';

const userPhotos = createPostedPhotos();

/*
setSorterBar((sortName) => {
  userPhotos(sortName);
});
**/

addNewUserPhoto();
addPhotos(userPhotos);

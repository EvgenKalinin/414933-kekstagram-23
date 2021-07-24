import { showFilters, setFilterChangeHandler } from './filter.js';
import { filterPhotos } from './sort.js';

import {addPhotos, removePhotos} from './gallery.js';
import {addNewUserPhoto} from './form.js';

import { getData } from './api.js';
import {showAlert} from './utils.js';

import './upload-user-picture.js';

addNewUserPhoto();
showFilters();

getData((photos) => {
  addPhotos(photos);

  setFilterChangeHandler((filterName) => {
    const filteredPhotos = filterPhotos(photos, filterName);

    removePhotos();
    addPhotos(filteredPhotos);
  });
},
() => showAlert('Упс! Что то пошло не так...'),
);

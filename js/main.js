import { showFilters, setFilterChangeHandler } from './filter.js';
import { filterPhotos } from './sort.js';

import {addPhotos, removePhotos} from './gallery.js';
import {addNewUserPhoto} from './form.js';

import { getData } from './api.js';
import {showAlert} from './utils.js';

addNewUserPhoto();
showFilters();

// sort.js
/*
По умолчанию — фотографии в изначальном порядке с сервера.
Случайные — 10 случайных, не повторяющихся фотографий.
Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
**/
// const RANDOM_PHOTO_COUNT = 10;

// const getRandomBoolean = () => Math.random() - 0.5;

// const filterToSorter = {
//   default: (photos) => photos.slice(),
//   random: (photos) => photos.slice().sort(getRandomBoolean).slice(0, RANDOM_PHOTO_COUNT),
//   discussed: (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length),
// };

// const filterPhotos = (photos, filterName) => filterToSorter[filterName](photos);

// main.js
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

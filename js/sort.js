const RANDOM_PHOTO_COUNT = 10;

const getRandomBoolean = () => Math.random() - 0.5;

const filterToSorter = {
  default: (photos) => photos.slice(),
  random: (photos) => photos.slice().sort(getRandomBoolean).slice(0, RANDOM_PHOTO_COUNT),
  discussed: (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length),
};

const filterPhotos = (photos, filterName) => filterToSorter[filterName](photos);

export {filterPhotos};

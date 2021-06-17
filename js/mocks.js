import {getRandomInt, getRandomArrayItem, getRandonIntArray} from './random.js';

// Моки

const PHOTO_DESCRIPTIONS = [
  'Как вам фото?',
  'Моё любимое фото! ^_^',
  'Best photo EVER!!!',
  'Ребята, строго не судите. Снимал на тапок.',
  'Все ставим лайк и добавляемся в друзья!',
];

const PHOTO_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

const PHOTOS_QUANTITY = 25;


/**
 * Создает моки пользовательских комментов
 * @returns {array}
 */
const createComments = () => {
  const commentIdNumbers = getRandonIntArray(1, 25);
  const commentQuantity = getRandomInt(0, 2);
  const comments = new Array(commentQuantity).fill(null);
  for (let j = 0; j <= commentQuantity; j++) {
    comments[j] = {
      id: commentIdNumbers[j],
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      comment: getRandomArrayItem(PHOTO_COMMENTS),
      name: `${getRandomArrayItem(NAMES)} ${getRandomArrayItem(SURNAMES)}`,
    };
  }
  return comments;
};


/**
 * Создает моки пользовательских фото
 * @param {number} quantity кол-во моков
 * @returns {array}
 */
const createPostedPhotos = (quantity = PHOTOS_QUANTITY) => {
  const idNumbers = getRandonIntArray(1, 25);
  const photoNumbers = getRandonIntArray(1, 25);
  const elements = new Array(quantity).fill(null);
  for (let i = 0; i <= elements.length-1; i++) {
    elements[i] = {
      id: idNumbers[i],
      url: `photos/${photoNumbers[i]}.jpg`,
      description: getRandomArrayItem(PHOTO_DESCRIPTIONS),
      likes: getRandomInt(15, 200),
      comments: createComments(),
    };
  }
  return elements;
};

export {createPostedPhotos};

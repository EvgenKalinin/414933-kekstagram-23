// Утилитарные функции

/**
 * Вернет целое число из диапазона включительно
 * @param {number} min Любое положительное число
 * @param {number} max Любое положительное число
 * @return {number}
 */
const getRandomInt = (min, max) => {
  if (min >= max || min < 0 || max < 0) {
    throw new Error('Введите корректные значения. Минимальное значение не может быть больше максимального. Значения должны быть положительными.');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Возвращает рандомный элемент массива.
 * @param {array} elements передаваемый массив
 * @returns {*} вернет случайный элемент
 */
const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length-1)];

/**
 * Проверяет максимальную длину строки
 * @param {string} string Проверяемая строка
 * @param {number} maxLength Максимальная длина строки
 * @return {boolean} Вернет true если строка меньше или равна максимальному кол-ву символов
 */
const isValidTextLength = (string, maxLength) => string.length <= maxLength;

/**
 * Перемешает элементы массива
 * @param {*} array
 * @return {*}
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

/**
 * Создает массив из чисел из диапазона в случайном порядке
 * @param {number} min минимальное значение
 * @param {number} max мксимальное значение
 * @returns {array}
 */
const getRandonIntArray = (min, max) => {
  let array = [];
  for (let i = min; i <= max; i++) {
    array.push(i);
  }
  array = shuffleArray(array);
  return array;
};


// Вызовы для Линтера
const SUPER_STRING = 'Darth Vader';
isValidTextLength(SUPER_STRING, 50);


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

const OBJECTS_QUANTITY = 25;


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
      comment: getRandomArrayElement(PHOTO_COMMENTS),
      name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`,
    };
  }
  return comments;
};


/**
 * Создает моки пользовательских фото
 * @param {number} quantity кол-во моков
 * @returns {array}
 */
const createPostedPhotos = (quantity) => {
  const idNumbers = getRandonIntArray(1, 25);
  const photoNumbers = getRandonIntArray(1, 25);
  const elements = new Array(quantity).fill(null);
  for (let i = 0; i <= elements.length-1; i++) {
    elements[i] = {
      id: idNumbers[i],
      url: `photos/${photoNumbers[i]}.jpg`,
      description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
      likes: getRandomInt(15, 200),
      comments: createComments(),
    };
  }
  return elements;
};

const postedPhotos = createPostedPhotos(OBJECTS_QUANTITY);
console.log(postedPhotos);


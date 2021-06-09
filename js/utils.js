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
 * @param {string} text Проверяемая строка
 * @param {number} maxLength Максимальная длина строки
 * @return {boolean} Вернет true если строка меньше или равна максимальному кол-ву символов
 */
const isValidTextLength = (text, maxLength) => text.length <= maxLength;

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
  let items = [];
  for (let i = min; i <= max; i++) {
    items.push(i);
  }
  items = shuffleArray(items);
  return items;
};

//Вызовы для линтера
isValidTextLength('goood text', 50);

export {getRandomInt, getRandomArrayElement, getRandonIntArray};

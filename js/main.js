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
 * Проверяет максимальную длину строки
 * @param {string} string Проверяемая строка
 * @param {number} maxLength Максимальная длина строки
 * @return {boolean} Вернет true если строка меньше или равная максимальному кол-ву символов
 */
const isValidStringLength = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};


// Вызовы для Линтера
getRandomInt(1, 100);

const SUPER_STRING = 'Darth Vader';
isValidStringLength(SUPER_STRING, 50);


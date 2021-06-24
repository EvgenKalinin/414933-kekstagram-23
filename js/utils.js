// Утилитарные функции

const KEYBOARD_KEYS = [
  'Escape',
  'Esc',
];

/**
 * Проверяет максимальную длину строки
 * @param {string} text Проверяемая строка
 * @param {number} maxLength Максимальная длина строки
 * @return {boolean} Вернет true если строка меньше или равна максимальному кол-ву символов
 */
const isValidTextLength = (text, maxLength) => text.length <= maxLength;

//Вызовы для линтера
isValidTextLength('goood text', 50);

/**
 * Слушает нажатие клавиши 'Esc'
 * @param {*} evt
 */
const isEscEvent = (evt) => KEYBOARD_KEYS.includes(evt.key);

export {isEscEvent};

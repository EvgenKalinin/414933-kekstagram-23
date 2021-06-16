// Утилитарные функции

/**
 * Проверяет максимальную длину строки
 * @param {string} text Проверяемая строка
 * @param {number} maxLength Максимальная длина строки
 * @return {boolean} Вернет true если строка меньше или равна максимальному кол-ву символов
 */
const isValidTextLength = (text, maxLength) => text.length <= maxLength;

//Вызовы для линтера
isValidTextLength('goood text', 50);

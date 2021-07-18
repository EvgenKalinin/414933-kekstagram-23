// Утилитарные функции

const KEYBOARD_KEYS = [
  'Escape',
  'Esc',
];
const ALERT_SHOW_TIME = 5000;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'black';
  alertContainer.style.fontWeight ='bold';
  alertContainer.style.backgroundColor = 'gold';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {isEscEvent, showAlert};

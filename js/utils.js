// Утилитарные функции

const KEYBOARD_KEYS = [
  'Escape',
  'Esc',
];
const ALERT_SHOW_TIME = 5000;

/**
 * Слушает нажатие клавиши 'Esc'
 * @param {*} evt
 */
const isEscEvent = (evt) => KEYBOARD_KEYS.includes(evt.key);

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  const style = alertContainer.style;
  style.zIndex = 100;
  style.position = 'absolute';
  style.left = 0;
  style.top = 0;
  style.right = 0;
  style.padding = '10px 3px';
  style.fontSize = '30px';
  style.textAlign = 'center';
  style.color = 'black';
  style.fontWeight ='bold';
  style.backgroundColor = 'gold';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {isEscEvent, showAlert};

import { isEscEvent } from './utils.js';

const MESSAGE_CLASSES = [
  'success__title',
  'success__inner',
  'error__title',
  'error__inner',
];

const MessageType = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

let messsageBlock = null;

const closeMessage = () => {
  if (messsageBlock !== null) {
    messsageBlock.remove();
    messsageBlock = null;
  }

  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageOutClick);
};

function onMessageEscKeydown(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    closeMessage();
  }
}

function onMessageOutClick (evt) {
  if (! MESSAGE_CLASSES.includes(evt.target.className)) {
    evt.preventDefault();

    closeMessage();
  }
}

const createShowMessage = (type) => () => {
  const template = type === MessageType.SUCCESS ? successMessageTemplate : errorMessageTemplate;
  messsageBlock = template.cloneNode(true);

  document.body.appendChild(messsageBlock);

  document.addEventListener('click', onMessageOutClick);
  document.addEventListener('keydown', onMessageEscKeydown);
};

const showSuccessMessage = createShowMessage(MessageType.SUCCESS);
const showErrorMessage = createShowMessage(MessageType.ERROR);

export {
  showSuccessMessage,
  showErrorMessage
};

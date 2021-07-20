import { onEffectListChange, hideSlider } from './effects.js';
import {isEscEvent} from './utils.js';
import { setScale, changeImageScale, MAX_SCALE_VALUE } from './scale.js';
import { setFormValidation } from './form-validation.js';
import { sendData } from './api.js';

const effectList = document.querySelector('.effects__list');
const pageBody = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const formOverlay = uploadForm.querySelector('.img-upload__overlay');
const formCancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('textarea');


const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showForm = () =>{
  formOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
};

const hideForm = () => {
  formOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadForm.reset();
};

const onFormEscKeydown = (evt) => {
  if (hashTagInput === document.activeElement || commentInput === document.activeElement) {
    return evt;
  }
  if (isEscEvent(evt)){
    evt.preventDefault();
    hideForm();
    document.removeEventListener('keydown', onFormEscKeydown);
  }
};

const onFormCancelButtonClick =(evt) => {
  evt.preventDefault();
  hideForm();

  formCancelButton.removeEventListener('click', onFormCancelButtonClick);
  document.removeEventListener('keydown', onFormEscKeydown);
};

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeSuccessMessage();
  }
};


const onSuccessMessageOutClick = (evt) => {
  const target = evt.target;
  if (
    !target.classList.contains('success__title') &&
    !target.classList.contains('success__inner')
  ) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeSuccessMessage();
  }
};

const onSuccessMessageButtonClick = (evt) => {
  evt.preventDefault();
  // eslint-disable-next-line no-use-before-define
  closeSuccessMessage();
};

const closeSuccessMessage = () => {
  const successMessage = document.querySelector('.success');

  if (successMessage) {
    successMessage.remove();
  }

  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', onSuccessMessageOutClick);
};

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  successMessage.querySelector('.success__button').addEventListener('click', onSuccessMessageButtonClick);

  document.body.appendChild(successMessage);

  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', onSuccessMessageOutClick);
};


const onSuccesFormSubmit = () => {
  hideForm();
  showSuccessMessage();
};

const onErrorMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    // eslint-disable-next-line no-use-before-define
    closeErrorMessage();
  }
};

const onErrorMessageOutClick = (evt) => {
  if (!errorMessageTemplate.contains(evt.target)) {
    evt.preventDefault();

    // eslint-disable-next-line no-use-before-define
    closeErrorMessage();
  }
};

const onErrorMessageButtonClick = (evt) => {
  evt.preventDefault();

  // eslint-disable-next-line no-use-before-define
  closeErrorMessage();
};

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  errorMessage.querySelector('.error__button').addEventListener('click', onErrorMessageButtonClick);

  document.body.appendChild(errorMessage);

  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorMessageOutClick);
};


const closeErrorMessage = () => {
  const errorMessage = document.querySelector('.error');

  if (errorMessage) {
    errorMessage.remove();
  }

  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('click', onErrorMessageOutClick);
};

const onErrorFormSubmit = () => {
  hideForm();
  showErrorMessage();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  sendData(
    onSuccesFormSubmit,
    onErrorFormSubmit,
    new FormData(evt.target),
  );
};

// Главная функция
const addNewUserPhoto = () => {
  uploadFile.addEventListener('change', () => {
    showForm();
    setScale(MAX_SCALE_VALUE);
    changeImageScale();
    hideSlider();
    effectList.addEventListener('change', onEffectListChange);
    setFormValidation();
    formCancelButton.addEventListener('click', onFormCancelButtonClick);
    document.addEventListener('keydown', onFormEscKeydown);

    uploadForm.addEventListener('submit', onUploadFormSubmit);
  });
};

export {addNewUserPhoto, uploadForm};

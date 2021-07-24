import { onEffectListChange, hideSlider } from './effects.js';
import { setScale, changeImageScale, MAX_SCALE_VALUE } from './scale.js';
import { setFormValidation } from './form-validation.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { isEscEvent } from './utils.js';
import { uploadUserPicture } from './upload-user-picture.js';

const effectList = document.querySelector('.effects__list');
const pageBody = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const formOverlay = uploadForm.querySelector('.img-upload__overlay');
const formCancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('textarea');

const showForm = () => {
  formOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  formCancelButton.addEventListener('click', onFormCancelButtonClick);
  document.addEventListener('keydown', onFormEscKeydown);
};

const hideForm = () => {
  formOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  uploadForm.reset();

  formCancelButton.removeEventListener('click', onFormCancelButtonClick);
  document.removeEventListener('keydown', onFormEscKeydown);
};

function onFormEscKeydown(evt) {
  if (
    hashTagInput === document.activeElement ||
    commentInput === document.activeElement
  ) {
    return;
  }

  if (isEscEvent(evt)){
    evt.preventDefault();

    hideForm();
  }
}

function onFormCancelButtonClick (evt) {
  evt.preventDefault();

  hideForm();

  formCancelButton.removeEventListener('click', onFormCancelButtonClick);
  document.removeEventListener('keydown', onFormEscKeydown);
}

const onSuccesFormSubmit = () => {
  hideForm();
  showSuccessMessage();
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

const addNewUserPhoto = () => {
  uploadFile.addEventListener('change', () => {
    uploadUserPicture();
    showForm();
    setScale(MAX_SCALE_VALUE);
    changeImageScale();
    hideSlider();
    effectList.addEventListener('change', onEffectListChange);
    setFormValidation();

    uploadForm.addEventListener('submit', onUploadFormSubmit);
  });
};

export {addNewUserPhoto, uploadForm, uploadFile};

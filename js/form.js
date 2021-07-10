import {isEscEvent} from './utils.js';
// import {pageBody} from './big-photo-overlay.js';
import { setScale, changeImageScale, currentScaleValue } from './scale.js';
import { setFormValidation } from './form-validation.js';

const pageBody = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const formOverlay = uploadForm.querySelector('.img-upload__overlay');
const formCancelButton = uploadForm.querySelector('.img-upload__cancel');

const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('textarea');

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

// Главная функция

const addNewUserPhoto = () => {
  uploadFile.addEventListener('change', () => {
    showForm();

    setScale(currentScaleValue);
    changeImageScale();

    setFormValidation();

    formCancelButton.addEventListener('click', onFormCancelButtonClick);
    document.addEventListener('keydown', onFormEscKeydown);
  });
};


export {addNewUserPhoto, uploadForm};

import {isEscEvent} from './utils.js';
import {pageBody} from './big-photo-overlay.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const formOverlay = uploadForm.querySelector('.img-upload__overlay');
const formCancelButton = uploadForm.querySelector('.img-upload__cancel');

const showForm = () =>{
  formOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
};

const hideForm = () => {
  formOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadForm.reset();
};

const onFormCancelButtonClick =(evt) => {
  evt.preventDefault();
  hideForm();
};

const onFormEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideForm();
  }
};

const onUploadButtonClick = () =>{
  showForm();
  formCancelButton.addEventListener('click', onFormCancelButtonClick);
  document.addEventListener('keydown', onFormEscKeydown);
};


// Главная функция

const addNewUserPhoto = () => {
  uploadFile.addEventListener('change', onUploadButtonClick);
  // document.removeEventListener('keydown', onFormEscKeydown);

  // formCancelButton.addEventListener('click', onFormCancelButtonClick);
  // document.addEventListener('keydown', onFormEscKeydown);
};


export {addNewUserPhoto};

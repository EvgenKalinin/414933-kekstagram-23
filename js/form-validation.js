const COMMENT_MAX_LENGHT = 140;
const HASHTAGS_MAX_QUANTITY = 5;
const ERROR_COLOR = 'red';
const DEFAULT_COLOR = 'black';

const ValidationErrorMessage = {
  REGEX: 'хэш-тег начинается с символа #. состоит из букв и чисел.  Не может состоять только из одной решётки. Максимальная длина одного хэш-тега 20 символов. хэш-теги разделяются пробелами.',
  REPEAT: 'Хэш-теги не должны повторяться',
  HASHTAGS_LENGTH: `Максимум ${HASHTAGS_MAX_QUANTITY} хэш-тегов`,
  COMMENT_LENGTH: `Максимум ${COMMENT_MAX_LENGHT} хэш-тегов`,
};
const hashTagRegEx = /^#[A-Za-zА-ЯЁа-яё0-9]{1,19}$/;
const hashTagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const formSubmitButton = document.querySelector('.img-upload__submit');

const setErrorCustomValidityOnField = (field, evt, message) => {
  field.setCustomValidity(message);
  field.style.outlineColor = ERROR_COLOR;
  evt.preventDefault();
};

const validateHashTagField = (evt) => {

  if (hashTagInput.value !== '') {

    const hashTags = hashTagInput.value.toLowerCase().split(' ');
    const noRepeatHashTags = new Set(hashTags);

    hashTags.forEach((hashTag) => {
      if (hashTagRegEx.test(hashTag) === false) {
        setErrorCustomValidityOnField(hashTagInput, evt, ValidationErrorMessage.REGEX);
      } else if (hashTags.length > noRepeatHashTags.size) {
        setErrorCustomValidityOnField(hashTagInput, evt, ValidationErrorMessage.REPEAT);
      } else if (hashTags.length > HASHTAGS_MAX_QUANTITY) {
        setErrorCustomValidityOnField(hashTagInput, evt, ValidationErrorMessage.HASHTAGS_LENGTH);
      } else  {
        hashTagInput.setCustomValidity('');
        hashTagInput.style.outlineColor = DEFAULT_COLOR;
      }

      hashTagInput.reportValidity();
    });

  }

};

const validateComment = (evt) => {
  if (commentInput.length > COMMENT_MAX_LENGHT) {
    setErrorCustomValidityOnField(commentInput, evt, ValidationErrorMessage.COMMENT_LENGTH);
  } else  {
    commentInput.setCustomValidity('');
    commentInput.style.outlineColor = DEFAULT_COLOR;
  }

  commentInput.reportValidity();
};

const setFormValidation = () => {
  formSubmitButton.addEventListener('click', (evt) => {
    validateHashTagField(evt);
    validateComment(evt);
  });
};

export {setFormValidation};

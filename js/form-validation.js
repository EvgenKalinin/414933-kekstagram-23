const COMMENT_MAX_LENGHT = 140;
const HASHTAGS_MAX_QUANTITY = 5;
const ERROR_COLOR = 'red';
const DEFAULT_COLOR = 'black';
const REGEX_VALIDATION_ERROR_MESSAGE = 'хэш-тег начинается с символа #. состоит из букв и чисел.  Не может состоять только из одной решётки. Максимальная длина одного хэш-тега 20 символов. хэш-теги разделяются пробелами.';
const REPEAT_VALIDATION_ERROR_MESSAGE = 'Хэш-теги не должны повторяться';
const HASHTAGS_LENGTH_VALIDATION_ERROR_MESSAGE = `Максимум ${HASHTAGS_MAX_QUANTITY} хэш-тегов`;
const COMMENT_LENGTH_VALIDATION_ERROR_MESSAGE = `Максимум ${COMMENT_MAX_LENGHT} хэш-тегов`;

const hashTagRegEx = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const hashTagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const formSubmitButton = document.querySelector('.img-upload__submit');

const setCustomValidityOnField = (field, evt, message) => {
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
        setCustomValidityOnField(hashTagInput, evt, REGEX_VALIDATION_ERROR_MESSAGE);
      } else if (hashTags.length > noRepeatHashTags.size) {
        setCustomValidityOnField(hashTagInput, evt, REPEAT_VALIDATION_ERROR_MESSAGE);
      } else if (hashTags.length > HASHTAGS_MAX_QUANTITY) {
        setCustomValidityOnField(hashTagInput, evt, HASHTAGS_LENGTH_VALIDATION_ERROR_MESSAGE);
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
    commentInput.setCustomValidity(COMMENT_LENGTH_VALIDATION_ERROR_MESSAGE);
    commentInput.style.outlineColor = ERROR_COLOR;
    evt.preventDefault();
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

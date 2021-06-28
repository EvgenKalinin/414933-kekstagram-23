const COMMENT_MAX_LENGHT = 140;
const HASHTAGS_MAX_QUANTITY = 5;
const ERROR_COLOR = 'red';
const DEFAULT_COLOR = 'black';
const REGEX_VALIDATION_ERROR_MESSAGE = 'хэш-тег начинается с символа #. состоит из букв и чисел.  Не может состоять только из одной решётки. Максимальная длина одного хэш-тега 20 символов. хэш-теги разделяются пробелами.';
const REPEAT_VALIDATION_ERROR_MESSAGE = 'Хэш-теги не должны повторяться';
const HASHTAGS_LENGTH_VALIDATION_ERROR_MESSAGE = `Максимум ${HASHTAGS_MAX_QUANTITY} хэш-тегов`;
const COMMENT_LENGTH_VALIDATION_ERROR_MESSAGE = `Максимум ${COMMENT_MAX_LENGHT} хэш-тегов`;

const hashTagRegEx = /^#[A-Za-zА-Яа-я]{1,19}$/;
const hashTagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const formSubmitButton = document.querySelector('.img-upload__submit');


const hashTagFieldValidation = (evt) => {
  const hashTags = hashTagInput.value.toLowerCase().split(' ');
  const noRepeatHashTags = new Set(hashTags);

  hashTags.forEach((hashTag) => {
    if (hashTagRegEx.test(hashTag) === false) {
      hashTagInput.setCustomValidity(REGEX_VALIDATION_ERROR_MESSAGE);
      hashTagInput.style.outlineColor = ERROR_COLOR;
      evt.preventDefault();
    } else if (hashTags.length > noRepeatHashTags.size) {
      hashTagInput.setCustomValidity(REPEAT_VALIDATION_ERROR_MESSAGE);
      hashTagInput.style.outlineColor = ERROR_COLOR;
      evt.preventDefault();
    } else if (hashTags.length > HASHTAGS_MAX_QUANTITY) {
      hashTagInput.setCustomValidity(HASHTAGS_LENGTH_VALIDATION_ERROR_MESSAGE);
      hashTagInput.style.outlineColor = ERROR_COLOR;
      evt.preventDefault();
    } else  {
      hashTagInput.setCustomValidity('');
      hashTagInput.style.outlineColor = DEFAULT_COLOR;
    }

    hashTagInput.reportValidity();
  });

};

const commentValidation = (evt) => {
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
    hashTagFieldValidation(evt);
    commentValidation(evt);
  });
};

export {setFormValidation};

// #pop #pip #pep #pap #pup #pyp

// var myString = 'Привет, мир. Как дела?';
// var splits = myString.split(' ', 3);
// console.log(splits);


// const arrayOfDuplicateElements = [ 'Pop', 'PUP', 'pip', 'pip', 'pip' ]
// const getNumberOfDuplicateItems = arr => arr.length - [...new Set(arr)].length
// console.log(getNumberOfDuplicateItems(arrayOfDuplicateElements))

// const yourArray = [1, 1, 2, 3, 4, 5, 5]

// const yourArrayWithoutDuplicates = new Set(yourArray)
// console.log(yourArrayWithoutDuplicates);

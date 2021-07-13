const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE =100;
let currentScaleValue = MAX_SCALE_VALUE;

const controlBigger = document.querySelector('.scale__control--bigger');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlValue = document.querySelector('.scale__control--value');
const imgPreviewContainer = document.querySelector('.img-upload__preview');
const imgPreview = imgPreviewContainer.querySelector('img');


const setScale = (currentValue) => {
  controlValue.value =  `${currentValue}%`;
  imgPreview.style.transform = `scale(${currentValue * 0.01})`;
};

const onControlBiggerClick = (evt) => {
  evt.preventDefault();

  if (currentScaleValue < MAX_SCALE_VALUE) {
    currentScaleValue = currentScaleValue + SCALE_STEP;
    setScale(currentScaleValue);
  }
};

const onControlSmallerClick = (evt) => {
  evt.preventDefault();

  if (currentScaleValue > MIN_SCALE_VALUE) {
    currentScaleValue = currentScaleValue - SCALE_STEP;
    setScale(currentScaleValue);
  }
};

const changeImageScale = () => {
  controlBigger.addEventListener('click', onControlBiggerClick);
  controlSmaller.addEventListener('click', onControlSmallerClick);
};

export {setScale, changeImageScale, MAX_SCALE_VALUE, currentScaleValue, imgPreview, imgPreviewContainer};

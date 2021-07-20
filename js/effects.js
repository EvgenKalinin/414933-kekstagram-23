import { imgPreview } from './scale.js';

const effectSlider = document.querySelector('.effect-level__slider');
const effectSliderValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.effect-level');

const EFFECTS = [
  {
    name: 'none',
    style: '',
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    unit:'',
  },
  {
    name: 'sepia',
    style: 'sepia',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    unit:'',
  },
  {
    name: 'marvin',
    style: 'invert',
    minValue: 0,
    maxValue: 100,
    step: 1,
    unit:'%',
  },
  {
    name: 'phobos',
    style: 'blur',
    minValue: 0,
    maxValue: 3,
    step: 0.1,
    unit:'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    minValue: 0,
    maxValue: 3,
    step: 0.1,
    unit:'',
  },
];

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0.2,
  step: 0.1,
  connect: 'lower',
});

let currentEffect = EFFECTS[0];

effectSlider.noUiSlider.on('update', (values, handle) => {
  effectSliderValue.value = values[handle];
  imgPreview.style.filter = `${currentEffect.style}(${effectSliderValue.value}${currentEffect.unit})`;
});

const setEffect = () => {
  sliderContainer.classList.remove('hidden');

  imgPreview.className = '';
  imgPreview.classList.add(`effects__preview--${currentEffect.style}`);

  effectSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.minValue,
      max: currentEffect.maxValue,
    },
    start: currentEffect.maxValue,
    step: currentEffect.step,
  });
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');

  imgPreview.className = '';
  imgPreview.style.filter = '';
};

const onEffectListChange = (evt) => {
  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);

  if (currentEffect === 'none') {
    hideSlider();
  } else {
    setEffect();
  }
};


export {onEffectListChange, hideSlider};

import { imgPreview } from './scale.js';

const effectSlider = document.querySelector('.effect-level__slider');
const effectSliderValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.effect-level');


const effects = [
  {
    name: 'none',
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


const setEffect = (effect) => {
  sliderContainer.classList.remove('hidden');
  // imgPreview.className = '';
  imgPreview.classList.remove(...[...imgPreview.classList].filter((n) => n.indexOf('effects__preview--') !== -1));
  imgPreview.classList.add(`effects__preview--${effect.style}`);

  effectSlider.noUiSlider.updateOptions({
    range: {
      min: effect.minValue,
      max: effect.maxValue,
    },
    start: effect.maxValue,
    step: effect.step,
  });

  effectSlider.noUiSlider.on('update', (values, handle) => {
    effectSliderValue.value = values[handle];
    imgPreview.style.filter = `${effect.style}(${effectSliderValue.value}${effect.unit})`;
  });
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');

  imgPreview.className = '';
  imgPreview.style.filter = '';
};

const onEffectListChange = (evt) => {
  const currentEffect = effects.find((effect) => effect.name === evt.target.value);

  if (currentEffect.name === 'none') {
    hideSlider();
  } else {
    setEffect(currentEffect);
  }

};


export {onEffectListChange, hideSlider};

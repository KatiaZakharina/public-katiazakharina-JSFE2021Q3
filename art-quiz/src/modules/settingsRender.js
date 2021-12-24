import settingsTemp from '../components/settings.html';
import { settings } from './settings';

export function settingsRender() {
  document.querySelector('#root').innerHTML = settingsTemp;
  document.body.classList.remove('cover');

  const volume = document.querySelector('.settings__volume');
  const timeMood = document.querySelector('.switcher');
  const timer = document.querySelector('.number-input__input');

  document.querySelector('.settings__arrow').addEventListener('click', () => {
    window.history.back();
  });

  function numberInput() {
    const inputCount = document.querySelector('.number-input__input');
    inputCount.step = 5;

    document.querySelector('.number-input__minus').addEventListener('click', () => {
      if (inputCount.disabled) return;
      inputCount.stepDown();
      settings.settings.timer = inputCount.value;
    });

    document.querySelector('.number-input__plus').addEventListener('click', () => {
      if (inputCount.disabled) return;
      inputCount.stepUp();
      settings.settings.timer = inputCount.value;
    });
  }

  numberInput();

  volume.addEventListener('input', () => {
    settings.settings.volume = volume.value;
  });
  timeMood.addEventListener('input', () => {
    settings.settings.timeMood = timeMood.checked;
  });
  timer.addEventListener('change', () => {
    settings.settings.timer = timer.value;
  });

  document.querySelector('[data-default]').addEventListener('click', () => {
    settings.setDefault();
  });
  document.querySelector('[data-save]').addEventListener('click', () => {
    window.history.back();
  });

  settings.setInputState();
}

function runnableTrack() {
  const inputEls = document.querySelectorAll('input[type="range"]');
  inputEls.forEach((inputEl) => {
    function getBackgroundSize(input) {
      const min = +input.min || 0;
      const max = +input.max || 100;
      const value = +input.value;

      const size = ((value - min) / (max - min)) * 100;

      return size;
    }

    function setBackgroundSize(input) {
      input.style.setProperty('--background-size', `${getBackgroundSize(input)}%`);
    }

    setBackgroundSize(inputEl);

    inputEl.addEventListener('input', () => setBackgroundSize(inputEl));
  });
}
export { runnableTrack };

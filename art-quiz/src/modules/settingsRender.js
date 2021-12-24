import settingsTemp from '../components/settings.html';
import settings from './settings';

function settingsRender() {
  document.querySelector('#root').innerHTML = settingsTemp;
  document.body.classList.remove('cover');

  const volume = document.querySelector('.settings__volume');
  const timeMood = document.querySelector('.switcher');
  const timer = document.querySelector('.number-input__input');

  document.querySelector('.settings__arrow').addEventListener('click', () => {
    window.history.back();
  });

  (function numberInput() {
    document.querySelectorAll('.number-input__minus').forEach((i) =>
      i.addEventListener('click', (e) => {
        if (!e.target.nextElementSibling.disabled) {
          e.target.nextElementSibling.step = 5;
          e.target.nextElementSibling.stepDown();
          settings.settings.timer = e.target.nextElementSibling.value;
        }
      })
    );

    document.querySelectorAll('.number-input__plus').forEach((i) =>
      i.addEventListener('click', (e) => {
        if (!e.target.previousElementSibling.disabled) {
          e.target.previousElementSibling.step = 5;
          e.target.previousElementSibling.stepUp();
          settings.settings.timer = e.target.previousElementSibling.value;
        }
      })
    );
  })();

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

  // runnableTrack();
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
export default settingsRender;

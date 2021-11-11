import settingsTemp from '../components/settings.html';

class Settings {
  constructor(obj) {
    this.volume = obj?.volume ?? 30;
    this.bTime = obj?.bTime ?? false;
    this.timer = obj?.timer ?? 0;
  }
  obj() {
    return {
      volume: this.volume,
      bTime: this.bTime,
      timer: this.timer,
    };
  }
}

function settings() {
  document.querySelector('#root').innerHTML = settingsTemp;
  document.body.classList.remove('cover');

  (function numberInput() {
    document.querySelectorAll('.number-input__minus').forEach(i =>
      i.addEventListener('click', e => {
        if (!e.target.nextElementSibling.disabled) {
          e.target.nextElementSibling.step = 5;
          e.target.nextElementSibling.stepDown();
        }
      }),
    );

    document.querySelectorAll('.number-input__plus').forEach(i =>
      i.addEventListener('click', e => {
        if (!e.target.previousElementSibling.disabled) {
          e.target.previousElementSibling.step = 5;
          e.target.previousElementSibling.stepUp();
        }
      }),
    );
  })();

  function runnableTrack() {
    const input = document.querySelectorAll('input[type="range"]');
    input.forEach(input => {
      function setBackgroundSize(input) {
        input.style.setProperty('--background-size', `${getBackgroundSize(input)}%`);
      }

      setBackgroundSize(input);

      input.addEventListener('input', () => setBackgroundSize(input));

      function getBackgroundSize(input) {
        const min = +input.min || 0;
        const max = +input.max || 100;
        const value = +input.value;

        const size = ((value - min) / (max - min)) * 100;

        return size;
      }
    });
  }
  runnableTrack();
}

export { Settings };
export default settings;

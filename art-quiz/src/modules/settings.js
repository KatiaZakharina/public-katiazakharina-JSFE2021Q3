import Timer from './timer';

class Settings {
  constructor(obj) {
    this.settings = {
      volume: obj?.volume ?? 30,
      timeMood: obj?.timeMood ?? false,
      timer: obj?.timer ?? 0,
    };
    this.timer = new Timer(this.settings.timer);
  }
  setInputState() {
    const volume = document.querySelector('.settings__volume');
    const timeMood = document.querySelector('.switcher');
    const timer = document.querySelector('.number-input__input');

    volume.value = settings.settings.volume;
    timeMood.checked = settings.settings.timeMood;
    timer.value = settings.settings.timeMood ? settings.settings.timer : 0;
    this.timer.setNewTime(this.settings.timer);
  }
  setDefault() {
    this.settings.volume = 30;
    this.settings.timeMood = false;
    this.settings.timer = 0;
    this.setInputState();
    // runnableTrack();
    this.timer.setNewTime(this.settings.timer);
  }
}
const settings = new Settings(JSON.parse(localStorage.getItem('settings')));
export default settings;

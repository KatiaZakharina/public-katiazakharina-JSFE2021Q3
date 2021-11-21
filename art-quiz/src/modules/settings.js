class Settings {
  constructor(obj) {
    this.settings = {
      volume: obj?.volume ?? 30,
      timeMood: obj?.timeMood ?? false,
      timer: obj?.timer ?? 0,
    };
  }
  setInputState() {
    console.log(settings.settings);
    const volume = document.querySelector('.settings__volume'),
      timeMood = document.querySelector('.switcher'),
      timer = document.querySelector('.number-input__input');

    volume.value = settings.settings.volume;
    timeMood.checked = settings.settings.timeMood;
    timer.value = settings.settings.timeMood ? settings.settings.timer : 0;
  }
  setDefault() {
    this.settings.volume = 30;
    this.settings.timeMood = false;
    this.settings.timer = 0;
    this.setInputState();
    runnableTrack();
  }
}
const settings = new Settings(JSON.parse(localStorage.getItem('settings')));
export default settings;

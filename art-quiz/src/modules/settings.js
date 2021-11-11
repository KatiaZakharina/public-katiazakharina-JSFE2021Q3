class Settings {
  constructor(obj) {
    this.volume = obj?.volume ?? 30;
    this.timeMood = obj?.timeMood ?? false;
    this.timer = obj?.timer ?? 0;
  }
  saveToLocalStorage() {
    return {
      volume: this.volume,
      timeMood: this.time.mood,
      timer: this.timer,
    };
  }
  get() {
    this.volume = volume.value;
    this.timeMood = timeMood.value;
    this.timer = timer.value;
  }
  set({}) {
    //localstorage
  }
}
const settings=new Settings();
export default settings;
export class Timer {
  constructor(time) {
    this.initial = time;
    this.time = time;
  }
  startTimer() {
    this.timeOutput = document.querySelector('.quiz__time');
    this.timeLine = document.querySelector('.quiz__timeline');
    this.interval = setInterval(() => {
      this.decrementTime();
      this.showTime();
    }, 1000);

    setTimeout(this.stopTimer, this.time * 1000, this.interval);
  }
  stopTimer(ID) {
    clearInterval(ID);
  }
  setNewTime(time) {
    this.time = time;
  }
  decrementTime() {
    this.time -= 1;
  }
  showTime() {
    const minutes = String(Math.floor(this.time / 60));
    const seconds = String(this.time - minutes).padStart(2, '0');
    this.timeOutput.textContent = `${minutes}:${seconds}`;
    this.timeLine.value = (this.time / this.initial) * 100;
    this.runnableTrack();
  }
  runnableTrack() {
    const inputs = document.querySelectorAll('input[type="range"]');
    inputs.forEach((input) => {
      function getBackgroundSize(inputEl) {
        const min = +inputEl.min || 0;
        const max = +inputEl.max || 100;
        const value = +inputEl.value;

        const size = ((value - min) / (max - min)) * 100;

        return size;
      }

      function setBackgroundSize(inputEl) {
        inputEl.style.setProperty('--background-size', `${getBackgroundSize(inputEl)}%`);
      }

      setBackgroundSize(input);

      input.addEventListener('input', () => setBackgroundSize(input));
    });
  }
}

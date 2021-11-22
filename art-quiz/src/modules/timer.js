class Timer {
  constructor(time) {
    this.initial = time;
    this.time = time;
  }
  startTimer() {
    console.log(this.time);

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
    this.time--;
  }
  showTime() {
    const minutes = String(~~(this.time / 60)),
      seconds = String(this.time - minutes).padStart(2, '0');
    this.timeOutput.textContent = `${minutes}:${seconds}`;
    this.timeLine.value = (this.time / this.initial) * 100;
    this.runnableTrack();
  }
  runnableTrack() {
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
}
export default Timer;

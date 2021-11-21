class Timer {
  constructor(time) {
    this.time = time;
  }
  startTimer() {
    this.timeOutput = document.querySelector('.quiz__time');
    this.interval = setInterval(() => {
      this.decrementTime();
      this.showTime();

      if (this.time === 0) {
        this.stopTimer();
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.interval);
  }
  decrementTime() {
    this.time--;
  }
  showTime() {
    const minutes = String(~~(this.time / 60)).padStart(2, '0'),
      seconds = String(this.time - minutes).padStart(2, '0');
    this.timeOutput.textContent = `${minutes}:${seconds}`;
  }
}
export default Timer;

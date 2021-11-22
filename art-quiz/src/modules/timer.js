class Timer {
  constructor(time) {
    this.time = time;
  }
  startTimer() {
    console.log(this.time);

    this.timeOutput = document.querySelector('.quiz__time');
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
  }
}
export default Timer;

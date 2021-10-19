/*
 * @prettier
 */
'use strict';
document.addEventListener('DOMContentLoaded', () => {
  //--time and date
  const time = document.querySelector('.time'),
    date = document.querySelector('.date');
  let dayPartName, randomNum;

  function getRandomNum() {
    randomNum = (~~(Math.random() * 20 + 1) + '').padStart(2, 0);
  }
  getRandomNum();
  function updateTime() {
    const dateNow = new Date();
    const currentTime = dateNow.toLocaleTimeString();
    time.textContent = currentTime;
    if (currentTime == '00:00:00') updateDate();
    if (
      currentTime == '04:00:00' ||
      currentTime == '10:00:00' ||
      currentTime == '17:00:00' ||
      currentTime == '23:00:00'
    ) {
      showGreeting();
    }
    setTimeout(updateTime, 1000);
  }
  updateTime();

  function updateDate() {
    const dateNow = new Date();
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    };
    const currentDate = dateNow.toLocaleDateString('en-US', options);
    date.textContent = currentDate;
  }
  updateDate();

  //--greeting

  const greeting = document.querySelector('.greeting'),
    nameField = document.querySelector('.name');

  function showGreeting() {
    greeting.textContent = `Good ${getTimeOfDay(new Date())}`;
  }
  showGreeting();

  function getTimeOfDay(date) {
    const dayPart = ['morning', 'day', 'evening', 'night'],
      hour = date.getHours();
    let active;
    if (hour > 4 && hour < 10) active = 0;
    else if (hour < 17) active = 1;
    else if (hour < 23) active = 2;
    else active = 3;
    dayPartName = dayPart[active];
    setBg();
    return dayPartName;
  }

  function setBg() {
    const bgNum = (randomNum + '').padStart(2, 0);
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayPartName}/${bgNum}.jpg`;
    img.onload = () => {
      document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayPartName}/${bgNum}.jpg')`;
    };
  }


  function getSlideNext() {
    randomNum < 20 ? randomNum++ : (randomNum = 1);
    setBg();
  }
  function getSlidePrev() {
    randomNum > 1 ? randomNum-- : (randomNum = 20);
    setBg();
  }

  const slidePrev = document.querySelector('.slide-prev'),
    slideNext = document.querySelector('.slide-next');

  slidePrev.addEventListener('click', getSlidePrev);
  slideNext.addEventListener('click', getSlideNext);

  function setLocalStorage() {
    localStorage.setItem('name', nameField.value);
  }
  window.addEventListener('beforeunload', setLocalStorage);

  function getLocalStorage() {
    if (localStorage.getItem('name')) {
      nameField.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage);

  //--slider
});

/*
 * @prettier
 */
'use strict';
document.addEventListener('DOMContentLoaded', () => {
  //--time and date
  const time = document.querySelector('.time'),
    date = document.querySelector('.date');

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

    function getTimeOfDay(date) {
      const dayPart = ['morning', 'day', 'evening', 'night'],
        hour = date.getHours();
      if (hour > 4 && hour < 10) return dayPart[0];
      else if (hour < 17) return dayPart[1];
      else if (hour < 23) return dayPart[2];
      else return dayPart[3];
    }
  }
  showGreeting();

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
});

//--slider

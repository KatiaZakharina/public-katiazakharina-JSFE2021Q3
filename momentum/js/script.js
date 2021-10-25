/*
 * @prettier
 */

//ToDo переделать state.toDo  в объект
//Ошибка погоды
import playList from './playList.js';

('use strict');
document.addEventListener('DOMContentLoaded', () => {
  //--setting
  const state = {
    language: 'en',
    photoSource: 'github',
    blocks: ['time', 'date', 'greeting', 'quote', 'weather', 'audio', 'todolist'],
    location: 'Minsk',
    toDo: [],
  };
  const dayEnPart = ['morning', 'day', 'evening', 'night'];

  const sourceSelect = document.querySelector('[data-source-select]'),
    langSelect = document.querySelector('[data-language-select]');

  function setLocalStorage() {
    localStorage.setItem('name', nameField.value);
    localStorage.setItem('source', state.photoSource);
    localStorage.setItem('lang', state.language);
    localStorage.setItem('blocks', JSON.stringify(state.blocks));
    localStorage.setItem('location', state.location);
    localStorage.setItem('toDo', JSON.stringify(state.toDo));
  }
  window.addEventListener('beforeunload', setLocalStorage);

  function getLocalStorage() {
    if (localStorage.getItem('name')) {
      nameField.value = localStorage.getItem('name');
      document.querySelector('.user-name').textContent = localStorage.getItem('name');
    }
    if (localStorage.getItem('source')) {
      state.photoSource = localStorage.getItem('source');
      sourceSelect.value = state.photoSource;
    }
    if (localStorage.getItem('lang')) {
      state.language = localStorage.getItem('lang');
      langSelect.value = state.language;
      translateApp();
    }
    if (localStorage.getItem('blocks')) {
      state.blocks = JSON.parse(localStorage.getItem('blocks'));
      showWidget();
      setSwitcher();
    }
    if (localStorage.getItem('location')) {
      state.location = localStorage.getItem('location');
      getWeather();
    }
    if (localStorage.getItem('toDo')) {
      state.toDo = JSON.parse(localStorage.getItem('toDo'));
      createToDo();
    }
  }
  window.addEventListener('load', getLocalStorage);

  function setSetting() {
    const switchers = document.querySelectorAll('.label-input'),
      settingOpenBtn = document.querySelector('[data-open]'),
      settingCloseBtn = document.querySelector('[data-close]'),
      settingEl = document.querySelector('.settings');

    settingOpenBtn.addEventListener('click', () => {
      settingOpenBtn.classList.add('visually-hidden');
      settingEl.classList.remove('visually-hidden');
    });
    settingCloseBtn.addEventListener('click', () => {
      settingOpenBtn.classList.remove('visually-hidden');
      settingEl.classList.add('visually-hidden');
    });

    switchers.forEach(switcher => {
      switcher.addEventListener('click', () => {
        switcher.parentElement.classList.toggle('active');
        let index = state.blocks.indexOf(switcher.dataset.input);
        if (index == -1) {
          state.blocks.unshift(switcher.dataset.input);
        } else {
          state.blocks.splice(index, 1);
        }
        showWidget();
      });
    });
    sourceSelect.addEventListener('change', () => {
      state.photoSource = sourceSelect.value.toLowerCase();
      setBg();
    });
    langSelect.addEventListener('change', () => {
      state.language = langSelect.value.toLowerCase();
      translateApp();
    });
  }
  setSetting();

  function translateSetting() {
    let blockOptions;
    const options = document.querySelectorAll('.item_options');
    if (state.language == 'en') {
      blockOptions = ['Time', 'Date', 'Greeting', 'Quote', 'Weather', 'Audio', 'ToDo list'];
    } else if (state.language == 'ru') {
      blockOptions = ['Время', 'Дата', 'Приветствие', 'Цитата', 'Погода', 'Музыка', 'Задачи'];
    }
    options.forEach((option, index) => {
      option.textContent = blockOptions[index];
    });
  }

  function showWidget() {
    const blocks = document.querySelectorAll('[data-element]');

    blocks.forEach(item => {
      item.style.visibility = 'hidden';
    });
    state.blocks.forEach(block => {
      document
        .querySelectorAll(`[data-element=${block}]`)
        .forEach(element => (element.style.visibility = 'visible'));
    });
  }
  function setSwitcher() {
    document.querySelectorAll('[data-input]').forEach(input => {
      input.parentElement.classList.remove('active');
      input.checked = false;
    });
    state.blocks.forEach(block => {
      let active = document.querySelector(`[data-input=${block}]`);
      if (active) {
        active.checked = true;
        active.parentElement.classList.add('active');
      }
    });
  }

  //--time and date
  const time = document.querySelector('.time'),
    date = document.querySelector('.date');

  let activePart = 0,
    randomNum,
    dayPart = ['morning', 'day', 'evening', 'night'],
    url;

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
    const dateOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    };
    const currentDate = dateNow.toLocaleDateString(state.language, dateOptions);
    date.textContent = currentDate;
  }
  updateDate();

  //--greeting

  const greeting = document.querySelector('.greeting'),
    nameField = document.querySelector('.name');

  nameField.addEventListener('change', () => {
    document.querySelector('.user-name').textContent = nameField.value;
  });

  function showGreeting(greetingHead = 'Good') {
    greeting.textContent = `${greetingHead} ${dayPart[getTimeOfDay()]},`;
  }
  showGreeting();

  function getTimeOfDay() {
    let date = new Date();
    let hour = date.getHours();
    let activePart;
    if (hour > 4 && hour < 10) activePart = 0;
    else if (hour < 17) activePart = 1;
    else if (hour < 23) activePart = 2;
    else activePart = 3;
    // dayPartName = dayPart[activePart];
    // setBg();
    return activePart;
  }
  setBg();
  function createUnsplashLink(query = dayEnPart[getTimeOfDay()]) {
    const UNSPLASH_ACCESS_KEY = '3hixX6c7HipvKrVHHIL_sCxRtDnngeAiJUvUvPUySMw';
    return `https://api.unsplash.com/photos/random?orientation=landscape&query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`;
  }

  async function getLinkToUnsplashImage() {
    const url = createUnsplashLink();
    const res = await fetch(url);
    const data = await res.json();
    const link = await data.urls.regular;
    return await link;
  }

  function createFlickrLink(query = dayEnPart[getTimeOfDay()]) {
    const FLICKR_ACCESS_KEY = '7ff6320ea5e1a8b7710aa02bad9765a8';
    return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_ACCESS_KEY}&tags=${query}&extras=url_l&format=json&nojsoncallback=1`;
  }

  async function getLinkToFlickrImage() {
    const url = createFlickrLink();
    const res = await fetch(url);
    const data = await res.json();
    const link = `https://farm${data.photos.photo[+randomNum].farm}.staticflickr.com/${
      data.photos.photo[+randomNum].server
    }/${data.photos.photo[+randomNum].id}_${data.photos.photo[+randomNum].secret}.jpg`;
    return link;
  }

  function setBg() {
    const bgNum = (randomNum + '').padStart(2, 0);
    const img = new Image();

    if (state.photoSource == 'github') {
      url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayEnPart[activePart]}/${bgNum}.jpg`;
      img.src = url;
      img.onload = () => {
        document.body.style.backgroundImage = `url(${url})`;
      };
    } else if (state.photoSource == 'unsplash') {
      getLinkToUnsplashImage()
        .then(data => {
          return (url = data);
        })
        .then(data => {
          img.src = data;
          img.onload = () => {
            document.body.style.backgroundImage = `url(${data})`;
          };
        });
    } else {
      getLinkToFlickrImage()
        .then(data => {
          return (url = data);
        })
        .then(data => {
          img.src = data;
          img.onload = () => {
            document.body.style.backgroundImage = `url(${data})`;
          };
        });
    }
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

  // ---weather
  const weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    weatherCity = document.querySelector('.city'),
    weatherHumidity = document.querySelector('.humidity'),
    weatherWindSpeed = document.querySelector('.wind-speed');

  weatherCity.addEventListener('input', () => {
    state.location = weatherCity.value;
    document.querySelector('.user-location').textContent = state.location;
  });

  function createWeatherLink(units = 'metric') {
    const WEATHER_KEY = 'be9776d511cff858ce4a6a4cc20a43bf';
    return `https://api.openweathermap.org/data/2.5/weather?q=${state.location}&lang=${state.language}&appid=${WEATHER_KEY}&units=${units}`;
  }
  async function getWeather(
    wind = 'Wind speed: ',
    windUnit = ' m/s',
    humidity = 'Humidity: ',
    error = 'Incorrect data!',
  ) {
    weatherCity.value = state.location;
    document.querySelector('.user-location').textContent = state.location;

    if (state.language == 'ru') {
      wind = 'Скорость ветра: ';
      windUnit = ' м/c';
      humidity = 'Влажность: ';
      error = 'Неправильные данные!';
    }

    if (state.location == 'Minsk' && state.language == 'ru') {
      state.location = 'Минск';
      weatherCity.value = state.location;
    }
    if (state.location == 'Минск' && state.language == 'en') {
      state.location = 'Minsk';
      weatherCity.value = state.location;
    }

    // const url = createWeatherLink();
    // const res = await fetch(url);
    // if (!res.ok) {
    //   document.querySelector('.weather-error').textContent = error;
    //   document.querySelector('.description-container').classList.add('visually-hidden');
    //   document.querySelector('.weather-icon').classList.add('visually-hidden');
    // } else {
    //   document.querySelector('.description-container').classList.remove('visually-hidden');
    //   document.querySelector('.weather-icon').classList.remove('visually-hidden');
    //   const data = await res.json();

    //   weatherIcon.className = 'weather-icon owf';
    //   weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    //   temperature.textContent = `${~~data.main.temp}°C`;
    //   weatherDescription.textContent = data.weather[0].description;
    //   weatherHumidity.textContent = wind + data.main.humidity + ' %';
    //   weatherWindSpeed.textContent = humidity + ~~data.wind.speed + windUnit;
    // }
  }
  getWeather();
  weatherCity.addEventListener('change', () => {
    state.location = weatherCity.value;
    getWeather();
  });

  //--quotes
  const quoteEl = document.querySelector('.quote'),
    authorEl = document.querySelector('.author'),
    changeQuoteBtn = document.querySelector('.change-quote');

  async function getQuotes() {
    const quotes = `db/data_${state.language}.json`;
    const res = await fetch(quotes);
    const data = await res.json();
    quoteEl.textContent = data[~~(data.length * Math.random())].text;
    authorEl.textContent = data[~~(data.length * Math.random())].author;
  }
  getQuotes();
  changeQuoteBtn.addEventListener('click', getQuotes);

  //--audio
  const audio = document.querySelector('.audio'),
    playPrevBtn = document.querySelector('.play-prev'),
    playNextBtn = document.querySelector('.play-next'),
    playBtn = document.querySelector('.play'),
    playListUl = document.querySelector('.play-list');
  let playNum = 0;

  playList.forEach(song => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = song.title;
    playListUl.append(li);
  });
  const playListSongs = document.querySelectorAll('.play-item');

  playBtn.addEventListener('click', () => {
    toggleAudio();
  });
  audio.addEventListener('ended', playNext);

  function playAudio() {
    audio.src = playList[playNum].src;
    audio.play();
    playBtn.classList.add('pause');
    playListSongs.forEach(song => song.classList.remove('item-active'));
    playListSongs[playNum].classList.add('item-active');
  }
  function toggleAudio() {
    if (audio.paused) {
      audio.play();
      playBtn.classList.toggle('pause');
    } else {
      audio.pause();
      playBtn.classList.toggle('pause');
    }
  }

  playPrevBtn.addEventListener('click', playPrev);
  playNextBtn.addEventListener('click', playNext);

  function playPrev() {
    playNum > 0 ? playNum-- : (playNum = playList.length - 1);
    audio.play();
    playAudio();
  }
  function playNext() {
    playNum < playList.length - 1 ? playNum++ : (playNum = 0);
    audio.play();
    playAudio();
  }

  (function audio() {
    const audioPlayer = document.querySelector('.audio-player');
    const audio = new Audio('assets/sounds/Aqua Caelestis.mp3');
    audio.addEventListener(
      'loadeddata',
      () => {
        audioPlayer.querySelector('.song-time .length').textContent = getTimeCodeFromNum(
          audio.duration,
        );
        audio.volume = 0.75;
      },
      false,
    );

    //click on timeline to skip around
    const timeline = audioPlayer.querySelector('.timeline');
    timeline.addEventListener(
      'click',
      e => {
        const timelineWidth = window.getComputedStyle(timeline).width;
        const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
        audio.currentTime = timeToSeek;
      },
      false,
    );

    //click volume slider to change volume
    const volumeSlider = audioPlayer.querySelector('.controls .volume-slider');
    volumeSlider.addEventListener(
      'click',
      e => {
        const sliderWidth = window.getComputedStyle(volumeSlider).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        audio.volume = newVolume;
        audioPlayer.querySelector('.controls .volume-percentage').style.width =
          newVolume * 100 + '%';
      },
      false,
    );

    //check audio percentage and update time accordingly
    setInterval(() => {
      const progressBar = audioPlayer.querySelector('.progress');
      progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
      audioPlayer.querySelector('.song-time .current').textContent = getTimeCodeFromNum(
        audio.currentTime,
      );
    }, 500);

    //toggle between playing and pausing on button click
    
    const playBtn = audioPlayer.querySelector('.controls .toggle-play');
    playBtn.addEventListener(
      'click',
      () => {
        if (audio.paused) {
          playBtn.classList.remove('song-play');
          playBtn.classList.add('song-pause');
          audio.play();
        } else {
          playBtn.classList.remove('song-pause');
          playBtn.classList.add('song-play');
          audio.pause();
        }
      },
      false,
    );

    audioPlayer.querySelector('.volume-button').addEventListener('click', () => {
      const volumeEl = audioPlayer.querySelector('.volume-container .volume');
      audio.muted = !audio.muted;
      if (audio.muted) {
        volumeEl.classList.remove('icono-volumeMedium');
        volumeEl.classList.add('icono-volumeMute');
      } else {
        volumeEl.classList.add('icono-volumeMedium');
        volumeEl.classList.remove('icono-volumeMute');
      }
    });

    //turn 128 seconds into 2:08
    function getTimeCodeFromNum(num) {
      let seconds = parseInt(num);
      let minutes = parseInt(seconds / 60);
      seconds -= minutes * 60;
      const hours = parseInt(minutes / 60);
      minutes -= hours * 60;

      if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
      return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }
  })();

  //---toDo
  function createToDo() {
    const toDoList = document.querySelector('.toDo-list'),
      toDoInput = document.querySelector('[data-toDo]');

    if (state.toDo.length) {
      console.log(state.toDo);
      state.toDo.forEach(value => createToDoLi(value));
    }

    toDoInput.addEventListener('change', e => {
      if (toDoInput.value.length) {
        state.toDo.unshift(toDoInput.value);
        createToDoLi(e.target.value);
        toDoInput.value = '';
      }
    });

    function createToDoLi(value) {
      const toDoLi = document.createElement('li');
      toDoLi.classList.add('toDo');
      toDoLi.innerHTML = `<button class="toDo-remove"><i class="far fa-times-circle"></i></button><span class="toDo-text">${value}</span><input class="toDo-check" type="checkbox" />`;
      toDoList.prepend(toDoLi);
      console.log(state.toDo);
    }
    toDoList.addEventListener('click', e => {
      if (e.target.classList.contains('toDo-remove')) {
        console.dir(e.target.parentElement);
        let index = state.toDo.indexOf(e.target.nextElementSibling.textContent);
        state.toDo.splice(index, 1);
        console.log(state.toDo);
        e.target.parentElement.remove();
      } else if (e.target.classList.contains('toDo-check')) {
        e.target.parentElement.classList.toggle('done');
      } else if (e.target.classList.contains('toDo')) {
        e.target.classList.toggle('done');
        if (e.target.lastChild.checked) e.target.lastChild.checked = false;
        else e.target.lastChild.checked = true;
      }
    });
  }
  createToDo();

  function translateToDo() {
    let question;
    if (state.language == 'en') {
      question = 'What is your main focus for today?';
    } else if (state.language == 'ru') {
      question = 'Какая Ваша главная цель на сегодня?';
    }
    document.querySelector('.toDo-title').textContent = question;
  }

  // --trsnslate
  function translateApp() {
    translateGreeting();
    getQuotes();
    updateDate();
    getWeather();
    translateSetting();
    translateToDo();
  }
  function translateGreeting() {
    if (state.language == 'ru') {
      dayPart = ['утро', 'день', 'вечер', 'ночи'];
      const greeting = getTimeOfDay() == 0 ? 'Доброе' : getTimeOfDay() == 3 ? 'Доброй' : 'Добрый';
      document.querySelector('.name').placeholder = 'имя';
      showGreeting(greeting);
    } else if (state.language == 'en') {
      dayPart = ['morning', 'day', 'evening', 'night'];
      document.querySelector('.name').placeholder = 'name';
      showGreeting();
    }
  }
});

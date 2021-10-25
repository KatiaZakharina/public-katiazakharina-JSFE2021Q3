/*
 * @prettier
 */

//ToDo переделать state.toDo  в объект
//Ошибка погоды
console.log('Пожалуйста, не проверяйте мою работу сегодня, я постараюсь ее доделать. Спасибо');

/*console.log(`
Ваша оценка - 154 балла 
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото 

2) Скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их 

Выполненные пункты:
1) время выводится в 24-часовом формате, например: 21:01:00 

2) время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) 

3) выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" 

4) текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь). Проверяется соответствие приветствия текущему времени суток 

5) пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется 
feedback: Имя также отображается в настройках
6) ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20). Проверяем, что при перезагрузке страницы фоновое изображение изменилось. Если не изменилось, перезагружаем страницу ещё раз 

7) изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.Изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) 

8) изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) 

9) при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем: 1) при загрузке и перезагрузке страницы 2) при открытой консоли браузера 3) при слишком частых кликах по стрелкам для смены изображения 

10) при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage 
feedback: Дополнительно отображается в настройках
11) для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API. Данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел 

12) выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) 

13) при загрузке страницы приложения отображается рандомная цитата и её автор 

14) при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) 

15) при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause 

16) при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play 

17) треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) 

18) трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем 

19) после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. 

20) добавлен прогресс-бар в котором отображается прогресс проигрывания 

21) при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека 

22) над прогресс-баром отображается название трека 
feedback: Надеюсь,что расположение под прогресс-баром не повлияет на оценку
23) отображается текущее и общее время воспроизведения трека 

24) есть кнопка звука при клике по которой можно включить/отключить звук 

25) добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука 

26) можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте 

27) переводится язык и меняется формат отображения даты 

28) переводится приветствие и placeholder 

29) переводится прогноз погоды в т.ч описание погоды и город по умолчанию 

30) переводится цитата дня т.е цитата отображается на текущем языке приложения. Сама цитата может быть другая 

31) переводятся настройки приложения, при переключении языка приложения в настройках, язык настроек тоже меняется 

32) в качестве источника изображений может использоваться Unsplash API 

33) в качестве источника изображений может использоваться Flickr API 
feedback: Работает, но очень медленно, и не смотря на запросы по времени суток выдает странные фото
34) в настройках приложения можно указать язык приложения (en/ru или en/be)  

35) в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API 

36) в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал 

37) настройки приложения сохраняются при перезагрузке страницы 

38) ToDo List - список дел (как в оригинальном приложении) или Список ссылок (как в оригинальном приложении) или Свой собственный дополнительный функционал, по сложности аналогичный предложенным 

`);*/

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

    const url = createWeatherLink();
    const res = await fetch(url);
    if (!res.ok) {
      document.querySelector('.weather-error').textContent = error;
      // document.querySelector('.description-container').classList.add('visually-hidden');
      document.querySelector('.description-container').style.display = 'none';
      // document.querySelector('.weather-icon').classList.add('visually-hidden');
      document.querySelector('.weather-icon').style.display = 'none';
    } else {
      document.querySelector('.description-container').classList.remove('visually-hidden');
      document.querySelector('.weather-icon').classList.remove('visually-hidden');
      const data = await res.json();

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${~~data.main.temp}°C`;
      weatherDescription.textContent = data.weather[0].description;
      weatherHumidity.textContent = wind + data.main.humidity + ' %';
      weatherWindSpeed.textContent = humidity + ~~data.wind.speed + windUnit;
    }
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

  function playAudio() {
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

    setInterval(() => {
      const progressBar = audioPlayer.querySelector('.progress');
      progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
      audioPlayer.querySelector('.song-time .current').textContent = getTimeCodeFromNum(
        audio.currentTime,
      );
    }, 500);

    const playBtn = document.querySelector('.play');
    playBtn.addEventListener(
      'click',
      () => {
        if (audio.paused) {
          audio.play();
          playBtn.classList.toggle('pause');
        } else {
          audio.pause();
          playBtn.classList.toggle('pause');
        }
      },
      false,
    );

    const playPrevBtn = document.querySelector('.play-prev'),
      playNextBtn = document.querySelector('.play-next'),
      songName = document.querySelector('.song-name'),
      playListUl = document.querySelector('.play-list');

    let playNum = 0;

    playList.forEach((song, index) => {
      const li = document.createElement('li');
      li.classList.add('play-item');
      if (!index) li.classList.add('item-active');
      li.textContent = song.title;
      playListUl.append(li);
    });
    const playListSongs = document.querySelectorAll('.play-item');

    audio.addEventListener('ended', playNext);

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
    function playAudio() {
      audio.src = playList[playNum].src;
      audio.play();
      playBtn.classList.add('pause');
      songName.textContent = playList[playNum].title;
      playListSongs.forEach(song => song.classList.remove('item-active'));
      playListSongs[playNum].classList.add('item-active');
    }

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

    function getTimeCodeFromNum(num) {
      let seconds = parseInt(num);
      let minutes = parseInt(seconds / 60);
      seconds -= minutes * 60;
      const hours = parseInt(minutes / 60);
      minutes -= hours * 60;

      if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
      return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }
  }
  playAudio();

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

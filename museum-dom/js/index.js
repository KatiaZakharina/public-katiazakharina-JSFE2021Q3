'use strict'
/**
 * @prettier
 */
window.addEventListener('DOMContentLoaded', () => {
  console.log(`
  Ваша оценка - 139 баллов 
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) если внутри слайда проигрывается видео с YouTube, клик по стрелке перелистывания слайдов или клик по буллету останавливает проигрывание видео 

2) если основное видео проигрывалось при перелистывании слайдера, проигрывание видео останавливается, прогресс бар сдвигается к началу, иконки "Play" на панели управления и по центру видео меняются на первоначальные 

3) время можно выбирать с 9:00 до 18:00 с интервалом в 30 минут 

4) валидация e-mail должна пропукать только адреса вида username@example.com, где: username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов; @ - символ собачки; example - домен первого уровня состоит минимум из 4 латинских букв; com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв 

5) валидация номера телефона: номер содержит только цифры; без разделения или с разделением на две или три цифры; разделение цифр может быть через дефис или пробел; с ограничением по количеству цифр не больше 10 цифр 

6) при попытке ввода в форму невалидного значения выводится предупреждение, например, "номер телефона может содержать только цифры" 

Частично выполненные пункты:
1) если видео с YouTube проигрывается, клик по кнопке Pause останавливает его проигрывание. Также проигрывание видео останавливается, если кликнуть по другому слайду или кнопке Play в центре другого слайда. В указанной ситуации другое видео должно запуститься, а текущее остановиться. Невозможно проигрывание нескольких YouTube видео одновременно 

2) есть возможность перелистывания слайдов с видео влево и вправо кликами по стрелкам. Слайды перелистываются по одному, при этом также меняется основное видео 

3) есть возможность перелистывания слайдов кликами по буллетам (кружочки внизу слайдера), при этом также меняется основное видео 

Выполненные пункты:
1) есть возможность перелистывания слайдов влево и вправо кликами по стрелкам 

2) есть возможность перелистывания слайдов влево и вправо свайпами (движениями) мышки 

3) есть возможность перелистывания слайдов кликами по буллетам (квадратики внизу слайдера) 

4) слайды перелистываются плавно с анимацией смещения вправо или влево 

5) перелистывание слайдов бесконечное (зацикленное) 

6) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) 

7) при перелистывании слайдов кликами или свайпами меняется номер активного слайда 

8) даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда 

9) при клике по самому слайду или кнопке Play в центре слайда, внутри слайда проигрывается видео с YouTube. Никакие изменения с основным видео при этом не происходят 

10) слайды перелистываются плавно с анимацией смещения вправо или влево (для смены основного видео анимация смещения не требуется и не проверяется) 

11) перелистывание слайдов бесконечное (зацикленное) 

12) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) 

13) даже при частых кликах по стрелкам нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда 

14) при клике по кнопке "Play" слева внизу на панели видео начинается проигрывание видео, иконка кнопки при этом меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Повторный клик на кнопку останавливает проигрывание видео, иконка меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается 

15) при клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Клик на видео, которое проигрывается, останавливает проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается 

16) прогресс-бар отображает прогресс проигрывания видео 

17) перетягивание ползунка прогресс-бара позволяет изменить время с которого проигрывается видео 

18) если прогресс-бар перетянуть до конца, видео останавливается, соответственно, меняется внешний вид кнопок "Play" 

19) при клике на иконку динамика происходит toggle звука и самой иконки (звук включается или выключается, соответственно изменяется иконка) 

20) при перемещении ползунка громкости звука изменяется громкость видео 

21) если ползунок громкости звука перетянуть до 0, звук выключается, иконка динамика становится зачеркнутой 

22) если при выключенном динамике перетянуть ползунок громкости звука от 0, звук включается, иконка громкости перестаёт быть зачёркнутой 

23) при нажатии на кнопку fullscreen видео переходит в полноэкранный режим, при этом видео и панель управления разворачиваются во весь экран. При нажатии на кнопку fullscreen повторно видео выходит из полноэкранного режима. Нажатие на клавишу для выхода из полноэкранного режима Esc не проверяем и не оцениваем 

24) панель управления в полноэкранном режиме визуально выглядит так же, как на макете - кнопки равномерно распределены по всей ширине страницы, относительные размеры между кнопками и ползунками, а также относительные размеры самих кнопок остались прежними 

25) клавиша Пробел — пауза, при повторном нажатии - play 

26) Клавиша M (англ) — отключение/включение звука 

27) Клавиша F — включение/выключение полноэкранного режима 

28) Клавиши SHIFT+, (англ) — ускорение воспроизведения ролика 

29) Клавиши SHIFT+. (англ) — замедление воспроизведения ролика 

30) ползунок можно перетягивать мышкой по горизонтали 

31) ползунок никогда не выходит за границы картины 

32) при перемещении ползунка справа налево плавно появляется нижняя картина 

33) при перемещении ползунка слева направо плавно появляется верхняя картина 

34) при обновлении страницы ползунок возвращается в исходное положение 

35) при прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания. В качестве образца анимации используйте анимацию на сайте Лувра https://www.louvre.fr/ 

36) если прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется 

37) при обновлении страницы, если она к тому моменту была прокручена до секции Galery, анимация картин повторяется 

38) при изменении количества билетов Basic и Senior пересчитывается общая цена за них 

39) у каждого типа билетов своя цена (20 €, 25 €, 40 € для Basic и половина этой стоимости для Senior). При изменении типа билета пересчитывается общая цена за них 

40) при обновлении страницы сохраняется выбранное ранее количество билетов Basic и Senior, выбранный тип билета, общая цена за них 

41) когда при клике по кнопке Buy now открывается форма, она уже содержит данные, указанные на странице сайта - количество билетов, их тип, общая цена за них 

42) когда пользователь выбирает дату в форме слева, она отображается в билете справа 

43) нельзя выбрать дату в прошлом 

44) когда пользователь выбирает время в форме слева, оно отображается в билете справа 

45) можно изменить тип билета в поле Ticket type слева при этом меняется тип билета, цена билета и общая стоимость билетов справа 

46) можно изменить количество билетов каждого типа в поле слева при этом меняется количество билетов и общая стоимость билетов справа 

47) валидация имени пользователя. Имя пользователя должно содержать от 3 до 15 символов, в качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы 

48) в секции Contacts добавлена интерактивная карта 

49) на карте отображаются маркеры, расположение и внешний вид маркеров соответствует макету 

50) стиль карты соответствует макету 

51) Любой собственный дополнительный функционал, улучшающий качество проекта. Например, ночная тема, плавная смена изображений в блоке Tickets, всплывающее окно с информацией про картины и их авторов, кнопка прокрутки страницы вверх, возможность проголосовать за понравившиеся картины с сохранением данных в local storage, всё зависит от вашей фантазии и чувства вкуса. Для удобства проверки выполненный вами дополнительный функционал включите в самооценку, которую выведите в консоль браузера 
feedback: Добавленна темная тема

  `);

  let theme = 'light';
  //--dark theme
  document.querySelector('.header_theme-icon').addEventListener('click', () => {
    theme == 'light' ? darkTheme() : lightTheme();
  });
  function darkTheme() {
    document.documentElement.style.setProperty('--theme-light', '#000');
    document.documentElement.style.setProperty('--theme-dark', '#fff');
    document.documentElement.style.setProperty('--theme-bg-light', '#030303');
    document.documentElement.style.setProperty('--theme-gold', '#fff');
    document.documentElement.style.setProperty('--theme-border', '#fff');
    // createMap();
    theme = 'dark';
  }

  function lightTheme() {
    document.documentElement.style.setProperty('--theme-light', '#fff');
    document.documentElement.style.setProperty('--theme-dark', '#000');
    document.documentElement.style.setProperty('--theme-bg-light', '#fff');
    document.documentElement.style.setProperty('--theme-gold', '#9d8665');
    document.documentElement.style.setProperty('--theme-border', '#000');
    // createMap();
    theme = 'light';
  }

  (function slider() {
    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.slider__slide'),
      prev = document.querySelector('.slider__prev'),
      next = document.querySelector('.slider__next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.slider__wrapper'),
      width = window.getComputedStyle(slidesWrapper).width,
      slidesField = document.querySelector('.slider__inner'),
      indicators = document.querySelector('.slider__carousel-indicators');

    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
    } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.2s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
      slide.style.width = width;
    });

    const dots = [];
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('slider__carousel-dot');

      if (i == 0) {
        dot.style.backgroundColor = '#D2B183';
      }
      indicators.append(dot);
      dots.push(dot);
    }

    next.addEventListener('click', showNext);
    function showNext() {
      if (offset == parseFloat(slides[0].style.width) * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += +width.slice(0, width.length - 2);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach(dot => (dot.style.backgroundColor = '#ffffff'));
      dots[slideIndex - 1].style.backgroundColor = '#D2B183';
    }

    prev.addEventListener('click', showPrev);
    function showPrev() {
      if (offset <= 0) {
        offset = 0;
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
      } else {
        offset -= +width.slice(0, width.length - 2);
        offset = offset.toFixed(3);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach(dot => (dot.style.backgroundColor = '#ffffff'));
      dots[slideIndex - 1].style.backgroundColor = '#D2B183';
    }

    dots.forEach(dot => {
      dot.addEventListener('click', e => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = +width.slice(0, width.length - 2) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
        } else {
          current.textContent = slideIndex;
        }

        dots.forEach(dot => (dot.style.backgroundColor = '#ffffff'));
        dots[slideIndex - 1].style.backgroundColor = '#D2B183';
      });
    });

    const slider = document.querySelector('.welcome__slider');

    let touchStart = null,
      touchPosition = null,
      sensitivity = 10;

    slider.addEventListener('mousedown', e => {
      mouseStart(e);
    });
    slider.addEventListener('mousemove', e => {
      mouseMove(e);
    });
    slider.addEventListener('mouseup', e => {
      TouchEnd(e);
    });

    slider.addEventListener('touchstart', e => {
      TouchStart(e);
    });
    slider.addEventListener('touchmove', e => {
      TouchMove(e);
    });
    slider.addEventListener('touchend', e => {
      TouchEnd(e);
    });
    slider.addEventListener('touchcancel', e => {
      TouchEnd(e);
    });

    function mouseStart(e) {
      touchStart = { x: e.clientX, y: e.clientY };
      touchPosition = { x: touchStart.x, y: touchStart.y };
    }

    function mouseMove(e) {
      touchPosition = { x: e.clientX, y: e.clientY };
    }

    function TouchStart(e) {
      touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
      touchPosition = { x: touchStart.x, y: touchStart.y };
    }

    function TouchMove(e) {
      touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }

    function TouchEnd(e) {
      CheckAction();
      touchStart = null;
      touchPosition = null;
    }

    function CheckAction() {
      let diff = {
        x: touchStart.x - touchPosition.x,
        y: touchStart.y - touchPosition.y,
      };

      if (Math.abs(diff.x) > Math.abs(diff.y)) {
        if (Math.abs(diff.x) > sensitivity) {
          if (diff.x > 0) {
            showNext();
          } else {
            showPrev();
          }
        }
      }
    }
  })();

  //--------------------------before-after
  (function compare() {
    const slider = document.querySelector('.compare__slider');
    const before = document.querySelector('.compare__before-image');
    const beforeImage = before.querySelector('.compare__img');
    const after = document.querySelector('.compare__after-image');
    const afterImage = after.querySelector('.compare__img');
    const resizer = document.querySelector('.resizer');

    let active = false;

    let width = slider.offsetWidth;
    beforeImage.style.width = width + 'px';
    afterImage.style.width = width + 'px';
    resizer.style.height;

    //Adjust width of image on resize
    window.addEventListener('resize', function () {
      let width = slider.offsetWidth;
      beforeImage.style.width = width + 'px';
      afterImage.style.width = width + 'px';
    });

    resizer.addEventListener('mousedown', function () {
      active = true;
      resizer.classList.add('resize');
    });

    document.body.addEventListener('mouseup', function () {
      active = false;
      resizer.classList.remove('resize');
    });

    document.body.addEventListener('mouseleave', function () {
      active = false;
      resizer.classList.remove('resize');
    });

    document.body.addEventListener('mousemove', function (e) {
      if (!active) return;
      let x = e.pageX;
      x -= slider.getBoundingClientRect().left;
      slideIt(x);
      pauseEvent(e);
    });

    resizer.addEventListener('touchstart', function () {
      active = true;
      resizer.classList.add('resize');
    });

    document.body.addEventListener('touchend', function () {
      active = false;
      resizer.classList.remove('resize');
    });

    document.body.addEventListener('touchcancel', function () {
      active = false;
      resizer.classList.remove('resize');
    });

    //calculation for dragging on touch devices
    document.body.addEventListener('touchmove', function (e) {
      if (!active) return;
      let x;

      let i;
      for (i = 0; i < e.changedTouches.length; i++) {
        x = e.changedTouches[i].pageX;
      }

      x -= slider.getBoundingClientRect().left;
      slideIt(x);
      pauseEvent(e);
    });

    function slideIt(x) {
      let transform = Math.max(0, Math.min(x, slider.offsetWidth));
      before.style.width = transform + 'px';
      resizer.style.left = transform - 0 + 'px';
    }

    //stop divs being selected.
    function pauseEvent(e) {
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      e.returnValue = false;
      return false;
    }
  })();

  //----------------------------------------Video
  (function video() {
    const video = document.querySelector('.player__video'),
      rangeTime = document.querySelectorAll('.player__range-time'),
      rangeVolume = document.querySelector('.player__range-volume'),
      playButton = document.querySelector('.player__play-button'),
      expandButton = document.querySelector('.player__expand-button'),
      volumeButton = document.querySelector('.player__volume-button'),
      playButtonWrapper = document.querySelector('.player__wrapper');

    video.volume = 0.5;
    volumeButton.addEventListener('click', toggleVolume);

    function toggleVolume() {
      if (video.muted) {
        video.muted = false;
        volumeButton.src = 'assets/svg/volume.svg';
        rangeVolume.value = video.volume || 0.5;
        video.volume = rangeVolume.value;
      } else {
        video.muted = true;
        volumeButton.src = 'assets/svg/novolume.svg';
        rangeVolume.value = 0;
      }
    }

    playButtonWrapper.addEventListener('click', toggleBigButton);
    video.addEventListener('click', toggleBigButton);
    playButton.addEventListener('click', toggleBigButton);

    function toggleBigButton() {
      if (video.paused) {
        video.play();
        playButtonWrapper.classList.remove('player__wrapper-before');
        playButton.src = 'assets/svg/stop.svg';
      } else {
        video.pause();
        playButtonWrapper.classList.add('player__wrapper-before');
        playButton.src = 'assets/svg/play.svg';
      }
    }

    expandButton.addEventListener('click', toggleFullScreen);
    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.querySelector('.video__player').requestFullscreen();
        document.querySelector('.player__video').style.height = '83vh';
      } else {
        document.exitFullscreen();
        document.querySelector('.player__video').style.height = '650px';
      }
    }

    rangeTime.forEach(i => i.setAttribute('min', 0));
    video.addEventListener('loadedmetadata', function () {
      rangeTime.forEach(i => {
        i.setAttribute('max', video.duration);
        i.setAttribute('value', video.duration * 0.54);
        runnableTrack();
      });
    });

    rangeTime.forEach(i => {
      i.addEventListener('input', function () {
        video.currentTime = i.value;
      });
    });

    rangeTime.forEach(i =>
      i.addEventListener(
        'input',
        function () {
          video.currentTime = i.value;
        },
        false,
      ),
    );

    function runnableTrack() {
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
    runnableTrack();

    video.addEventListener('playing', () => {
      setInterval(() => {
        rangeTime.forEach(i => (i.value = video.currentTime));
        runnableTrack();
      }, 10);
    });

    video.addEventListener(
      'ended',
      function () {
        video.currentTime = 0;
        rangeTime.forEach(i => (i.value = 0));
        video.load();
        playButton.src = 'assets/svg/play.svg';
      },
      false,
    );

    rangeVolume.addEventListener(
      'input',
      function () {
        video.muted = false;
        video.volume = rangeVolume.value;
        if (video.volume == 0) {
          volumeButton.src = 'assets/svg/novolume.svg';
          video.muted = true;
        } else {
          volumeButton.src = 'assets/svg/volume.svg';
          video.muted = false;
        }
      },
      false,
    );
    function keyboardControl() {
      document.addEventListener('keydown', function (event) {
        if (document.documentElement.getBoundingClientRect().y >= -6140) {
          if (event.code == 'Space') {
            event.preventDefault();
            toggleBigButton();
          }
          if (event.code == 'KeyM') {
            event.preventDefault();
            toggleVolume();
          }
          if (event.code == 'KeyF') {
            toggleFullScreen();
          }
          if (event.code == 'Comma' && event.shiftKey && !video.paused) {
            video.playbackRate += 0.25;
            showVideoSpeed();
          }
          if (
            event.code == 'Period' &&
            event.shiftKey &&
            video.playbackRate >= 0.5 &&
            !video.paused
          ) {
            video.playbackRate -= 0.25;
            showVideoSpeed();
          }
        }

        function showVideoSpeed() {
          playButtonWrapper.innerHTML = '';
          playButtonWrapper.classList.add('player__wrapper-before');
          playButtonWrapper.style.backgroundImage = 'none';
          let speed = document.createElement('span');
          speed.classList.add('video__speed');
          speed.classList.add('hiddenAnimation');
          speed.innerText = video.playbackRate;
          playButtonWrapper.append(speed);
          setTimeout(() => {
            playButtonWrapper.innerHTML = '';
            playButtonWrapper.style.backgroundImage = 'url(../assets/svg/play-big.svg)';
            playButtonWrapper.classList.remove('player__wrapper-before');
          }, 1500);
        }
      });
    }
    keyboardControl();
  })();

  // new Splide

  new Splide('.splide', {
    type: 'loop',
    perPage: 3,
    focus: 'center',
  }).mount();

  function videoSlider() {
    let vslides = document.querySelectorAll('.vslider__video-item'),
      prev = document.querySelectorAll('.splide__arrow--prev')[0],
      next = document.querySelectorAll('.splide__arrow--next')[0];

    let currentSlide = 0;

    prev.addEventListener('click', () => {
      if (currentSlide == 5) currentSlide = -1;
      currentSlide++;
      changeMainVideo();
    });
    next.addEventListener('click', () => {
      if (currentSlide == 0) currentSlide = 6;
      currentSlide--;
      changeMainVideo();
    });
    function changeMainVideo() {
      video.src = `assets/video/video${currentSlide}.mp4`;
    }

    vslides.forEach(videoSlide => {
      videoSlide.addEventListener('click', () => {
        // console.log('d');
      });
    });
  }
  videoSlider();

  (function bookTickets() {
    const SENIOR_BENEFIT = 0.5,
      BASIC_BENEFIT = 1;
    const ticketsType = document.querySelectorAll('.booking__radio'),
      basicTickets = document.querySelector('#basic-input'),
      seniorTickets = document.querySelector('#senior-input'),
      ticketsTotal = document.querySelector('.booking__data-total'),
      reservationBasic = document.querySelector('.reservation__basic'),
      reservationSenior = document.querySelector('.reservation__senior'),
      overviewBasic = document.querySelector('.tickets-number_basic'),
      overviewSenior = document.querySelector('.tickets-number_senior'),
      typeSelect = document.querySelector('.reservation__select'),
      reservationDate = document.querySelector('.reservation__date'),
      reservationTime = document.querySelector('.reservation__time'),
      overviewDateOutput = document.querySelector('.overview__date-output'),
      overviewTimeOutput = document.querySelector('.overview__time-output'),
      overviewTypeOutput = document.querySelector('.overview__type-output'),
      overviewTotalBasic = document.querySelector('.tickets-cost-basic'),
      overviewTotalSenior = document.querySelector('.tickets-cost-senior'),
      overviewTotalSum = document.querySelector('.overview__total-sum');
      let radioIndex,
      type;

    if (sessionStorage.length) {
      basicTickets.value = +sessionStorage.getItem('basicNumber');
      seniorTickets.value = +sessionStorage.getItem('seniorNumber');
      ticketsType[+sessionStorage.getItem('typeIndex')].setAttribute('checked', 'checked');

      calculateTotal();
      setReservationData();
    }

    (function numberInput() {
      document.querySelectorAll('.number-input__minus').forEach(i =>
        i.addEventListener('click', e => {
          e.target.nextElementSibling.stepDown();
          calculateTotal();
          if (i.classList.contains('booking__number-value')) {
            setReservationData();
          } else updateData();
        }),
      );

      document.querySelectorAll('.number-input__plus').forEach(i =>
        i.addEventListener('click', e => {
          e.target.previousElementSibling.stepUp();
          calculateTotal();
          if (i.classList.contains('booking__number-value')) {
            setReservationData();
          } else updateData();
        }),
      );
    })();

    ticketsType.forEach(i =>
      i.addEventListener('click', () => {
        calculateTotal();
        setReservationData();
      }),
    );

    function calculateTotal() {
      ticketsType.forEach((i, index) => {
        if (i.checked) {
           type = i.getAttribute('data-cost');
           radioIndex = index;
        }
      });

      let totalSum =
        (basicTickets.value * BASIC_BENEFIT + seniorTickets.value * SENIOR_BENEFIT) * type;
      if (totalSum) ticketsTotal.innerText = totalSum;

      sessionStorage.setItem('typeIndex', radioIndex);
      sessionStorage.setItem('basicNumber', basicTickets.value);
      sessionStorage.setItem('seniorNumber', seniorTickets.value);
    }

    function setReservationData() {
      reservationBasic.value = basicTickets.value;
      reservationSenior.value = seniorTickets.value;
      overviewBasic.value = reservationBasic.value;
      overviewSenior.value = reservationSenior.value;
      typeSelect.options.selectedIndex = radioIndex + 1;
      document
        .querySelectorAll('.overview__basic-price')
        .forEach(i => (i.innerText = type * BASIC_BENEFIT));
      document
        .querySelectorAll('.overview__senior-price')
        .forEach(i => (i.innerText = type * SENIOR_BENEFIT));
      updateData();
    }
    calculateTotal();
    setReservationData();

    let today = new Date(Date.now()),
      dd = today.getDate(),
      mm = today.getMonth() + 1,
      yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = yyyy + '-' + dd + '-' + mm;
    reservationDate.min = today;

    reservationDate.addEventListener('input', updateData);
    reservationTime.addEventListener('input', updateData);
    typeSelect.addEventListener('input', updateData);

    function updateData() {
      let date = new Date(reservationDate.value);
      if (reservationDate.value && date > Date.now())
        overviewDateOutput.value = date.toDateString();
      if (reservationTime.value) overviewTimeOutput.value = reservationTime.value;
      overviewTypeOutput.value = typeSelect.value;
      overviewBasic.value = reservationBasic.value;
      overviewSenior.value = reservationSenior.value;
      type = ticketsType[typeSelect.options.selectedIndex - 1].getAttribute('data-cost');
      overviewTotalBasic.value = reservationBasic.value * type * BASIC_BENEFIT + ' €';
      overviewTotalSenior.value = reservationSenior.value * type * SENIOR_BENEFIT + ' €';
      overviewTotalSum.value =
        (BASIC_BENEFIT * reservationBasic.value + SENIOR_BENEFIT * reservationSenior.value) * type +
        ' €';
      document
        .querySelectorAll('.overview__basic-price')
        .forEach(i => (i.innerText = type * BASIC_BENEFIT));
      document
        .querySelectorAll('.overview__senior-price')
        .forEach(i => (i.innerText = type * SENIOR_BENEFIT));
    }
  })();

  //------ripple effect

  (function buttonClick() {
    let btn = document.querySelector('.ripple');
    function ripple(e) {
      e.preventDefault();
      let posX = this.offsetLeft;
      let posY = this.offsetTop;
      let buttonWidth = this.offsetWidth;
      let buttonHeight = this.offsetHeight;

      let ripple = document.createElement('span');
      ripple.classList.add('ripple__span');

      this.appendChild(ripple);

      if (buttonWidth >= buttonHeight) {
        buttonHeight = buttonWidth;
      } else {
        buttonWidth = buttonHeight;
      }

      var x = e.pageX - posX - buttonWidth / 2;
      var y = e.pageY - posY - buttonHeight / 2;

      ripple.style.width = `${buttonWidth}px`;
      ripple.style.height = `${buttonHeight}px`;
      ripple.style.top = `${y}px`;
      ripple.style.left = `${x}px`;

      ripple.classList.add('rippleAnimation');

      setTimeout(() => {
        this.removeChild(ripple);
      }, 1000);
    }

    btn.addEventListener('click', ripple);
  })();

  createModal('a-nav', true, true);
  createModal('reservation');

  //-------modal
  function createModal(elementName, scroolBehavior = false, changeTrigger = false) {
    const modalTrigger = document.querySelectorAll(`[data-${elementName}][data-modal]`),
      modal = document.querySelector(`[data-${elementName}][data-modal-window]`),
      modalContainer = document.querySelector(`[data-${elementName}].modal__container`),
      modalCloseBtn = document.querySelector(`[data-${elementName}][data-close]`);

    modalTrigger.forEach(btn => {
      btn.addEventListener('click', () =>
        changeTrigger && btn.classList.contains('data-close') ? hideModal() : showModal(),
      );
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideModal);

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        hideModal();
      }
    });
    document.addEventListener('keydown', e => {
      if (e.code == 'Escape' && modal.classList.contains('show')) {
        hideModal();
      }
    });

    //---------------adaptive nav
    function changeModalTrigger() {
      const trigger = document.querySelector(`[data-${elementName}][data-trigger]`),
        img = document.querySelector(`[data-${elementName}][data-trigger-image]`);
      if (trigger.classList.contains('data-open')) {
        img.src = 'assets/svg/nav-close.svg';
        trigger.classList.toggle('data-open');
        trigger.classList.toggle('data-close');
      } else {
        img.src = 'assets/svg/nav-open.svg';
        trigger.classList.toggle('data-open');
        trigger.classList.toggle('data-close');
      }
    }

    if (elementName == 'a-nav') {
      const navLinks = document.querySelectorAll('.a-nav__item');
      navLinks.forEach(i => i.addEventListener('click', hideModal));
    }

    function showModal() {
      modal.classList.add('show');
      modalContainer.classList.add('fadeIn');
      modal.classList.remove('hide');
      modalContainer.classList.remove('fadeOut');
      if (scroolBehavior) document.body.style.overflow = 'hidden';
      if (changeTrigger) changeModalTrigger();
      // if(elementName=='a-nav')
      document.querySelector('.welcome__info').classList.add('welcome__info_md_hide');
    }

    function hideModal() {
      modalContainer.classList.remove('fadeIn');
      modalContainer.classList.add('fadeOut');
      setTimeout(() => {
        modal.classList.add('hide');
        modal.classList.remove('show');
      }, 1000);
      if (scroolBehavior) document.body.style.overflow = '';
      if (changeTrigger) changeModalTrigger();
      // if(elementName=='a-nav')
      document.querySelector('.welcome__info').classList.remove('welcome__info_md_hide');
    }
  }

  //----------------------gallery
  AOS.init({
    delay: 300,
    duration: 1000,
    targetSelector: '.gallery',
  });

  (function appendGalleryImages() {
    const gallery = document.querySelector('.picture__inner');
    let random = severalRandom(1, 15, 15);

    for (let i = 0; i < 15; i++) {
      let img = document.createElement('img');
      img.classList.add('picture__item');

      img.setAttribute('data-aos', 'fade-up');
      img.setAttribute('data-aos-anchor-placement', 'top-bottom');

      img.setAttribute('alt', 'picture');
      img.src = `assets/img/galery/galery${random[i]}.jpg`;
      gallery.append(img);
    }

    function severalRandom(min, max, num) {
      let i,
        arr = [],
        res = [];

      for (i = min; i <= max; i++) arr.push(i);
      for (i = 0; i < num; i++) res.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
      return res;
    }
  })();

  let scrollRef = 0;

  window.addEventListener('scroll', function () {
    //aus bug solution
    scrollRef <= 10 ? scrollRef++ : AOS.refresh();
  });

  //------map

  function createMap() {
    const apiKey =
      'pk.eyJ1IjoiYWxmcmVkMjAxNiIsImEiOiJja2RoMHkyd2wwdnZjMnJ0MTJwbnVmeng5In0.E4QbAFjiWLY8k3AFhDtErA';

    const mymap = L.map('map').setView([48.86091, 2.3364], 17);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        maxZoom: 18,
        id: `mapbox/${theme}-v10`,
        tileSize: 512,
        zoomOffset: -1,
        accessToken: apiKey,
      },
    ).addTo(mymap);

    var myIcon = L.icon({
      iconUrl: './assets/img/maps-and-flags.png',
      iconSize: [35, 35],
    });

    const mainMarker = L.marker([48.86091, 2.3364], { icon: myIcon }).addTo(mymap);
    document.querySelectorAll('.leaflet-marker-icon').forEach(i => (i.style.opacity = 0.4));

    // Adding Marker
    let mapPopup = [
      [48.8602, 2.3333],
      [48.8607, 2.3397],
      [48.8619, 2.333],
      [48.8625, 2.3365],
    ];
    mapPopup.forEach(point => {
      const marker = L.marker(point, { icon: myIcon }).addTo(mymap);
    });
  }
  createMap();
});

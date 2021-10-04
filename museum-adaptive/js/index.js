window.addEventListener('DOMContentLoaded', () => {
  console.log(`
  Ваша оценка - 159 баллов 
  Отзыв по пунктам ТЗ:

  Частично выполненные:
  45) кнопке "Book" в форме покупки билетов добавлен ripple-эффект. Демо: https://50projects50days.com/projects/button-ripple-effect/ 
  feedback: Добавлен не к той кнопке😅 (Buy Now)


  Выполненные пункты:
  1) Вёрстка валидная. Для проверки валидности вёрстки используйте сервис https://validator.w3.org/. Валидной вёрстке соответствует надпись "Document checking completed. No errors or warnings to show." 
  
  2) header, main, footer 
  
  3) семь элементов section (по количеству секций) 
  
  4) только один заголовок h1 
  
  5) семь заголовков h2 (по количеству секций) 
  
  6) шесть заголовков h3 (по количеству карточек) 
  
  7) два элемента nav (основная и вспомогательная панель навигации) 
  
  8) три списка ul > li > a (основная и вспомогательная панель навигации, ссылки на соцсети) 
  
  9) тринадцать кнопок button (четыре из них в секции Video, пять в секции Tickets, по две - стрелки слайдера и плейлиста) 
  
  10) три тега input type="radio" (в секции Tickets) 
  
  11) два тега input type="number"(в секции Tickets) 
  
  12) два тега input type="range" (громкось и прогрес-бар видео) 
  
  13) для всех элементов img указан обязательный атрибут alt 
  
  14) блок header 
  
  15) секция Welcome 
  
  16) секция Visiting 
  
  17) секция Explore 
  
  18) секция Video 
  
  19) секция Gallery 
  
  20) секция Tickets 
  
  21) секция Contacts 
  
  22) блок footer 
  
  23) форма плавно выдвигается слева при открытии и плавно возвращается назад при закрытии. В открытом состоянии под формой есть полупрозрачный overlay, который занимает весь экран. Форма и overlay прокручиваются вместе со страницей 
  
  24) форма открывается при клике по кнопке Buy Now в секции Tickets и закрывается кликом по иконке с крестиком в верхнем правом углу или кликом по overlay 
  
  25) при вёрстке формы используются следующие элементы: form, input type="date", input type="time", input type="text", input type="email", input type="tel", input type="number", select 
  
  26) вёрстка формы соответствует макету 
  
  27) добавлен favicon 
  
  28) для построения сетки используются флексы или гриды 
  
  29) при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону 
  
  30) фоновый цвет каждого блока и секции тянется на всю ширину страницы 
  
  31) иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления 
  
  32) расстояние между буквами, там, где это требуется по макету, регулируется css-свойством letter-spacing 
  
  33) переключаются радиокнопки в блоке Tickets, одновременно может быть выбрана только одна кнопка 
  
  34) в блоке Contacts правильно указанны ссылки на почту mailto и на телефон tel 
  
  35) в футере добавлены ссылки на соцсети. Круглая граница вокруг иконок соцсетей выполнена при помощи css 
  
  36) плавная прокрутка по якорям 
  
  37) параллакс 
  
  38) при кликам по кнопке Discover the Louvre и карточкам секции Visiting открываются полноэкранные панорамы Google Street View встроенные в страницы вашего сайта при помощи iframe 
  
  39) изменение стиля интерактивных элементов при наведении и клике. Интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты – изменение цвета фона или шрифта, появление подчёркивания и т.д. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили, если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета 
  
  40) обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы 
  
  41) интерактивность при наведении карточек в секции Visiting предусматривает плавное растягивание подчёркивания заголовка карточки на всю ширину карточки 
  
  42) интерактивность при наведении иконок социальных сетей в футере предусматривает изменение цвета иконки и круглой границы вокруг иконки на золотистый 
  
  43) можно передвигать ползунки громкости и прогресс-бара видео, при этом цвет шкалы до и после ползунка отличается и соответствует макету 
  
  44) кликами по кнопкам + и - в секции Tiskets можно менять количество билетов Basic и Senior от 0 до 20 
  
  46) при перезагрузке (обновлении) страницы картины в блоке Galery отображаются в рандомном порядке 
 
  `);

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
    slidesField.style.transition = '0.5s all';

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

    next.addEventListener('click', () => {
      if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
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
    });

    prev.addEventListener('click', () => {
      if (offset == 0) {
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
      } else {
        offset -= +width.slice(0, width.length - 2);
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
    });

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
    resizer.style.height


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
      rangeTime = document.querySelector('.player__range-time'),
      rangeVolume = document.querySelector('.player__range-volume'),
      playButton = document.querySelector('.player__play-button'),
      expandButton = document.querySelector('.player__expand-button'),
      volumeButton = document.querySelector('.player__volume-button'),
      playButtonWrapper = document.querySelector('.player__wrapper');

    playButtonWrapper.addEventListener('click', () => {
      playButtonWrapper.classList.remove('player__wrapper-before');
      playButton.src = 'assets/svg/stop.svg';
      video.play();
    });

    video.addEventListener('click', () => {
      playButtonWrapper.classList.add('player__wrapper-before');
      playButton.src = 'assets/svg/play.svg';
      video.pause();
    });

    video.volume = 0.5;
    volumeButton.addEventListener('click', e => {
      if (video.muted) {
        video.muted = false;
        e.target.src = 'assets/svg/volume.svg';
        rangeVolume.value = video.volume || 0.5;
        video.volume = rangeVolume.value;
      } else {
        video.muted = true;
        e.target.src = 'assets/svg/novolume.svg';
        rangeVolume.value = 0;
      }
    });

    playButton.addEventListener('click', e => {
      if (video.paused) {
        video.play();
        playButtonWrapper.classList.remove('player__wrapper-before');
        playButton.src = 'assets/svg/stop.svg';
      } else {
        video.pause();
        playButtonWrapper.classList.add('player__wrapper-before');
        playButton.src = 'assets/svg/play.svg';
      }
    });

    expandButton.addEventListener('click', () => {
      video.requestFullscreen();
    });

    rangeTime.setAttribute('min', 0);
    video.addEventListener('loadedmetadata', function () {
      rangeTime.setAttribute('max', video.duration);
      rangeTime.setAttribute('value', video.duration * 0.54);
      runnableTrack();
    });

    rangeTime.addEventListener('input', function () {
      video.currentTime = rangeTime.value;
    });

    rangeTime.addEventListener(
      'input',
      function () {
        video.currentTime = rangeTime.value;
      },
      false,
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
        rangeTime.value = video.currentTime;
        runnableTrack();
      }, 10);
    });

    video.addEventListener(
      'ended',
      function () {
        video.currentTime = 0;
        rangeTime.value = 0;
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
  })();
  // new Splide

  // new Splide('.splide', {
  //   arrowPath: '../assets/video/arrow.svg',
  //   type: 'loop',
  //   perPage: 3,
  //   focus: 'center',
  // }).mount();

  (function numberInput() {
    document.querySelectorAll('.number-input__minus').forEach(i =>
      i.addEventListener('click', e => {
        e.target.nextElementSibling.stepDown();
      }),
    );

    document.querySelectorAll('.number-input__plus').forEach(i =>
      i.addEventListener('click', e => {
        e.target.previousElementSibling.stepUp();
      }),
    );
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

  createModal('a-nav', true,true);
  createModal('reservation');

  //-------modal
  function createModal(elementName, scroolBehavior=false, changeTrigger=false) {
    const modalTrigger = document.querySelectorAll(`[data-${elementName}][data-modal]`),
      modal = document.querySelector(`[data-${elementName}][data-modal-window]`),
      modalContainer = document.querySelector(`[data-${elementName}].modal__container`),
      modalCloseBtn = document.querySelector(`[data-${elementName}][data-close]`);

    modalTrigger.forEach(btn => {
      btn.addEventListener('click', ()=>changeTrigger&&btn.classList.contains('data-close')?hideModal():showModal());
    });

    if(modalCloseBtn) modalCloseBtn.addEventListener('click', hideModal);

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
  function changeModalTrigger(){
    const trigger=document.querySelector(`[data-${elementName}][data-trigger]`),
          img=document.querySelector(`[data-${elementName}][data-trigger-image]`)
      if(trigger.classList.contains('data-open')){
        img.src='assets/svg/nav-close.svg';
        trigger.classList.toggle('data-open');
        trigger.classList.toggle('data-close');
      } else{
        img.src='assets/svg/nav-open.svg';
        trigger.classList.toggle('data-open');
        trigger.classList.toggle('data-close');
      }
  };

    function showModal() {
      modal.classList.add('show');
      modalContainer.classList.add('fadeIn');
      modal.classList.remove('hide');
      modalContainer.classList.remove('fadeOut');
      if(scroolBehavior) document.body.style.overflow = 'hidden';
      if(changeTrigger) changeModalTrigger();
      if(elementName=='a-nav') document.querySelector('.welcome__info').classList.add='welcome__info_md_hide';
    }

    function hideModal() {
      modalContainer.classList.remove('fadeIn');
      modalContainer.classList.add('fadeOut');
      setTimeout(() => {
        modal.classList.add('hide');
        modal.classList.remove('show');
      }, 1000);
      if(scroolBehavior) document.body.style.overflow = '';
      if(changeTrigger) changeModalTrigger();
      if(elementName=='a-nav') document.querySelector('.welcome__info').classList.remove='welcome__info_md_hide';
    }

  };



  //----------------------gallery
  (function appendGalleryImages() {
    const gallery = document.querySelector('.picture__inner');
    let random = severalRandom(1, 15, 15);
    for (let i = 0; i < 15; i++) {
      let img = document.createElement('img');
      img.classList.add('picture__item');
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
});

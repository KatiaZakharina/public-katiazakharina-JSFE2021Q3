import { Splide } from '@splidejs/splide';

import AOS from 'aos';

import 'mapbox.js';

import './css/normalize.css';
import './css/style.css';

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

  const slides = document.querySelectorAll('.slider__slide') as NodeListOf<HTMLElement>,
    prev = document.querySelector('.slider__prev'),
    next = document.querySelector('.slider__next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.slider__wrapper') as HTMLElement,
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector('.slider__inner') as HTMLElement,
    indicators = document.querySelector('.slider__carousel-indicators');

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = String(slides.length);
    current.textContent = String(slideIndex);
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.2s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  const dots: HTMLElement[] = [];
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', String(i + 1));
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
      current.textContent = String(slideIndex);
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
      offset = +offset.toFixed(3);
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
      current.textContent = String(slideIndex);
    }

    dots.forEach(dot => (dot.style.backgroundColor = '#ffffff'));
    dots[slideIndex - 1].style.backgroundColor = '#D2B183';
  }

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = (e.target as HTMLElement).getAttribute('data-slide-to');

      slideIndex = +slideTo;
      offset = +width.slice(0, width.length - 2) * (+slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = String(slideIndex);
      }

      dots.forEach(dot => (dot.style.backgroundColor = '#ffffff'));
      dots[slideIndex - 1].style.backgroundColor = '#D2B183';
    });
  });

  const slider = document.querySelector('.welcome__slider');

  type TouchCoordinate = { x: number; y: number } | null;
  let touchStart: TouchCoordinate = null,
    touchPosition: TouchCoordinate = null,
    sensitivity = 10;

  slider.addEventListener('mousedown', e => {
    mouseStart(e as MouseEvent);
  });
  slider.addEventListener('mousemove', e => {
    mouseMove(e as MouseEvent);
  });
  slider.addEventListener('mouseup', e => {
    TouchEnd(e as TouchEvent);
  });

  slider.addEventListener('touchstart', e => {
    TouchStart(e as TouchEvent);
  });
  slider.addEventListener('touchmove', e => {
    TouchMove(e as TouchEvent);
  });
  slider.addEventListener('touchend', e => {
    TouchEnd(e as TouchEvent);
  });
  slider.addEventListener('touchcancel', e => {
    TouchEnd(e as TouchEvent);
  });

  function mouseStart(e: MouseEvent) {
    touchStart = { x: e.clientX, y: e.clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };
  }

  function mouseMove(e: MouseEvent) {
    touchPosition = { x: e.clientX, y: e.clientY };
  }

  function TouchStart(e: TouchEvent) {
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };
  }

  function TouchMove(e: TouchEvent) {
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  }

  function TouchEnd(e: TouchEvent) {
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
  const slider = document.querySelector('.compare__slider') as HTMLElement;
  const before = document.querySelector('.compare__before-image') as HTMLElement;
  const beforeImage = before.querySelector('.compare__img') as HTMLElement;
  const after = document.querySelector('.compare__after-image') as HTMLElement;
  const afterImage = after.querySelector('.compare__img') as HTMLElement;
  const resizer = document.querySelector('.resizer') as HTMLElement;

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

  function slideIt(x: number) {
    let transform = Math.max(0, Math.min(x, slider.offsetWidth));
    before.style.width = transform + 'px';
    resizer.style.left = transform - 0 + 'px';
  }

  //stop divs being selected.
  function pauseEvent(e: Event) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  }
})();

//----------------------------------------Video
(function video() {
  const video = document.querySelector('.player__video') as HTMLVideoElement,
    rangeTime = document.querySelectorAll('.player__range-time') as NodeListOf<HTMLInputElement>,
    rangeVolume = document.querySelector('.player__range-volume') as HTMLInputElement,
    playButton = document.querySelector('.player__play-button') as HTMLImageElement,
    expandButton = document.querySelector('.player__expand-button'),
    volumeButton = document.querySelector('.player__volume-button') as HTMLImageElement,
    playButtonWrapper = document.querySelector('.player__wrapper') as HTMLElement;

  video.volume = 0.5;
  volumeButton.addEventListener('click', toggleVolume);

  function toggleVolume() {
    if (video.muted) {
      video.muted = false;
      volumeButton.src = 'assets/svg/volume.svg';
      rangeVolume.value = String(video.volume || 0.5);
      video.volume = +rangeVolume.value;
    } else {
      video.muted = true;
      volumeButton.src = 'assets/svg/novolume.svg';
      rangeVolume.value = String(0);
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
      (document.querySelector('.player__video') as HTMLElement).style.height = '83vh';
    } else {
      document.exitFullscreen();
      (document.querySelector('.player__video') as HTMLElement).style.height = '650px';
    }
  }

  rangeTime.forEach(i => i.setAttribute('min', String(0)));
  video.addEventListener('loadedmetadata', function () {
    rangeTime.forEach(i => {
      i.setAttribute('max', String(video.duration));
      i.setAttribute('value', String(video.duration * 0.54));
      runnableTrack();
    });
  });

  rangeTime.forEach(i => {
    i.addEventListener('input', function () {
      video.currentTime = +i.value;
    });
  });

  rangeTime.forEach(i =>
    i.addEventListener(
      'input',
      function () {
        video.currentTime = +i.value;
      },
      false,
    ),
  );

  function runnableTrack() {
    const input = document.querySelectorAll('input[type="range"]') as NodeListOf<HTMLInputElement>;
    input.forEach(input => {
      function setBackgroundSize(input: HTMLInputElement) {
        input.style.setProperty('--background-size', `${getBackgroundSize(input)}%`);
      }

      setBackgroundSize(input);

      input.addEventListener('input', () => setBackgroundSize(input));

      function getBackgroundSize(input: HTMLInputElement) {
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
      rangeTime.forEach(i => (i.value = String(video.currentTime)));
      runnableTrack();
    }, 10);
  });

  video.addEventListener(
    'ended',
    function () {
      video.currentTime = 0;
      rangeTime.forEach(i => (i.value = String(0)));
      video.load();
      playButton.src = 'assets/svg/play.svg';
    },
    false,
  );

  rangeVolume.addEventListener(
    'input',
    function () {
      video.muted = false;
      video.volume = +rangeVolume.value;
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
        speed.innerText = String(video.playbackRate);
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
    (
      document.querySelector('.player__video') as HTMLVideoElement
    ).src = `assets/video/video${currentSlide}.mp4`;
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
  const ticketsType = document.querySelectorAll('.booking__radio') as NodeListOf<HTMLInputElement>,
    basicTickets = document.querySelector('#basic-input') as HTMLInputElement,
    seniorTickets = document.querySelector('#senior-input') as HTMLInputElement,
    ticketsTotal = document.querySelector('.booking__data-total'),
    reservationBasic = document.querySelector('.reservation__basic') as HTMLInputElement,
    reservationSenior = document.querySelector('.reservation__senior') as HTMLInputElement,
    overviewBasic = document.querySelector('.tickets-number_basic') as HTMLInputElement,
    overviewSenior = document.querySelector('.tickets-number_senior') as HTMLInputElement,
    typeSelect = document.querySelector('.reservation__select') as HTMLSelectElement,
    reservationDate = document.querySelector('.reservation__date') as HTMLInputElement,
    reservationTime = document.querySelector('.reservation__time') as HTMLInputElement,
    overviewDateOutput = document.querySelector('.overview__date-output') as HTMLInputElement,
    overviewTimeOutput = document.querySelector('.overview__time-output') as HTMLInputElement,
    overviewTypeOutput = document.querySelector('.overview__type-output') as HTMLInputElement,
    overviewTotalBasic = document.querySelector('.tickets-cost-basic') as HTMLInputElement,
    overviewTotalSenior = document.querySelector('.tickets-cost-senior') as HTMLInputElement,
    overviewTotalSum = document.querySelector('.overview__total-sum') as HTMLInputElement;

  let radioIndex: number, type: number;

  if (sessionStorage.length) {
    basicTickets.value = sessionStorage.getItem('basicNumber');
    seniorTickets.value = sessionStorage.getItem('seniorNumber');
    ticketsType[+sessionStorage.getItem('typeIndex')].setAttribute('checked', 'checked');

    calculateTotal();
    setReservationData();
  }

  (function numberInput() {
    document.querySelectorAll('.number-input__minus').forEach(i =>
      i.addEventListener('click', e => {
        ((e.target as HTMLElement).nextElementSibling as HTMLInputElement).stepDown();
        calculateTotal();
        if (i.classList.contains('booking__number-value')) {
          setReservationData();
        } else updateData();
      }),
    );

    document.querySelectorAll('.number-input__plus').forEach(i =>
      i.addEventListener('click', e => {
        ((e.target as HTMLElement).previousElementSibling as HTMLInputElement).stepUp();
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
        type = +i.getAttribute('data-cost');
        radioIndex = index;
      }
    });

    let totalSum =
      (+basicTickets.value * BASIC_BENEFIT + +seniorTickets.value * SENIOR_BENEFIT) * type;
    if (totalSum) (ticketsTotal as HTMLElement).innerText = String(totalSum);

    sessionStorage.setItem('typeIndex', String(radioIndex));
    sessionStorage.setItem('basicNumber', basicTickets.value);
    sessionStorage.setItem('seniorNumber', seniorTickets.value);
  }

  function setReservationData() {
    reservationBasic.value = basicTickets.value;
    reservationSenior.value = seniorTickets.value;
    overviewBasic.value = reservationBasic.value;
    overviewSenior.value = reservationSenior.value;
    typeSelect.options.selectedIndex = radioIndex + 1;
    (document.querySelectorAll('.overview__basic-price') as NodeListOf<HTMLElement>).forEach(
      i => (i.innerText = String(type * BASIC_BENEFIT)),
    );
    (document.querySelectorAll('.overview__senior-price') as NodeListOf<HTMLElement>).forEach(
      i => (i.innerText = String(type * SENIOR_BENEFIT)),
    );
    updateData();
  }
  calculateTotal();
  setReservationData();

  let today = new Date(Date.now()),
    dd = +String(today.getDate()).padStart(2, '0'),
    mm = +String(today.getMonth() + 1).padStart(2, '0'),
    yyyy = today.getFullYear();

  reservationDate.min = yyyy + '-' + dd + '-' + mm;

  reservationDate.addEventListener('input', updateData);
  reservationTime.addEventListener('input', updateData);
  typeSelect.addEventListener('input', updateData);

  function updateData() {
    let date = new Date(reservationDate.value);
    if (reservationDate.value && +date > Date.now()) overviewDateOutput.value = date.toDateString();
    if (reservationTime.value) overviewTimeOutput.value = reservationTime.value;
    overviewTypeOutput.value = typeSelect.value;
    overviewBasic.value = reservationBasic.value;
    overviewSenior.value = reservationSenior.value;
    type = +ticketsType[typeSelect.options.selectedIndex - 1].getAttribute('data-cost');
    overviewTotalBasic.value = +reservationBasic.value * type * BASIC_BENEFIT + ' €';
    overviewTotalSenior.value = +reservationSenior.value * type * SENIOR_BENEFIT + ' €';
    overviewTotalSum.value =
      (BASIC_BENEFIT * +reservationBasic.value + SENIOR_BENEFIT * +reservationSenior.value) * type +
      ' €';
    (document.querySelectorAll('.overview__basic-price') as NodeListOf<HTMLElement>).forEach(
      i => (i.innerText = String(type * BASIC_BENEFIT)),
    );
    (document.querySelectorAll('.overview__senior-price') as NodeListOf<HTMLElement>).forEach(
      i => (i.innerText = String(type * SENIOR_BENEFIT)),
    );
  }
})();

//------ripple effect

(function buttonClick() {
  let btn = document.querySelector('.ripple');
  function ripple(e: MouseEvent) {
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
function createModal(elementName: string, scroolBehavior = false, changeTrigger = false) {
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
      img = document.querySelector(`[data-${elementName}][data-trigger-image]`) as HTMLImageElement;
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
  // targetSelector: '.gallery',
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

  function severalRandom(min: number, max: number, num: number) {
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
  (document.querySelectorAll('.leaflet-marker-icon') as NodeListOf<HTMLElement>).forEach(
    i => (i.style.opacity = String(0.4)),
  );

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

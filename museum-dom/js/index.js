/**
 * @prettier
 */
window.addEventListener('DOMContentLoaded', () => {
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
  })();
  // new Splide

  new Splide('.splide', {
    // arrowPath: 'M0.348163 0.219168C0.748196 -0.125842 1.33192 -0.0559202 1.65195 0.375342L5.82586 6.00004L1.65194 11.6247C1.33192 12.056 0.748195 12.1259 0.348162 11.7809C-0.0518709 11.4359 -0.116729 10.8066 0.203297 10.3753L3.45008 6.00004L0.203298 1.62473C-0.116728 1.19347 -0.05187 0.564177 0.348163 0.219168ZM4.5223 0.219168C4.92234 -0.125841 5.50606 -0.0559197 5.82609 0.375342L10 6.00004L5.82609 11.6247C5.50606 12.056 4.92234 12.1259 4.5223 11.7809C4.12227 11.4359 4.05741 10.8066 4.37744 10.3753L7.62422 6.00004L4.37744 1.62473C4.05741 1.19347 4.12227 0.564178 4.5223 0.219168Z',
    type: 'loop',
    perPage: 3,
    focus: 'center',
    // classes: {
    //   prev  : 'splide__arrow--prev vslider__prev',
    //   next  : 'splide__arrow--next vslider__next',
    // }
  }).mount();

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

    let type;

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
            console.log('hh');
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
    setReservationData();

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
      iconUrl: '../assets/img/maps-and-flags.png',
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

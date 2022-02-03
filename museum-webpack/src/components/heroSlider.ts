function heroSlider() {
  let offset = 0;
  let slideIndex = 1;

  const slides = document.querySelectorAll(
    '.slider__slide'
  ) as NodeListOf<HTMLElement>;
  const prev = document.querySelector('.slider__prev');
  const next = document.querySelector('.slider__next');
  const total = document.querySelector('#total');
  const current = document.querySelector('#current');
  const slidesWrapper = document.querySelector(
    '.slider__wrapper'
  ) as HTMLElement;
  const { width } = window.getComputedStyle(slidesWrapper);
  const slidesField = document.querySelector('.slider__inner') as HTMLElement;
  const indicators = document.querySelector('.slider__carousel-indicators');

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = String(slides.length);
    current.textContent = String(slideIndex);
  }

  slidesField.style.width = `${100 * slides.length}%`;
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.2s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  const dots: HTMLElement[] = [];
  for (let i = 0; i < slides.length; i += 1) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', String(i + 1));
    dot.classList.add('slider__carousel-dot');

    if (i === 0) {
      dot.style.backgroundColor = '#D2B183';
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function showNext() {
    if (offset === parseFloat(slides[0].style.width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex += 1;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = String(slideIndex);
    }

    dots.forEach((dot) => {
      dot.style.backgroundColor = '#ffffff';
    });
    dots[slideIndex - 1].style.backgroundColor = '#D2B183';
  }

  next.addEventListener('click', showNext);

  function showPrev() {
    if (offset <= 0) {
      offset = 0;
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
      offset = +offset.toFixed(3);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex -= 1;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = String(slideIndex);
    }

    dots.forEach((dot) => {
      dot.style.backgroundColor = '#ffffff';
    });
    dots[slideIndex - 1].style.backgroundColor = '#D2B183';
  }

  prev.addEventListener('click', showPrev);

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideTo = (e.target as HTMLElement).getAttribute('data-slide-to');

      slideIndex = +slideTo;
      offset = +width.slice(0, width.length - 2) * (+slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = String(slideIndex);
      }

      dots.forEach((i) => {
        i.style.backgroundColor = '#ffffff';
      });
      dots[slideIndex - 1].style.backgroundColor = '#D2B183';
    });
  });

  const slider = document.querySelector('.welcome__slider');

  type TouchCoordinate = { x: number; y: number } | null;
  let touchStart: TouchCoordinate = null;
  let touchPosition: TouchCoordinate = null;
  const SENSITIVITY = 10;

  slider.addEventListener('mousedown', (e) => {
    mouseStart(e as MouseEvent);
  });
  slider.addEventListener('mousemove', (e) => {
    mouseMove(e as MouseEvent);
  });
  slider.addEventListener('mouseup', TouchEnd);

  slider.addEventListener('touchstart', (e) => {
    TouchStart(e as TouchEvent);
  });
  slider.addEventListener('touchmove', (e) => {
    TouchMove(e as TouchEvent);
  });
  slider.addEventListener('touchend', TouchEnd);
  slider.addEventListener('touchcancel', TouchEnd);

  function mouseStart(e: MouseEvent) {
    touchStart = { x: e.clientX, y: e.clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };
  }

  function mouseMove(e: MouseEvent) {
    touchPosition = { x: e.clientX, y: e.clientY };
  }

  function TouchStart(e: TouchEvent) {
    touchStart = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };
    touchPosition = { x: touchStart.x, y: touchStart.y };
  }

  function TouchMove(e: TouchEvent) {
    touchPosition = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };
  }

  function TouchEnd() {
    CheckAction();
    touchStart = null;
    touchPosition = null;
  }

  function CheckAction() {
    const diff = {
      x: touchStart.x - touchPosition.x,
      y: touchStart.y - touchPosition.y,
    };

    if (Math.abs(diff.x) > Math.abs(diff.y)) {
      if (Math.abs(diff.x) > SENSITIVITY) {
        if (diff.x > 0) {
          showNext();
        } else {
          showPrev();
        }
      }
    }
  }
}

export default heroSlider;

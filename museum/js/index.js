/**
 *@prettier
 */
// ---------------------SLIDER
window.addEventListener('DOMContentLoaded', () => {
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
        dot.style.backgroundColor = '#9d8665';
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
      dots[slideIndex - 1].style.backgroundColor = '#9d8665';
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
      dots[slideIndex - 1].style.backgroundColor = '#9d8665';
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
        dots[slideIndex - 1].style.backgroundColor = '#9d8665';
      });
    });
  })();

  //--------------------------before-after
  (function compare() {
    const slider = document.querySelector('.compare__slider');
    const before = document.querySelector('.compare__before-image');
    const beforeImage = before.querySelector('.compare__img');
    const resizer = document.querySelector('.resizer');

    let active = false;

    //Sort overflow out for Overlay Image
    document.addEventListener('DOMContentLoaded', function () {
      let width = slider.offsetWidth;
      console.log(width);
      beforeImage.style.width = width + 'px';
    });

    //Adjust width of image on resize
    window.addEventListener('resize', function () {
      let width = slider.offsetWidth;
      console.log(width);
      beforeImage.style.width = width + 'px';
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
});

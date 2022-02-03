function beforeAfterSlider() {
  const slider = document.querySelector('.compare__slider') as HTMLElement;
  const before = document.querySelector(
    '.compare__before-image'
  ) as HTMLElement;
  const beforeImage = before.querySelector('.compare__img') as HTMLElement;
  const after = document.querySelector('.compare__after-image') as HTMLElement;
  const afterImage = after.querySelector('.compare__img') as HTMLElement;
  const resizer = document.querySelector('.resizer') as HTMLElement;

  let active = false;

  const width = slider.offsetWidth;
  beforeImage.style.width = `${width}px`;
  afterImage.style.width = `${width}px`;
  // resizer.style.height;

  // Adjust width of image on resize
  window.addEventListener('resize', () => {
    // const width = slider.offsetWidth;
    beforeImage.style.width = `${width}px`;
    afterImage.style.width = `${width}px`;
  });

  resizer.addEventListener('mousedown', () => {
    active = true;
    resizer.classList.add('resize');
  });

  document.body.addEventListener('mouseup', () => {
    active = false;
    resizer.classList.remove('resize');
  });

  document.body.addEventListener('mouseleave', () => {
    active = false;
    resizer.classList.remove('resize');
  });

  document.body.addEventListener('mousemove', (e) => {
    if (!active) return;
    let x = e.pageX;
    x -= slider.getBoundingClientRect().left;
    slideIt(x);
    pauseEvent(e);
  });

  resizer.addEventListener('touchstart', () => {
    active = true;
    resizer.classList.add('resize');
  });

  document.body.addEventListener('touchend', () => {
    active = false;
    resizer.classList.remove('resize');
  });

  document.body.addEventListener('touchcancel', () => {
    active = false;
    resizer.classList.remove('resize');
  });

  // calculation for dragging on touch devices
  document.body.addEventListener('touchmove', (e) => {
    if (!active) return;
    let x;

    let i;
    for (i = 0; i < e.changedTouches.length; i += 1) {
      x = e.changedTouches[i].pageX;
    }

    x -= slider.getBoundingClientRect().left;
    slideIt(x);
    pauseEvent(e);
  });

  function slideIt(x: number) {
    const transform = Math.max(0, Math.min(x, slider.offsetWidth));
    before.style.width = `${transform}px`;
    resizer.style.left = `${transform - 0}px`;
  }

  // stop divs being selected.
  function pauseEvent(e: Event) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  }
}

export default beforeAfterSlider;

import { Splide } from '@splidejs/splide';

new Splide('.splide', {
  type: 'loop',
  perPage: 3,
  focus: 'center',
}).mount();

function videoSlider() {
  const vslides = document.querySelectorAll('.vslider__video-item');
  const prev = document.querySelectorAll('.splide__arrow--prev')[0];
  const next = document.querySelectorAll('.splide__arrow--next')[0];

  let currentSlide = 0;

  prev.addEventListener('click', () => {
    if (currentSlide === 5) currentSlide = -1;
    currentSlide += 1;
    changeMainVideo();
  });
  next.addEventListener('click', () => {
    if (currentSlide === 0) currentSlide = 6;
    currentSlide -= 1;
    changeMainVideo();
  });
  function changeMainVideo() {
    (
      document.querySelector('.player__video') as HTMLVideoElement
    ).src = `assets/video/video${currentSlide}.mp4`;
  }

  vslides.forEach((videoSlide) => {
    videoSlide.addEventListener('click', () => {
      // console.log('d');
    });
  });
}

export default videoSlider;

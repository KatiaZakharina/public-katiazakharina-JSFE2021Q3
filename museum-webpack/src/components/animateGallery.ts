import AOS from 'aos';

const ANIMATION_DELAY = 300,
  ANIMATION_DURATION = 1000,
  IMG_QUANTITY = 15;

AOS.init({
  delay: ANIMATION_DELAY,
  duration: ANIMATION_DURATION,
});

function animateGallery() {
  const gallery = document.querySelector('.picture__inner');
  const random = severalRandom(1, IMG_QUANTITY, IMG_QUANTITY);

  for (let i = 0; i < IMG_QUANTITY; i += 1) {
    const img = document.createElement('img');
    img.classList.add('picture__item');

    img.setAttribute('data-aos', 'fade-up');
    img.setAttribute('data-aos-anchor-placement', 'top-bottom');

    img.setAttribute('alt', 'picture');
    img.src = `assets/img/galery/galery${random[i]}.jpg`;
    gallery.append(img);
  }

  function severalRandom(min: number, max: number, num: number) {
    let i;
    const arr = [];
    const res = [];

    for (i = min; i <= max; i += 1) arr.push(i);
    for (i = 0; i < num; i += 1) res.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    return res;
  }
}

// aos bug solution
let scrollRef = 0;

window.addEventListener('scroll', () => {
  if (scrollRef <= 10) {
    scrollRef += 1;
  } else {
    AOS.refresh();
  }
});

export default animateGallery;

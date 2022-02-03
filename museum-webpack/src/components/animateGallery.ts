import AOS from 'aos';

AOS.init({
  delay: 300,
  duration: 1000,
});

function animateGallery() {
  const gallery = document.querySelector('.picture__inner');
  const random = severalRandom(1, 15, 15);

  for (let i = 0; i < 15; i += 1) {
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
    for (i = 0; i < num; i += 1)
      res.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    return res;
  }
}

let scrollRef = 0;

window.addEventListener('scroll', () => {
  if (scrollRef <= 10) {
    scrollRef += 1;
  } else {
    AOS.refresh();
  }
});

export default animateGallery;

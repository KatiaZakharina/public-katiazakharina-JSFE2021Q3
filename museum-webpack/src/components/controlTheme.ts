document.querySelector('.header_theme').addEventListener('click', () => {
  document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
});

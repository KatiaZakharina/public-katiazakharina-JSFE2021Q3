let theme = 'light';

function darkTheme() {
  document.documentElement.style.setProperty('--theme-light', '#000');
  document.documentElement.style.setProperty('--theme-dark', '#fff');
  document.documentElement.style.setProperty('--theme-bg-light', '#030303');
  document.documentElement.style.setProperty('--theme-gold', '#fff');
  document.documentElement.style.setProperty('--theme-border', '#fff');
  theme = 'dark';
}

function lightTheme() {
  document.documentElement.style.setProperty('--theme-light', '#fff');
  document.documentElement.style.setProperty('--theme-dark', '#000');
  document.documentElement.style.setProperty('--theme-bg-light', '#fff');
  document.documentElement.style.setProperty('--theme-gold', '#9d8665');
  document.documentElement.style.setProperty('--theme-border', '#000');
  theme = 'light';
}

document.querySelector('.header_theme').addEventListener('click', () => (theme === 'light' ? darkTheme() : lightTheme()));

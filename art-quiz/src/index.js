import './scss/index.scss';
import './modules/localStorage';
import routing from './modules/routing';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', hideFooter);
  function hideFooter() {
    if (
      document.documentElement.clientHeight < document.querySelector('#root').scrollHeight + 40 ||
      1
    ) {
      // TODO: если высота страницы больше высоты браузерного экрана
      //FIXME:
      document.querySelector('.footer').style.display = 'none';
    } else {
      document.querySelector('.footer').style.display = 'flex';
    }
  }
  hideFooter();
  window.addEventListener('popstate', () => {
    routing.render();
  });
});

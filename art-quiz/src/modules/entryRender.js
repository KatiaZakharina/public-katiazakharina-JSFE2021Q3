import entryTemp from '../components/entry.html';
import './routing';

function entryRender() {
  document.querySelector('#root').innerHTML = entryTemp;
  document.body.classList.add('cover');

  document.querySelector('.entry__settings').addEventListener('click', () => {
    window.location.hash = 'settings';
  });

  document.querySelector('.entry__inner').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      window.location.hash = e.target.dataset.quiztype;
    }
  });
}
export default entryRender;

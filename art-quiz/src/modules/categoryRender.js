import categoryTemp from '../components/category.html';
import routing from './routing';
import { artistQuiz, paintingQuiz } from './localStorage';
import categoryName from './categoryNameRender';

function category() {
  document.querySelector('#root').innerHTML = categoryTemp;
  document.body.classList.remove('cover');

  document.querySelector('.nav__inner').addEventListener('click', e => {
    if (
      e.target.parentElement.tagName == 'LI' &&
      e.target.parentElement.dataset.redirection != 'none'
    ) {
      window.location.hash = e.target.parentElement.dataset.redirection;
    }
  });
  document.querySelector('.category__settings').addEventListener('click', () => {
    window.location.hash = 'settings';
  });

  let currentQuiz;
  if (window.location.hash.slice(1).split('/')[0] == 'artist') {
    currentQuiz = artistQuiz;
  } else if (window.location.hash.slice(1).split('/')[0] == 'painting') {
    currentQuiz = paintingQuiz;
  }

  if (
    window.location.hash.slice(1).split('/')[1] &&
    window.location.hash.slice(1).split('/')[1] != 'quiz'
  ) {
    categoryName(window.location.hash.slice(1).split('/')[1]);
    currentQuiz.renderCategoryByName();
    return;
  }

  currentQuiz.renderCategories();
  document.querySelector('.content__inner').addEventListener('click', e => {
    if (e.target.classList.contains('card__painting')) {
      window.location.hash = window.location.hash.slice(1) + '-quiz/' + e.target.dataset.category+'/1';
    }
    if (
      e.target.className == 'card__title' &&
      e.target.parentElement.parentElement.classList.contains('card_completed')
    ) {
      window.location.hash =
        window.location.hash.slice(1) + '/' + e.target.textContent.toLowerCase();
    }
  });
}
export default category;

import categoryTemp from '../components/category.html';
import routing from './routing';
import {artistQuiz, paintingQuiz} from './localStorage';

function category() {
  document.querySelector('#root').innerHTML = categoryTemp;
  document.body.classList.remove('cover');

  document.querySelector('.nav__inner').addEventListener('click', e => {
    console.log(e.target.parentElement);
    if (
      e.target.parentElement.tagName == 'LI' &&
      e.target.parentElement.dataset.redirection != 'none'
    ) {
      console.log(e.target.parentElement);

      window.location.hash = e.target.parentElement.dataset.redirection;
    }
  });
  document.querySelector('.category__settings').addEventListener('click', () => {
    window.location.hash = 'settings';
  });

  let currentQuiz;
  if(window.location.hash.slice(1)=='artist'){
    currentQuiz=artistQuiz;
  }else if(window.location.hash.slice(1)=='painting'){
    currentQuiz=paintingQuiz;
  }
  currentQuiz.categoryNames.then(names=>{
    let temp='';
    names.forEach(name => {
      temp+=``;
    });
  });

}
export default category;

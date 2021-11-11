import './scss/index.scss';

import routing from './modules/routing';
import { settings } from './modules/localStorage';
import './modules/entry';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', () => {
    if (document.documentElement.clientHeight < 620) {
      document.querySelector('.footer').style.display = 'none';
    } else {
      document.querySelector('.footer').style.display = 'flex';
    }
  });
  console.dir(settings);
  console.dir(routing);

  //делегирование нажатия на одну из кнопок вызывает создание
  //addEventListener('click', (e)=>{factory.create(e.target.dataset.type)})
  //const quiz=new QuizFactory()
});

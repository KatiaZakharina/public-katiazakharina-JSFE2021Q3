import './scss/index.scss';
import QuizFactory from './modules/quiz';
import settings from './modules/settings';
import entry from './components/entry.html';

//entry
document.querySelector('#root').innerHTML = entry;
document.body.classList.add('cover');

//делегирование нажатия на одну из кнопок вызывает создание
//addEventListener('click', (e)=>{factory.create(e.target.dataset.type)})
//const quiz=new QuizFactory()

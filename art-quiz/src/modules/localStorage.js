import settings from '../modules/settings';
import { Quiz, artistQuiz, paintingQuiz } from '../modules/quiz';

function setLocalStorage() {
  // localStorage.setItem('settings-data', JSON.stringify(settings.setLocalStorage()));
  // localStorage.setItem('quiz-data', JSON.stringify({ 'quiz[art][]': '' }));
}
window.addEventListener('beforeunload', setLocalStorage);

(function getLocalStorage() {
  if (localStorage.getItem('settings')) {
    settings.set(JSON.parse(localStorage.getItem('settings')));
  }
  if (localStorage.getItem('db')) {
  } else {
    artistQuiz.setData();
    paintingQuiz.setData();
  }
})();
export { settings, artistQuiz, paintingQuiz };

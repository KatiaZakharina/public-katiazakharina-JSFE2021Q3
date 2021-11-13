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
    const db = Promise.all([
      Quiz.getDataBase(
        'https://raw.githubusercontent.com/rolling-scopes-school/katiazakharina-JSFE2021Q3/art-quiz/art-quiz/src/assets/db/images.json?token=ARYOJC7A7R3MMHNKD2TXVZDBS7XPI',
      ),
      Quiz.getDataBase(
        'https://raw.githubusercontent.com/rolling-scopes-school/katiazakharina-JSFE2021Q3/art-quiz/art-quiz/src/assets/db/categories.json?token=ARYOJCZOJ5PM6ZMKCBEIAS3BTABY2',
      ),
    ]);
    artistQuiz.setData(db);
    paintingQuiz.setData(db);
    //FIXME: refact!

  }
})();
export { settings, artistQuiz, paintingQuiz };

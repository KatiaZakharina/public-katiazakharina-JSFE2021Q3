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
    const db = Quiz.getDataBase(
      'https://raw.githubusercontent.com/rolling-scopes-school/katiazakharina-JSFE2021Q3/art-quiz/art-quiz/src/assets/db/images.json?token=ARYOJC7A7R3MMHNKD2TXVZDBS7XPI',
    );
    const categoryName = Quiz.getDataBase(
        'https://raw.githubusercontent.com/rolling-scopes-school/katiazakharina-JSFE2021Q3/art-quiz/art-quiz/src/assets/db/images.json?token=ARYOJC7A7R3MMHNKD2TXVZDBS7XPI',
      );

    artistQuiz.db = db;
    artistQuiz.categoryName = categoryName.then(data => data.artists);
    paintingQuiz.db = db;
    paintingQuiz.categoryName = categoryName.then(data => data.painting);
  }
})();
export { settings, artistQuiz, paintingQuiz };

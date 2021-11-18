import settings from '../modules/settings';
import { Quiz, artistQuiz, paintingQuiz } from '../modules/quiz';

(function getLocalStorage() {
  // if (localStorage.getItem('settings')) {
  //   settings.set(JSON.parse(localStorage.getItem('settings')));
  // }

  if (localStorage.getItem('images-infoh') && localStorage.getItem('images-info') != 'undefined') {
    console.log('LOCALSTORAGE: true');
    Quiz.getDataBase(
      'https://raw.githubusercontent.com/rolling-scopes-school/katiazakharina-JSFE2021Q3/art-quiz/art-quiz/src/assets/db/categories.json?token=ARYOJC35SPP2FN72KJXLD73BTFQXO',
    ).then(data => {
      artistQuiz.categories = data.artists;
      paintingQuiz.categories = data.painting;
      artistQuiz.imagesInfo = JSON.parse(localStorage.getItem('images-info'));
      paintingQuiz.imagesInfo = JSON.parse(localStorage.getItem('images-info'));
      console.log(artistQuiz.categories, artistQuiz.imagesInfo);
    });
  } else {
    artistQuiz.setData();
    paintingQuiz.setData();
  }
})();

function setLocalStorage() {
  // localStorage.setItem('settings-data', JSON.stringify(settings.setLocalStorage()));
  localStorage.setItem('images-info', JSON.stringify(artistQuiz.imagesInfo));
  // localStorage.setItem('quiz-data', JSON.stringify({ 'quiz[art][]': '' }));
}
window.addEventListener('beforeunload', setLocalStorage);
export { settings, artistQuiz, paintingQuiz };

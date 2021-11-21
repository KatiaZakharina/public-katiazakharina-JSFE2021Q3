import settings from '../modules/settings';
import { Quiz, artistQuiz, paintingQuiz } from '../modules/quiz';

(async function getLocalStorage() {
  await artistQuiz.setData();
  await paintingQuiz.setData();
})();

function setLocalStorage() {
  localStorage.setItem('settings', JSON.stringify(settings.settings));
  settings.setInputState();
  localStorage.setItem('images-info-artists', JSON.stringify(artistQuiz.imagesInfo));
  localStorage.setItem('images-info-painting', JSON.stringify(paintingQuiz.imagesInfo));
}
window.addEventListener('beforeunload', setLocalStorage);
export { settings, artistQuiz, paintingQuiz };

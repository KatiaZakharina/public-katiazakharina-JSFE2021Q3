import settings from './settings';
import { artistQuiz } from './quiz';
import { paintingQuiz } from './paintingQuiz';

(async function getLocalStorage() {
  await artistQuiz.setData();
  await paintingQuiz.setData();
})();

function setLocalStorage() {
  localStorage.setItem('settings', JSON.stringify(settings.settings));
  localStorage.setItem('images-info-artists', JSON.stringify(artistQuiz.imagesInfo));
  localStorage.setItem('images-info-painting', JSON.stringify(paintingQuiz.imagesInfo));
}
window.addEventListener('beforeunload', setLocalStorage);
export { settings, artistQuiz };

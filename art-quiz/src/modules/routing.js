import entryRender from './entryRender';
import settingsRender from './settingsRender';
import categoryRender from './categoryRender';
import { artistQuiz, paintingQuiz } from './localStorage';

class Routing {
  constructor() {
    this.list = {
      '': entryRender,
      artist: () => {
        categoryRender(artistQuiz);
      },
      painting: () => {
        categoryRender(paintingQuiz);
      },
      settings: settingsRender,
    };
  }
  render() {
    this.list[window.location.hash.slice(1)](); //FIXME: параметры
  }
}
const routing = new Routing();

window.addEventListener('hashchange', () => {
  routing.render();
});

routing.render();
export default routing;

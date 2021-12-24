import entryRender from './entryRender';
import settingsRender from './settingsRender';
import categoryRender from './categoryRender';
import quizRender from './quizRender';

class Routing {
  constructor() {
    this.list = {
      '': entryRender,
      artist: categoryRender,
      'artist-quiz': quizRender,
      painting: categoryRender,
      'painting-quiz': quizRender,
      settings: settingsRender,
    };
  }
  render() {
    const url = window.location.hash.slice(1).split('/');
    this.list[url.shift(0)]();
  }
}
const routing = new Routing();

window.addEventListener('hashchange', () => {
  routing.render();
});

routing.render();
export default routing;

import { entryRender } from './entryRender';
import { settingsRender } from './settingsRender';
import { category } from './categoryRender';
import { quizRender } from './quizRender';

class Routing {
  constructor() {
    this.list = {
      '': entryRender,
      artist: category,
      'artist-quiz': quizRender,
      painting: category,
      'painting-quiz': quizRender,
      settings: settingsRender,
    };
  }
  render() {
    const url = window.location.hash.slice(1).split('/');
    this.list[url.shift(0)]();
  }
}
export const routing = new Routing();

window.addEventListener('hashchange', () => {
  routing.render();
});

routing.render();

import entryTemp from '../components/entry.html';
import settingsTemp from '../components/settings.html';
import entry from '../modules/entry';
import settings from './settings';

class Routing {
  constructor() {
    this.list = {
      // '/': entry,
      '/': settings,
      '/artist': artist,
      '/painting': painting,
      '/settings': settings,
    };
  }
  render() {
    this.list[window.location.pathname]();
  }
}
const routing = new Routing();
routing.render();

function artist() {
  console.log('Art');
  // document.querySelector('#root').innerHTML = entryTemp;
  // document.body.classList.add('cover');
}
function painting() {
  console.log('Painting');
  // document.querySelector('#root').innerHTML = entryTemp;
  // document.body.classList.add('cover');
}
export default routing;

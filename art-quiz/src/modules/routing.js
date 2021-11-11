import entryRender from './entryRender';
import settingsRender from './settingsRender';

class Routing {
  constructor() {
    this.list = {
      '/artist': artistRender,
      '/painting': paintingRender,
      '/settings': settingsRender,
      '/': entryRender,
    };
  }
  render() {
    this.list[window.location.pathname]();
  }
}
const routing = new Routing();

//----------------
function artistRender() {
  console.log('Art');
}
function paintingRender() {
  console.log('Painting');
}
////------------

routing.render();
export default routing;

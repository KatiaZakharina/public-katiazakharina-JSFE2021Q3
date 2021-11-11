import Settings from '../modules/settings';

let settings;

function setLocalStorage() {
  // window.history.pushState({}, '/', window.location.origin + '/');
  localStorage.setItem('settings', JSON.stringify(settings.obj()));
}
window.addEventListener('beforeunload', setLocalStorage);

(function getLocalStorage() {
  if (localStorage.getItem('settings')) {
    settings = new Settings(JSON.parse(localStorage.getItem('setting')));
  } else {
    settings = new Settings();
  }
})();
export { settings };

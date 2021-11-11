function entry() {
  document.querySelector('#root').innerHTML = entryTemp;
  document.body.classList.add('cover');

  document.querySelector('.entry__settings').addEventListener('click', () => {
    window.history.pushState({}, 'settings', window.location.origin + '/settings');
    routing.render();
  });

  document.querySelector('.entry__inner').addEventListener('click', e => {
    if (e.target.tagName == 'BUTTON') {
      window.history.pushState(
        {},
        e.target.dataset.quiztype,
        window.location.origin + '/' + e.target.dataset.quiztype,
      );
      routing.render();
    }
  });
}

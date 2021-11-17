import quizTemp from '../components/quiz.html';
import { settings, artistQuiz, paintingQuiz } from './localStorage';
import { runnableTrack } from './settingsRender';

function quiz() {
  document.querySelector('#root').innerHTML = quizTemp;
  runnableTrack();
  let currentQuiz;
  if (window.location.hash.slice(1).split('/')[0] == 'artist-quiz') {
    currentQuiz = artistQuiz;
  } else if (window.location.hash.slice(1).split('/')[0] == 'painting-quiz') {
    currentQuiz = paintingQuiz;
  }

  function createModal(modalName) {
    const modalTrigger = document.querySelectorAll(`[data-${modalName}-modal]`),
      modal = document.querySelector(`[data-${modalName}]`),
      modalContainer = document.querySelector(`[data-${modalName}] .modal__container`),
      modalCloseBtn = document.querySelectorAll(`[data-${modalName}-close]`);

    modalTrigger?.forEach(btn => {
      btn.addEventListener('click', showModal);
    });

    modalCloseBtn?.forEach(close => close.addEventListener('click', hideModal));

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        hideModal();
      }
    });
    document.addEventListener('keydown', e => {
      if (e.code == 'Escape' && modal.classList.contains('show')) {
        hideModal();
      }
    });

    function showModal() {
      modal.classList.add('show');
      modalContainer.classList.add('fadeIn');
      modal.classList.remove('hide');
      modalContainer.classList.remove('fadeOut');
    }

    function hideModal() {
      modalContainer.classList.remove('fadeIn');
      modalContainer.classList.add('fadeOut');
      setTimeout(() => {
        modal.classList.add('hide');
        modal.classList.remove('show');
      }, 500);
    }
  };

  createModal('quit');


  document.querySelector('[data-redirection]').addEventListener('click', e => {
    window.location.hash = e.target.dataset.redirection;
  });
  // console.log(currentQuiz.renderQuiz());

  currentQuiz.renderQuiz().then(() => {
    document.querySelector('.quiz__answers').addEventListener('click', e => {
      if (e.target.classList.contains('quiz__answer')) {
        // let url = window.location.hash.slice(1).split('/');
        // if (url[2] != 9) window.location.hash = url[0] + '/' + url[1] + '/' + +(++url[2]);
        let answerStatus = currentQuiz.checkAnswer();
        e.target.classList.add(answerStatus);

        // createModal('answer');

        document.querySelector('[data-answer]').classList.add(answerStatus);
      }
    });
  });
}
export default quiz;

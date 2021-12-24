import { Quiz } from './quiz';

class ArtistQuiz extends Quiz {
  constructor() {
    super();
    this.type = 'artists';
  }
  async renderQuiz() {
    const data = super.renderQuiz();
    return data.then((data) => {
      document.querySelector(
        '.quiz__inner'
      ).innerHTML = `<div class="quiz__question">Which is ${data.currentObj.author} picture?</div>`;
      const quizAnswers = document.createElement('div');
      quizAnswers.classList.add('quiz__answers');

      for (const obj in data.randomObjArr) {
        const bgImg = document.createElement('div');
        const specialClass = data.currentObj.author === data.randomObjArr[obj].author ? 'correct' : 'wrong';
        bgImg.classList.add('quiz__answer', 'quiz__answer-painting', specialClass);
        this.getQuizInfo();

        this.loadImage(`./assets/img/${data.randomObjArr[obj].imageNum}.jpg`).then(() => {
          this.getQuizInfo();
          bgImg.style.backgroundImage = `url(./assets/img/${data.randomObjArr[obj].imageNum}.jpg)`;
        });
        quizAnswers.append(bgImg);
      }
      document.querySelector('.quiz__inner').append(quizAnswers);
    });
  }
  async checkAnswer(answerSrc) {
    const currentObj = await super.checkAnswer();
    const chosenObj = this.imagesInfo[answerSrc.match(/\/(\d+)\./)[1]];
    if (currentObj.author === chosenObj.author) {
      currentObj.isGuessed = true;
      return 'correct';
    }
    return 'wrong';
  }
}

export const artistQuiz = new ArtistQuiz();

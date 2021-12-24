import { Quiz } from './quiz';

class PaintingQuiz extends Quiz {
  constructor() {
    super();
    this.type = 'painting';
  }
  async renderQuiz() {
    const data = super.renderQuiz();
    let temp = '';
    return data.then((response) => {
      temp += `<div class="quiz__question">Which is the author of this picture?</div>
      <div class="quiz__answers">`;

      Object.keys(response.randomObjArr).forEach((obj) => {
        const specialClass = response.currentObj.author === response.randomObjArr[obj].author ? 'correct' : 'wrong';
        temp += `<button class="quiz__answer ${specialClass} btn">${response.randomObjArr[obj].author}</button>`;
      });

      temp += '</div>';
      document.querySelector('.quiz__inner').innerHTML = temp;

      const bgImg = document.createElement('div');
      bgImg.classList.add('quiz__picture-question');

      this.loadImage(`./assets/img/${response.currentObj.imageNum}.jpg`).then(() => {
        bgImg.style.backgroundImage = `url(./assets/img/${response.currentObj.imageNum}.jpg)`;
      });

      document.querySelector('.quiz__answers').before(bgImg);
    });
  }
  async checkAnswer(answerAuthor) {
    const currentObj = await super.checkAnswer();

    if (currentObj.author === answerAuthor) {
      currentObj.isGuessed = true;
      return 'correct';
    }
    return 'wrong';
  }
}
export const paintingQuiz = new PaintingQuiz();

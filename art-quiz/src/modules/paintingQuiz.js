import { Quiz } from './quiz';

class PaintingQuiz extends Quiz {
  constructor() {
    super();
    this.type = 'painting';
  }
  async renderQuiz() {
    const data = await super.renderQuiz();
    let temp = '';
    temp += `<div class="quiz__question">Which is the author of this picture?</div>
      <div class="quiz__answers">`;

    Object.keys(data.randomObjArr).forEach(async (obj) => {
      const specialClass = data.currentObj.author === data.randomObjArr[obj].author ? 'correct' : 'wrong';
      temp += `<button class="quiz__answer ${specialClass} btn">${data.randomObjArr[obj].author}</button>`;
    });

    temp += '</div>';
    document.querySelector('.quiz__inner').innerHTML = temp;

    const bgImg = document.createElement('div');
    bgImg.classList.add('quiz__picture-question');

    this.loadImage(`./assets/img/${data.currentObj.imageNum}.jpg`).then(() => {
      bgImg.style.backgroundImage = `url(./assets/img/${data.currentObj.imageNum}.jpg)`;
    });

    document.querySelector('.quiz__answers').before(bgImg);
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

//TODO: refact: add component approach
//TODO: refact: rename routing and localStorage, turn localStorage into class

//TODO: change structure of categories db :null
//FIXME: use category db only for read name. To manage quiz use imagesInfo
import settings from './settings';
import Timer from './timer';

class Quiz {
  constructor() {
    this.timer = new Timer(settings.settings.timer);
  }
  static async getDataBase(path) {
    return await fetch(path).then(data => data.json());
  }

  getQuizInfo(i) {
    this.quizCategory = window.location.hash.slice(1).split('/')[1];
    this.quizType = window.location.hash.slice(1).split('/')[0].replace('-quiz', '');
    this.num = this.quizType == 'artist' ? 0 : 12;

    if (this.quizCategory) {
      this.categoryNum =
        this.categories.indexOf(this.quizCategory[0].toUpperCase() + this.quizCategory.slice(1)) +
        this.num;

      this.currentQuiz = window.location.hash.slice(1).split('/')[2];
      i = i || +this.currentQuiz;
      this.currentObj = this.imagesInfo[this.categoryNum * 10 + i - 1];
    }
  }
  getRandomNum(arr, start, end) {
    let random = ~~(Math.random() * (end - start + 1) + start);
    return arr.indexOf(random) == -1 ? random : this.getRandomNum(arr, start, end);
  }
  checkAuthorUniqueness(arr) {
    let authorArr = arr.map(number => this.imagesInfo[number].author);
    return authorArr.length === new Set(authorArr).size;
  }
  randomizeOrder(arr) {
    let order = [],
      newArr = [];
    arr.forEach((item, index) => {
      order.push(this.getRandomNum(order, 0, arr.length - 1));
      let j = order[index];
      newArr.push(arr[j]);
    });
    return newArr;
  }

  async setData() {
    this.categories = (
      await Quiz.getDataBase(
        'https://raw.githubusercontent.com/rolling-scopes-school/katiazakharina-JSFE2021Q3/art-quiz/art-quiz/src/assets/db/categories.json?token=ARYOJC2SJ5DLYAAOTMONG2LBUKQTQ',
      )
    )[this.type];

    if (localStorage.getItem(`images-info-${this.type}`)) {
      this.imagesInfo = JSON.parse(localStorage.getItem(`images-info-${this.type}`));
      console.log(this.imagesInfo, 'localStorage');
    } else {
      this.imagesInfo = (
        await Quiz.getDataBase(
          'https://raw.githubusercontent.com/rolling-scopes-school/katiazakharina-JSFE2021Q3/art-quiz/art-quiz/src/assets/db/images.json?token=ARYOJC6Q4IESCA5ITBM3EU3BUKQQG',
        )
      ).images;
      this.imagesInfo.forEach(i => {
        i.isGuessed = false;
      });
      console.log(this.imagesInfo, 'gitHubData', this);
    }
  }

  async renderCategories() {
    if (!this.imagesInfo) await this.setData();
    let temp = '';
    this.getQuizInfo();
    for (let j = 0; j < this.categories.length; j++) {
      //FIXME: smooth appearing by means back-image  //card_inactive
      let categoryScore = 0;
      for (let i = 0; i < 10; i++) {
        categoryScore += this.imagesInfo[(j + this.num) * 10 + i].isGuessed ? 1 : 0;
      }

      temp += `
      <div class="category__card card ${
        categoryScore == 0 ? 'card_inactive' : categoryScore == 10 ? 'card_completed' : ''
      }">
        <div class="card__header">
          <div class="card__title">${this.categories[j]}</div>
          <div class="card__score">${categoryScore}/10</div>
        </div>
        <div class="card__painting" data-category="${this.categories[
          j
        ].toLowerCase()}" style="background-image: url(./assets/img/${
        (j + this.num) * 10
      }.jpg);"></div> 
        <div class="card__details">
        <img src="./assets/svg/radix-icons_reload.svg" alt="icon: reload">
        <h5 class="card__again">Play again</h5>
      </div>
      </div>
    `;
    }
    document.querySelector('.content__inner').innerHTML += temp;
  }

  async renderCategoryByName() {
    if (!this.imagesInfo) await this.setData();
    let temp = '';

    for (let i = 1; i <= 10; i++) {
      this.getQuizInfo(i);
      temp += `
        <div class="category__card card ${
          this.currentObj.isGuessed == false ? 'card_inactive' : 'card_completed'
        }">
          <div class="card__painting" style="background-image: url(./assets/img/${
            this.currentObj.imageNum
          }.jpg);"></div>
          <div class="card__details card__picture-description">
          <p class="card__picture-info">${this.currentObj.author}</p>
          <p class="card__picture-info">${this.currentObj.name}</p>
          <p class="card__picture-info">${this.currentObj.year}</p>
        </div>
        </div>
      `;
    }
    document.querySelector('.content__inner').innerHTML += temp;
  }
  async renderQuiz() {
    if (!this.imagesInfo) await this.setData();
    this.getQuizInfo();

    let randomObjArr;

    if (this.currentQuiz == '1') this.resetResultOfRound(this.categoryNum);

    if (settings.settings.timeMood) this.timer.startTimer();

    do {
      randomObjArr = [+this.currentObj.imageNum];
      for (let i = 0; i < 3; i++) {
        randomObjArr.push(
          this.getRandomNum(randomObjArr, this.num ? 120 : 0, this.num ? 239 : 119),
        );
      }
    } while (!this.checkAuthorUniqueness(randomObjArr));

    randomObjArr = this.randomizeOrder(randomObjArr);
    randomObjArr = randomObjArr.map(num => {
      return this.imagesInfo[num];
    });
    return { randomObjArr, currentObj: this.currentObj };
  }

  async checkAnswer() {
    if (!this.imagesInfo) await this.setData();
    this.getQuizInfo();
    return this.currentObj;
  }
  resetResultOfRound(roundNum) {
    for (let i = 0; i < 10; i++) {
      this.imagesInfo[roundNum * 10 + i].isGuessed = false;
    }
  }
  async renderModal(status) {
    if (!this.imagesInfo) await this.setData();
    this.getQuizInfo();

    document.querySelector('.quiz').innerHTML += `
    <div class="modal show ${status}" data-answer>
    <div class="container modal__container fadeIn">
      <div class="modal__content">
      <div class="modal__painting" style="background-image: url(./assets/img/${this.currentObj.imageNum}.jpg)"></div>
        <h4 class="modal__painting-name">${this.currentObj.name}</h4>
        <p class="modal__painting-description">${this.currentObj.author}, ${this.currentObj.year}</p>
        <div class="modal__action">
          <button class="btn btn_active" data-redirection='next-question'>Next</button>
        </div>
      </div>
    </div>
  </div>
    `;

    document.querySelector('[data-redirection="next-question"]').addEventListener('click', () => {
      let url = window.location.hash.slice(1).split('/');
      if (url[2] != 10) window.location.hash = url[0] + '/' + url[1] + '/' + +(++url[2]);
      else {
        document.querySelector('[data-answer]').classList.add('hide');
        this.renderFinalModal();
      }
    });
  }
  async renderFinalModal() {
    if (!this.imagesInfo) await this.setData();

    let categoryScore = 0;

    for (let i = 0; i < 10; i++) {
      if (this.imagesInfo[this.categoryNum * 10 + i].isGuessed) categoryScore++;
    }

    let phrase, score, status, btns;
    if (categoryScore == 0) {
      status = 'lose-quiz';
      phrase = 'Play again?';
      score = 'Game over';
      btns = `<button class="btn" data-redirection=''>Cancel</button>
      <button class="btn btn_active" data-redirection='current-quiz'>Yes</button>`;
    } else if (categoryScore == 10) {
      status = 'win-quiz';
      phrase = 'Congratulations!';
      score = 'Grand result';
      btns = `<button class="btn btn_active" data-redirection='next-quiz'>Next</button>`;
    } else {
      status = 'complete-quiz';
      phrase = 'Congratulations!';
      score = categoryScore + '/10';
      btns = `<button class="btn" data-redirection=''>Home</button>
      <button class="btn btn_active" data-redirection='next-quiz'>Next Quiz</button>`;
    }
    if ((this.categoryNum == 11 || this.categoryNum == 23) && categoryScore != 0) {
      btns = `<button class="btn" data-redirection=''>Home</button>`;
    }

    document.querySelector('.quiz').innerHTML += `
    <div class="modal final-modal ${status} show" data-final>
    <div class="container modal__container fadeIn">
      <div class="modal__content">
      <div class="modal__painting"></div>
        <h4 class="modal__score-state">${score}</h4>
        <p class="modal__phrase">${phrase}</p>
        <div class="modal__action">
          ${btns}
        </div>
      </div>
    </div>
  </div>
    `;

    document.querySelector('.final-modal').addEventListener('click', e => {
      if (e.target.dataset.redirection == '') {
        window.location.hash = '';
      }
      if (e.target.dataset.redirection == 'next-quiz') {
        window.location.hash =
          this.quizType + '-quiz/' + this.categories[this.categoryNum + 1].toLowerCase() + '/1';
      }
      if (e.target.dataset.redirection == 'current-quiz') {
        window.location.hash = this.quizType + '-quiz/' + this.quizCategory + '/1';
      }
    });
  }

  playAudio(status) {
    if (settings.settings.volume != 0) {
      const audio = document.createElement('audio');
      audio.volume = settings.settings.volume / 100;
      audio.src =
        status == 'correct'
          ? './assets/audio/mixkit-achievement-bell-600.wav'
          : './assets/audio/mixkit-losing-drums-2023.wav';
      audio.play();
    }
  }
}

class ArtistQuiz extends Quiz {
  constructor() {
    super();
    this.type = 'artists';
  }
  async renderQuiz() {
    let data = super.renderQuiz();
    let temp = '';
    return data.then(data => {
      temp += `<div class="quiz__question">Which is ${data.currentObj.author} picture?</div>
      <div class="quiz__answers">`;
      for (let obj in data.randomObjArr) {
        temp += `<div class="quiz__answer quiz__answer-painting" style="background-image: url(./assets/img/${data.randomObjArr[obj].imageNum}.jpg);"></div>`;
      }
      temp += `</div>`;
      document.querySelector('.quiz__inner').innerHTML = temp;
    });
  }
  async checkAnswer(answerSrc) {
    let currentObj = await super.checkAnswer(),
      chosenObj = this.imagesInfo[answerSrc.match(/\/(\d+)\./)[1]];
    if (currentObj.author == chosenObj.author) {
      currentObj.isGuessed = true;
      return 'correct';
    } else return 'wrong';
  }
}

class PaintingQuiz extends Quiz {
  constructor() {
    super();
    this.type = 'painting';
  }
  async renderQuiz() {
    let data = super.renderQuiz();
    let temp = '';
    return data.then(data => {
      temp += `<div class="quiz__question">Which is the author of this picture?</div>
      <div class="quiz__picture-question" style="background-image: url(./assets/img/${data.currentObj.imageNum}.jpg)"></div>
      <div class="quiz__answers">`;
      for (let obj in data.randomObjArr) {
        temp += `<button class="quiz__answer btn">${data.randomObjArr[obj].author}</button>`;
      }
      temp += `</div>`;
      document.querySelector('.quiz__inner').innerHTML = temp;
    });
  }
  async checkAnswer(answerAuthor) {
    let currentObj = await super.checkAnswer();

    if (currentObj.author == answerAuthor) {
      currentObj.isGuessed = true;
      return 'correct';
    } else return 'wrong';
  }
}

const artistQuiz = new ArtistQuiz(),
  paintingQuiz = new PaintingQuiz();

export { Quiz, artistQuiz, paintingQuiz };

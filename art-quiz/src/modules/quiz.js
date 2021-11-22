import settings from './settings';
import timer from './timer';

class Quiz {
  constructor() {
    this.timer = timer;
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

    if (
      localStorage.getItem(`images-info-${this.type}`) &&
      localStorage.getItem(`images-info-${this.type}`) != 'undefined'
    ) {
      this.imagesInfo = JSON.parse(localStorage.getItem(`images-info-${this.type}`));
      // console.log('localStorage', this);
    } else {
      this.imagesInfo = (
        await Quiz.getDataBase(
          'https://raw.githubusercontent.com/rolling-scopes-school/katiazakharina-JSFE2021Q3/art-quiz/art-quiz/src/assets/db/images.json?token=ARYOJC6Q4IESCA5ITBM3EU3BUKQQG',
        )
      ).images;
      this.imagesInfo.forEach(i => {
        i.isGuessed = false;
      });
      // console.log('gitHubData', this);
    }
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Could not load image: ${url}`));
    });
  }

  async renderCategories() {
    if (!this.imagesInfo) await this.setData();
    this.getQuizInfo();

    for (let j = 0; j < this.categories.length; j++) {
      let categoryScore = 0;

      for (let i = 0; i < 10; i++) {
        categoryScore += this.imagesInfo[(j + this.num) * 10 + i].isGuessed ? 1 : 0;
      }

      const bgImg = document.createElement('div');
      bgImg.dataset.category = this.categories[j].toLowerCase();
      bgImg.classList.add('card__painting');

      this.loadImage(`./assets/img/${(j + this.num) * 10}.jpg`).then(() => {
        bgImg.style.backgroundImage = `url(./assets/img/${(j + this.num) * 10}.jpg)`;
      });
      const card = document.createElement('div');
      const specialClass = categoryScore == 0 ? 'card_inactive' : 'card_completed'; //categoryScore == 10 ? 'card_completed' : '';
      card.classList.add('category__card', 'card');
      if (specialClass) card.classList.add(specialClass);

      card.innerHTML = `
      <div class="card__header">
          <div class="card__title">${this.categories[j]}</div>
          <div class="card__score">${categoryScore}/10</div>
      </div>
      <div class="card__details">
        <img src="./assets/svg/radix-icons_reload.svg" alt="icon: reload">
        <h5 class="card__again">Play again</h5>
      </div>`;
      card.querySelector('.card__header').after(bgImg);
      document.querySelector('.content__inner').classList.remove('category-by-name');
      document.querySelector('.content__inner').append(card);
    }
  }

  async renderCategoryByName() {
    if (!this.imagesInfo) await this.setData();

    for (let i = 1; i <= 10; i++) {
      const bgImg = document.createElement('div');
      bgImg.classList.add('card__painting');
      this.getQuizInfo(i);

      this.loadImage(`./assets/img/${this.currentObj.imageNum}.jpg`).then(() => {
        this.getQuizInfo(i);
        bgImg.style.backgroundImage = `url(./assets/img/${this.currentObj.imageNum}.jpg)`;
      });

      const categoryCard = document.createElement('div');
      categoryCard.classList.add(
        'category__card',
        'card',
        `${this.currentObj.isGuessed == false ? 'card_inactive' : 'card_completed'}`,
      );
      categoryCard.innerHTML += `
        <div class="card__details card__picture-description">
          <p class="card__picture-info">${this.currentObj.author}</p>
          <p class="card__picture-info">${this.currentObj.name}</p>
          <p class="card__picture-info">${this.currentObj.year}</p>
        </div>`;
      categoryCard.prepend(bgImg);
      document.querySelector('.content__inner').classList.add('category-by-name');
      document.querySelector('.content__inner').append(categoryCard);
    }
  }
  async renderQuiz() {
    if (!this.imagesInfo) await this.setData();
    this.getQuizInfo();

    let randomObjArr;

    if (this.currentQuiz == '1') this.resetResultOfRound(this.categoryNum);

    if (settings.settings.timeMood) {
      settings.timer.time=settings.timer.initial;
      settings.timer.startTimer();
    }

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

    // settings.timer.stopTimer();

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
    this.getQuizInfo();
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
      btns = `<button class="btn" data-redirection=''>Cancel</button>
      <button class="btn btn_active" data-redirection='next-quiz'>Next</button>`;
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
      <div class="modal__result-img"></div>
        <h4 class="modal__score-state">${score}</h4>
        <p class="modal__phrase">${phrase}</p>
        <div class="modal__action">
          ${btns}
        </div>
      </div>
    </div>
  </div>
    `;
    this.playAudio(status);

    document.querySelector('.final-modal').addEventListener('click', e => {
      if (e.target.dataset.redirection == '') {
        window.location.hash = '';
      }
      if (e.target.dataset.redirection == 'next-quiz') {
        window.location.hash =
          this.quizType +
          '-quiz/' +
          this.categories[(this.categoryNum % 12) + 1].toLowerCase() +
          '/1';
      }
      if (e.target.dataset.redirection == 'current-quiz') {
        window.location.hash = this.quizType + '-quiz/' + this.quizCategory + '/1';
      }
    });
  }

  playAudio(status) {
    if (settings.settings.volume != 0) {
      const audio = document.createElement('audio');
      const audioList = {
        correct: './assets/audio/mixkit-achievement-bell-600.wav',
        wrong: './assets/audio/mixkit-losing-drums-2023.wav',
        'win-quiz': './assets/audio/mixkit-football-team-applause-509.wav',
        'lose-quiz': './assets/audio/mixkit-losing-marimba-2025.wav',
        'complete-quiz': './assets/audio/mixkit-unlock-game-notification-253.wav',
      };
      audio.volume = settings.settings.volume / 100;
      audio.src = audioList[status];
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
    return data.then(data => {
      document.querySelector(
        '.quiz__inner',
      ).innerHTML = `<div class="quiz__question">Which is ${data.currentObj.author} picture?</div>`;
      const quizAnswers = document.createElement('div');
      quizAnswers.classList.add('quiz__answers');

      for (let obj in data.randomObjArr) {
        const bgImg = document.createElement('div');
        let specialClass =
          data.currentObj.author == data.randomObjArr[obj].author ? 'correct' : 'wrong';
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
      <div class="quiz__answers">`;
      for (let obj in data.randomObjArr) {
        let specialClass =
          data.currentObj.author == data.randomObjArr[obj].author ? 'correct' : 'wrong';
        temp += `<button class="quiz__answer ${specialClass} btn">${data.randomObjArr[obj].author}</button>`;
      }
      temp += `</div>`;
      document.querySelector('.quiz__inner').innerHTML = temp;

      const bgImg = document.createElement('div');
      bgImg.classList.add('quiz__picture-question');

      this.loadImage(`./assets/img/${data.currentObj.imageNum}.jpg`).then(() => {
        bgImg.style.backgroundImage = `url(./assets/img/${data.currentObj.imageNum}.jpg)`;
      });

      document.querySelector('.quiz__answers').before(bgImg);
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

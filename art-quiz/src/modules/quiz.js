//TODO: refact: add component approach
//TODO: refact: rename routing and localStorage, turn localStorage into class

//TODO: change structure of categories db :null
//FIXME: use category db only for read name. To manage quiz use imagesInfo

class Quiz {
  constructor() {
    this.db = Promise.all([
      Quiz.getDataBase(
        'https://raw.githubusercontent.com/rolling-scopes-school/katiazakharina-JSFE2021Q3/art-quiz/art-quiz/src/assets/db/images.json?token=ARYOJCYONXTCKLWIKTIL5SDBTFQY2',
      ),
      Quiz.getDataBase(
        'https://raw.githubusercontent.com/rolling-scopes-school/katiazakharina-JSFE2021Q3/art-quiz/art-quiz/src/assets/db/categories.json?token=ARYOJC35SPP2FN72KJXLD73BTFQXO',
      ),
    ]);
  }
  static async getDataBase(path) {
    return await fetch(path).then(data => data.json());
  }

  getRandomNum(arr, start, end) {
    let random = ~~(Math.random() * (end - start + 1) + start);
    return arr.indexOf(random) == -1 ? random : this.getRandomNum(arr, start, end);
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
    this.db.then(db => console.log(this.categories = db[1][this.type]));

    if (localStorage.getItem('images-info') && localStorage.getItem('images-info') != 'undefined')
      return;
    console.log('nooo');
    return this.db.then(db => {
      db[0].images.forEach((i, index) => {
        i.isGuessed ??= false;
      });
      this.imagesInfo = db[0].images;
      this.categories = db[1][this.type];
    });
  }

  async renderCategories() {
    //TODO: refact: move to categotiesRender, this method should return object

    if (!this.categories) await this.setData();
    let temp = '';
    const num = window.location.hash.slice(1) == 'artist' ? 0 : 12;
    for (let j = 0; j < this.categories.length; j++) {
      //FIXME: smooth appearing by means back-image  //card_inactive
      let categoryScore = 0;
      for (let i = 0; i < 10; i++) {
        categoryScore += this.imagesInfo[(j + num) * 10 + i].isGuessed ? 1 : 0;
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
        ].toLowerCase()}" style="background-image: url(./assets/img/${(j + num) * 10}.jpg);"></div> 
        <div class="card__details">
        <img src="./assets/svg/radix-icons_reload.svg" alt="icon: reload">
        <h5 class="card__again">Play again</h5>
      </div>
      </div>
    `;
    }
    document.querySelector('.content__inner').innerHTML += temp;
  }

  async renderCategoryName() {
    let name = window.location.hash.slice(1).split('/')[1];
    if (!this.imagesInfo) await this.setData();
    let temp = '',
      num = window.location.hash.slice(1).split('/')[0] == 'artist' ? 0 : 12,
      categoryNum = this.categories.indexOf(name[0].toUpperCase() + name.slice(1)) + num;

    for (let i = 1; i <= 10; i++) {
      let currentObj = this.imagesInfo[categoryNum * 10 + i - 1];
      temp += `
        <div class="category__card card ${
          currentObj.isGuessed == false ? 'card_inactive' : 'card_completed'
        }">
          <div class="card__painting" style="background-image: url(./assets/img/${
            currentObj.imageNum
          }.jpg);"></div>
          <div class="card__details card__picture-description">
          <p class="card__picture-info">${currentObj.author}</p>
          <p class="card__picture-info">${currentObj.name}</p>
          <p class="card__picture-info">${currentObj.year}</p>
        </div>
        </div>
      `;
    }
    document.querySelector('.content__inner').innerHTML += temp;
  }
  async renderQuiz() {
    if (!this.imagesInfo) await this.setData();
    let name = window.location.hash.slice(1).split('/')[1].replace('-quiz', ''),
      num = window.location.hash.slice(1).split('/')[0] == 'artist-quiz' ? 0 : 12,
      categoryNum = this.categories.indexOf(name[0].toUpperCase() + name.slice(1)) + num,
      currentQuiz = window.location.hash.slice(1).split('/')[2];
    let currentObj = this.imagesInfo[categoryNum * 10 + +currentQuiz - 1],
      randomObjArr = [+currentObj.imageNum];

    if (currentQuiz == '1') {
      this.resetResultOfRound(categoryNum);
    }

    for (let i = 0; i < 3; i++) {
      randomObjArr.push(this.getRandomNum(randomObjArr, num ? 120 : 0, num ? 239 : 119)); //(num + 1) * 120 - (num ? 0 : 1)
    }
    randomObjArr = this.randomizeOrder(randomObjArr);
    randomObjArr = randomObjArr.map(num => {
      return this.imagesInfo[num];
    });
    //TODO: author can have more then one picture!
    return { randomObjArr, currentObj };
  }
  async checkAnswer() {
    if (!this.imagesInfo) await this.setData();

    let name = window.location.hash.slice(1).split('/')[1].replace('-quiz', ''),
      num = window.location.hash.slice(1).split('/')[0] == 'artist-quiz' ? 0 : 12,
      categoryNum = this.categories.indexOf(name[0].toUpperCase() + name.slice(1)) + num,
      currentQuiz = window.location.hash.slice(1).split('/')[2],
      currentObj = this.imagesInfo[categoryNum * 10 + +currentQuiz - 1];

    return currentObj;
  }
  resetResultOfRound(roundNum) {
    for (let i = 0; i < 10; i++) {
      this.imagesInfo[roundNum * 10 + i].isGuessed = false;
    }
  }
  async renderModal(status) {
    if (!this.imagesInfo) await this.setData();

    let name = window.location.hash.slice(1).split('/')[1].replace('-quiz', ''),
      num = window.location.hash.slice(1).split('/')[0] == 'artist-quiz' ? 0 : 12,
      categoryNum = this.categories.indexOf(name[0].toUpperCase() + name.slice(1)) + num,
      currentQuiz = window.location.hash.slice(1).split('/')[2],
      currentObj = this.imagesInfo[categoryNum * 10 + +currentQuiz - 1];

    document.querySelector('.quiz').innerHTML += `
    <div class="modal show ${status}" data-answer>
    <div class="container modal__container fadeIn">
      <div class="modal__content">
      <div class="modal__painting" style="background-image: url(./assets/img/${currentObj.imageNum}.jpg)"></div>
        <h4 class="modal__painting-name">${currentObj.name}</h4>
        <p class="modal__painting-description">${currentObj.author}, ${currentObj.year}</p>
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

    let name = window.location.hash.slice(1).split('/')[1].replace('-quiz', ''),
      num = window.location.hash.slice(1).split('/')[0] == 'artist-quiz' ? 0 : 12,
      categoryNum = this.categories.indexOf(name[0].toUpperCase() + name.slice(1)) + num,
      categoryScore = 0;

    for (let i = 0; i < 10; i++) {
      if (this.imagesInfo[categoryNum * 10 + i].isGuessed) categoryScore++;
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
    if ((categoryNum == 11 || categoryNum == 23) && categoryScore != 0) {
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
          window.location.hash.slice(1).split('/')[0] +
          '/' +
          this.categories[categoryNum + 1].toLowerCase() +
          '/1';
      }
      if (e.target.dataset.redirection == 'current-quiz') {
        window.location.hash =
          window.location.hash.slice(1).split('/')[0] +
          '/' +
          window.location.hash.slice(1).split('/')[1] +
          '/1';
      }
    });
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
        temp += `<div class="quiz__answer card__painting" style="background-image: url(../assets/img/${data.randomObjArr[obj].imageNum}.jpg);"></div>`;
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
      <div class="quiz__picture-question" style="background-image: url(../assets/img/${data.currentObj.imageNum}.jpg)"></div>
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

//TODO: refact: add component approach
//TODO: refact: rename routing and localStorage, turn localStorage into class

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
  async setData() {
    return this.db.then(db => {
      this.imagesInfo = db[0];
      this.categories = db[1][this.type];
    });
  }
  async renderCategories() {
    await this.setData();
    console.log(this.imagesInfo);
    let temp = '',
      num = 0;
    console.log(this.categories);
    for (let category in this.categories) {
      //FIXME: smooth appearing by means back-image  //card_inactive
      temp += `
      <div class="category__card card ${this.categories[category] ? '' : 'card_completed'}">
        <div class="card__header">
          <div class="card__title">${category}</div>
          <div class="card__score">${this.categories[category]}/10</div>
        </div>
        <div class="card__painting" style="background-image: url(../assets/img/${num}.jpg);"></div> 
        <div class="card__details">
        <img src="../assets/svg/radix-icons_reload.svg" alt="icon: reload">
        <h5 class="card__title hover-effect">Play again</h5>
      </div>
      </div>
    `;
      num++;
    }
    document.querySelector('.content__inner').innerHTML += temp;
  }
}
class ArtistQuiz extends Quiz {
  constructor() {
    super();
    this.type = 'artists';
  }
}
class PaintingQuiz extends Quiz {
  constructor() {
    super();
    this.type = 'painting';
  }
}
const artistQuiz = new ArtistQuiz(),
  paintingQuiz = new PaintingQuiz();

export { Quiz, artistQuiz, paintingQuiz };

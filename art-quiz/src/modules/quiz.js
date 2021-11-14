//TODO: refact: add component approach
//TODO: refact: rename routing and localStorage, turn localStorage into class

//TODO: change structure of categories db :null
//FIXME: use category db only for read name. To manage quiz use imageInfo

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
      db[0].images.forEach(i => {
        i.isGuessed = true;
      });
      this.imagesInfo = db[0].images;
      this.categories = db[1][this.type];
    });
  }
  async renderCategories() {
    //TODO: refact: move to categotiesRender, this method should return object

    if (!this.categories) await this.setData();
    let temp = '',
      num = window.location.hash.slice(1) == 'artist' ? 0 : 119;
    for (let category of this.categories) {
      //FIXME: smooth appearing by means back-image  //card_inactive
      let categoryScore = 0;
      for (let i = 0; i < 10; i++) {
        categoryScore += this.imagesInfo[~~(num / 10) * i].isGuessed ? 1 : 0;
      }

      temp += `
      <div class="category__card card ${
        categoryScore == 0 ? 'card_inactive' : categoryScore == 10 ? 'card_completed' : ''
      }">
        <div class="card__header">
          <div class="card__title">${category}</div>
          <div class="card__score">${categoryScore}/10</div>
        </div>
        <div class="card__painting" style="background-image: url(../assets/img/${num}.jpg);"></div> 
        <div class="card__details">
        <img src="../assets/svg/radix-icons_reload.svg" alt="icon: reload">
        <h5 class="card__title">Play again</h5>
      </div>
      </div>
    `;
      num += 10;
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
          <div class="card__painting" style="background-image: url(../assets/img/${currentObj.imageNum}.jpg);"></div>
          <div class="card__details card__picture-description">
          <h5 class="card__picture-info">${currentObj.author}</h5>
          <h5 class="card__picture-info">${currentObj.name}</h5>
          <h5 class="card__picture-info">${currentObj.year}</h5>
        </div>
        </div>
      `;
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

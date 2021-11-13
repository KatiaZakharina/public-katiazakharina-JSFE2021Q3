//TODO: refact: add component approach
//TODO: refact: rename routing and localStorage, turn localStorage into class
//FIXME: routing back

class Quiz {
  constructor() {
    // this.categoryList = new CategoryList();
  }
  static async getDataBase(path) {
    return await fetch(path).then(data => data.json());
  }
  setData(db) {
    db.then(db => {
      this.imagesInfo = db[0];
      this.categories = db[1][this.type]; //FIXME: promise
    });
  }
  renderCategories() {
    let temp = '',
      num = 0;
    console.log(this.categories);
    for (let category in this.categories) {
      //FIXME: smooth appearing by means back-image
      temp += `
        <div class="category__card card ${this.categories[category] ? '' : 'card_inactive'}">
          <div class="card__header">
            <div class="card__title">${category}</div>
            <div class="card__score">${this.categories[category]}/10</div>
          </div>
          <img class="card__painting" src="./assets/img/${num}.jpg" alt="painting"> 
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

// class CategoryList {
//   constructor() {
//     // this.categories = setCategories(db);
//   }
//   setCategories(categories) {}
// }
// class Category {
//   constructor() {
//     this.data = {};
//   }
// }
// class Question {
//   constructor(image, questionField, answerField) {
//     this.answer = image.answerField;
//     this.wrong = generateWrongVariant(answerField);
//   }
//   generateWrongVariant(answerField) {
//     return [1, 2, 3];
//   }
// }
// class Score {}

const artistQuiz = new ArtistQuiz(),
  paintingQuiz = new PaintingQuiz();

export { Quiz, artistQuiz, paintingQuiz };

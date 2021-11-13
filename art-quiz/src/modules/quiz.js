//TODO: refact: add component approach
//TODO: refact: rename routing and localStorage, turn localStorage into class 

class Quiz {
  constructor() {
    this.category = new CategoryList();
  }
  static async getDataBase(path) {
    return await fetch(path).then(data => data.json());
  }
  setData(db) {
    db.then(db => {
      this.imagesInfo = db[0];
      this.category = db[1][this.type];
      console.log(this.category);
    });
  }
  renderCategories(categories) {

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

class CategoryList {
  constructor() {
    // this.categories = setCategories(db);
  }
  setCategories(categories) {}
}
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

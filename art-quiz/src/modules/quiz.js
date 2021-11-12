//db async await fetch then data.json()
//TODO: new Image

class Quiz {
  constructor() {
    this.category = new CategoryList();
  }
  static async getDataBase(path) {
    return await fetch(path).then(data => data.json());
  }
  render() {}
  setLocalStorage() {
    return {
      ...this.category.obj(),
      ...this.score.obj(),
    };
  }
  getLocalStorage() {}
}
class ArtistQuiz extends Quiz {
  constructor() {
    super();
  }
}
class PaintingQuiz extends Quiz {}

class CategoryList {
  constructor() {
    // this.categories = setCategories(db);
  }
  setCategories() {}
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

//db async await fetch then data.json()

class Quiz {
  constructor(db) {
    // this.category = new CategoryList(db);
    // this.score = new Score();
  }
  render() {}
  setLocalStorage() {
    return {
      ...this.category.obj(),
      ...this.score.obj(),
    };
  }
  getLocalStorage(){

  }
}
class ArtQuiz extends Quiz {
  constructor() {
    super();
  }
}
class PaintingQuiz extends Quiz {}

// class CategoryList {
//   constructor(db) {
//     this.categories = setCategories(db);
//   }
//   setCategories(db) {}
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

const artQuiz = new ArtQuiz(),
  paintingQuiz = new PaintingQuiz();

export { artQuiz, paintingQuiz };

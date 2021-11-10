//db async await fetch then data.json()

class Quiz {
  constructor(db) {
    this.category = new CategoryList(db);
    this.score = new Score();
  }
  render() {}
}
class ArtQuiz extends Quiz {
  constructor() {
    super();
  }
}
class PaintingQuiz extends Quiz {}

class CategoryList {
  constructor(db) {
    this.categories = setCategories(db);
  }
  setCategories(db) {}
}
class Category {
  constructor() {
    this.data = {};
  }
}
class Question {
  constructor(image, questionField, answerField) {
    this.answer = image.answerField;
    this.wrong = generateWrongVariant(answerField);
  }
  generateWrongVariant(answerField) {
    return [1, 2, 3];
  }
}
class Score {}

class QuizFactory {
  static list = {
    art: ArtQuiz,
    painting: PaintingQuiz,
  };
  create(type) {
    if (!this[type + 'Instance']) {
      const QuizType = QuizFactory.list[type];
      this[type + 'Instance'] = new QuizType();
    }
    return this[type + 'Instance'];
  }
}
const factory = new QuizFactory();

export default QuizFactory;

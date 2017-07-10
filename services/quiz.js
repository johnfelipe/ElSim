const Question = require('../models/question');

class QuizService {
    static saveOne(question) {
        let q = new Question(question);
        return q.save();
    }

    static checkQuestion(question, answer) {
        return question.correct === answer;
    }

    static find() {
        return Question.find({});
    }

    static findById(id) {
        return Question.findOne({_id: id});
    }

    static removeOne(id) {
        return Question.findByIdAndRemove({_id: id});
    }

    static remove() {
        return Question.find({}).remove();
    }

}
module.exports = QuizService;
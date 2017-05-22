
const Question = require('../models/question');

class QuizService {
    constructor() {

    }
    static saveOne(question) {
        let q = new Question(question);
        return q.save();
    }

    static checkQuestion(done) {
        return done(new Error('not yet implemented'), null);
    }

    static find() {
        return Question.find({});
    }

    static removeOne(id) {
        return Question.findByIdAndRemove({_id: id});
    }

    static remove() {
        return Question.find({}).remove();
    }

}
module.exports = QuizService;
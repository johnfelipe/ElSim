const ProgressBar = require('progress');

class ProgressBarUtil {
    constructor(title, length) {
        /**
         * Para la barra de progresos.
         */
        this.bar = new ProgressBar(title + ' [:percent] '.blue + ' [:bar] '.yellow, {
            complete: '#',
            incomplete: ' ',
            total: length,
            clear: true
        });
    }

    addTick(){
        this.bar.tick();
    }
}
module.exports = ProgressBarUtil;
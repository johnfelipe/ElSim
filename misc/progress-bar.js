const ProgressBar = require('progress');

/** Utility to create a console progress bar */
class ProgressBarUtil {

    /**
     *
     * @param title
     * @param length
     */
    constructor(title, length) {
        this.bar = new ProgressBar(title + ' [:percent] '.blue + ' [:bar] '.yellow, {
            complete  : '#',
            incomplete: ' ',
            total     : length,
            clear     : false
        });
    }

    /**
     * Increments one tick to the bar.
     */
    addTick() {
        this.bar.tick(undefined, undefined);
    }
}
module.exports = ProgressBarUtil;
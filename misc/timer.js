/** Utility to size execution times. */
class Timer {

    /**
     *
     * @param name
     */
    constructor(name) {
        this._name     = name;
        this.startTime = 0;
        this.endTime   = 0;
    }

    /**
     * Starts to count time.
     */
    start() {
        this.startTime = new Date();
    }

    /**
     * Ends to count time.
     */
    end() {
        this.endTime = new Date();
    }

    get name() {
        return this._name;
    }

    /**
     * Result in milliseconds.
     * @return {number}
     */
    finishMilliseconds() {
        return this.endTime - this.startTime;
    }

    /**
     * Result in seconds.
     * @return {number}
     */
    finishSeconds() {
        return (this.endTime - this.startTime) / 1000;
    }
}
module.exports = Timer;
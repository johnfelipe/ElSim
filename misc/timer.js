class Timer{

    constructor(name) {
        this._name = name;
        this.startTime = 0;
        this.endTime = 0;
    }

    start(){
        this.startTime = new Date();
    }

    end(){
        this.endTime = new Date();
    }

    get name(){
        return this._name;
    }

    finishMilliseconds(){
        return this.endTime - this.startTime;
    }

    finishSeconds(){
        return (this.endTime - this.startTime) / 1000;
    }
}
module.exports = Timer;
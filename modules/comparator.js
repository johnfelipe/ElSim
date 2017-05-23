
let diff = require('deep-diff').diff;
const console = require('better-console');

class Comparator {
    constructor(wholeSet) {
        this._set1 = {};
        this._set2 = {};
        this.wholeSet = wholeSet;
        this._differences = {};
    }

    get set1 (){
        return this._set1;
    }
    get set2(){
        return this._set2;
    }

    get differences(){
        return this._differences;
    }

    fillDifferences(result1, result2, perc1, perc2) {

        this._differences.results = diff(result1, result2);

        this._differences.parameters = diff({
            percentage: perc1,
            wholeCountry: this._set1.wholeCountry,
            communities: this._set1.communities
        }, {
            percentage: perc2,
            wholeCountry: this._set2.wholeCountry,
            communities: this._set2.communities
        });
    }

    fillSets() {

        this._set1.wholeCountry = this.wholeSet.wholeCountry1;

        this._set1.communities = this.wholeSet.aggregateCommunities1;

        this._set2.wholeCountry = this.wholeSet.wholeCountry;

        this._set2.communities = this.wholeSet.aggregateCommunities;

        let keys = Object.keys(this.wholeSet);
        for (let key of keys) {

            if (key.includes('1') && key !== 'percentage' && key !== 'percentage1' && key !== 'resultSelected') {
                this._set1[key.split('1')[0]] = this.wholeSet[key];
            }
            if (!key.includes('1') && key !== 'percentage' && key !== 'percentage1' && key !== 'resultSelected') {
                this._set2[key] = this.wholeSet[key];
            }
        }
    }
}
module.exports = Comparator;
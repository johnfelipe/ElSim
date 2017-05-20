/* jshint esversion: 6 */
let diff = require('deep-diff').diff;
const console = require('better-console');

class Comparator {
    constructor(wholeSet) {
        this.set1 = {};
        this.set2 = {};
        this.wholeSet = wholeSet;
        this.differences = {};
    }

    getSet1 (){
        return this.set1;
    }
    getSet2(){
        return this.set2;
    }

    getDifferences(){
        return this.differences;
    }

    fillDifferences(result1, result2, perc1, perc2) {

        this.differences.results = diff(result1, result2);

        this.differences.parameters = diff({
            percentage: perc1,
            wholeCountry: this.set1.wholeCountry,
            communities: this.set1.communities
        }, {
            percentage: perc2,
            wholeCountry: this.set2.wholeCountry,
            communities: this.set2.communities
        });
    }

    fillSets() {

        this.set1.wholeCountry = this.wholeSet.wholeCountry1;

        this.set1.communities = this.wholeSet.aggregateCommunities1;

        this.set2.wholeCountry = this.wholeSet.wholeCountry;

        this.set2.communities = this.wholeSet.aggregateCommunities;

        let keys = Object.keys(this.wholeSet);
        for (let key of keys) {

            if (key.includes('1') && key !== 'percentage' && key !== 'percentage1' && key !== 'resultSelected') {
                this.set1[key.split('1')[0]] = this.wholeSet[key];
            }
            if (!key.includes('1') && key !== 'percentage' && key !== 'percentage1' && key !== 'resultSelected') {
                this.set2[key] = this.wholeSet[key];
            }
        }
    }
}
module.exports = Comparator;
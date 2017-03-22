/* jshint esversion: 6 */
const diff = require('deep-diff').diff;

{
    const fillDifferences = (result1, result2, perc1, perc2, set1, set2) => {
        let differences = {};
        differences.results = diff(result1, result2);
        differences.parameters = diff({
            percentage: perc1,
            wholeCountry: set1.wholeCountry,
            communities: set1.communities
        }, {
            percentage: perc2,
            wholeCountry: set2.wholeCountry,
            communities: set2.communities
        });
        return differences;
    };

    const fillSets = (set1, set2, wholeSet) => {

        set1.wholeCountry = wholeSet.wholeCountry1;
        set1.communities = wholeSet.aggregateCommunities1;

        set2.wholeCountry = wholeSet.wholeCountry;
        set2.communities = wholeSet.aggregateCommunities;

        for (let key in wholeSet) {
            if (key.includes('1') && key !== 'percentage' && key !== 'percentage1' && key !== 'resultSelected') {
                set1[key.split('1')[0]] = wholeSet[key];
            }
            if (!key.includes('1') && key !== 'percentage' && key !== 'percentage1' && key !== 'resultSelected') {
                set2[key] = wholeSet[key];
            }
        }
    };

    module.exports = {
        fillDifferences,
        fillSets
    };

}
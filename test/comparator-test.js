const chai       = require('chai');
const Comparator = require('../modules/comparator');
chai.should();

describe('Comparator', () => {
    it('fillDifferences', () => {
        let c = new Comparator(null);

        c.fillDifferences(
            {A: 2, B: 4},
            {A: 1, B: 3},
            3.0,
            4.0
        );

        c.differences.results[0].lhs.should.be.equal(2);
        c.differences.results[0].rhs.should.be.equal(1);
        c.differences.results[1].lhs.should.be.equal(4);
        c.differences.results[1].rhs.should.be.equal(3);
    });
});

const chai     = require('chai');
const expect   = chai.expect;
const District = require('../modules/district');
chai.should();


describe('Single district', () => {
    it('compute', () => {
        let d = new District(
            [340000, 280000, 160000, 60000, 15000],
            ['A', 'B', 'C', 'D', 'D'],
            {mandates: 7, blankVotes: 0, percentage: 3},
            false
        );

        let result = d.compute();

        result.numberOfVotes.should.be.equal(855000);
        result.minNumberOfVotes.should.be.equal(25650);
        result.parties.should.be.deep.equal({
            A: 3, B: 3, C: 1, D: 0
        });
    });
});

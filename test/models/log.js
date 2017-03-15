/* jshint esversion: 6 */
const LogService = require('../../services/logs');
describe('Log', () => {
    it('save a log',() => {
        LogService.save({
            message: 'hello',
            date: new Date()
        }, (err) => {
            err.should.equal(undefined);
        });
    });
    it('save a wrong log',() => {
        LogService.save({
            message: 1,
            date: new Date()
        }, (err) => {
            err.should.not.equal(undefined);
        });
    });
});

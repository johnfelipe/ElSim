/* jshint esversion: 6 */
'use strict';
const app = require('./../app'),
    http = require('http'),
    expect = require('chai').expect;

/** Test Miscellaneus */
describe('Miscellaneous', () => {
    describe('NodeJS Clustering', () => {
        it('Workers', nodeJsClustering);
    });
    describe('NodeJS Performance', () => {
        it('Loop', nodeJsPerformance);
    });
});

const nodeJsClustering = (done) => {
    const numCPUs = require('os').cpus().length;
    expect(numCPUs).to.be.greaterThan(0);
    done();
};

const nodeJsPerformance = (done) => {
    console.time('someFunction');
    someFunction();
    console.timeEnd('someFunction');
    function someFunction(){
        let a = 0.2;
    }
    done();
};
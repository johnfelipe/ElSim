angular.module('boilerplate').factory('MyService', function ($http,CONSTANTS) {
    var factory = {};
    var baseUrl = CONSTANTS.API_URL;

    factory.hello = function (done) {
        makeRequest('GET', baseUrl, done);
    };

    factory.findAll = function (done) {
        makeRequest('GET', baseUrl + 'mobiles', done);
    };

    factory.findOne = function (id, done) {
        makeRequest('GET', baseUrl + 'mobiles/' + id, done);
    };

    factory.createOne = function (done) {
        makeRequest('POST', baseUrl + 'mobiles', done);
    };

    factory.updateOne = function (id, done) {
        makeRequest('PUT', baseUrl + 'mobiles/' + id, done);
    };

    factory.deleteOne = function (id, done) {
        makeRequest('DELETE', baseUrl + 'mobiles/' + id, done);
    };

    function makeRequest(method, url, done) {
        $http({
            method: method,
            url: url
        }).then(function successCallback(response) {
            done(response);
        }, function errorCallback(response) {
            done(response);
        });
    }

    return factory;
});


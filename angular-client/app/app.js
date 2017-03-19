angular.module('boilerplate', ['ngRoute']).config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(false);

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController',
            controllerAs: 'contact'
        })
        .when('/setup', {
            templateUrl: 'views/setup.html',
            controller: 'SetupController',
            controllerAs: 'setup'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angular.module('boilerplate').controller('MainController', function ($scope,MyService) {
    console.log('Hello from MainController');
    MyService.hello(function(response){

    });
});



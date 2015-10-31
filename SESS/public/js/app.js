'use strict';

angular.module('sessApp', ['ngResource', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            // Login page
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            // Error page
            .otherwise({
                redirectTo: '/error'
            });
    })

// Cache templates.  When the app loads, Angular will have the
// browser make a series of requests for these files and store
// then in the $templateCache service.
.run(function($templateCache, $http) {
    $http.get('views/login.html', {
        cache: $templateCache
    });
    $http.get('views/test.html', {
        cache: $templateCache
    });
});

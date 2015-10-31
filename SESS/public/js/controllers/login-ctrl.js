'use strict';

angular.module('sessApp')
    .controller('LoginCtrl', function($scope, $http) {
        $scope.signIn = function() {
        	debugger;
            var data = {
            	username: $scope.username,
            	password: $scope.password
            };
            $http.post("/api/login", data).success(function(response, status) {
                debugger;
            })

        };

    });

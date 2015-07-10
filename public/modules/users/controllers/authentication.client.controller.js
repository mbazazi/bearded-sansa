'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', '$rootScope', '$state', 'myAppointment', 
	function($scope, $http, $location, Authentication, $rootScope, $state, myAppointment) {
		$scope.authentication = Authentication;
	/*	var myAppointmentObj = myAppointment.getData();
		$scope.credentials = myAppointmentObj;
		console.log($scope.credentials);*/
	/*
	if ($scope.credentials.password !== $scope.credentials.password1){
			$scope.error= 'Password do not match';
		} else {
			$scope.error = '';
		}*/
		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');
			$scope.$on('error', function(event, data){
				$scope.error = data.message;
			
			});

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				console.log(response);
				$scope.authentication.user = response;
				
				if (response.token ===''){
					$location.path('/payment');
				} else {
					$location.path('/user/home');
				}
				
				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
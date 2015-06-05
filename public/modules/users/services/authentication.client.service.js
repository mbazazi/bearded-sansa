'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [ '$http',  '$state', '$location', '$window', '$rootScope',  
	function($http, $state, $location, $window, $rootScope) {
		 
		var _this = this;
		var _user_exists = {};
		_this.userRole = {};
		_this.showAdmin = false;
		_this._data = {
			user: window.user
		};

		if (_this._data.user) {

			switch(_this._data.user.roles[0]) {
			    case 'staff':
			    	_this.userRole = 'staff';
			        break;
	 			case 'admin':
			    	_this.userRole = 'admin';
			    	_this.showAdmin = true;
			        break;
			    default:
			       _this.userRole = 'user';
			}
		}

		
		_this.signUp = function(credentials, callback){
			$http.post('/auth/signup', credentials).success(function(response, message) {
				callback(response);
			}).error(function(response) {
				_this.error = response.message;
			});
		};

		_this.check_username = function (obj, callback){
					$http.post('/auth/check_username', obj).success(function(response) {
					
					callback(response);

					// And sets the error parameter to null
					/*$location.url('/signin');*/
				}).error(function(response) {
					$rootScope.$broadcast('error', response);
				});
		};

		_this.signin = function(credentials, callback) {
			$http.post('/auth/signin', credentials).success(function(response) {

				// If successful we assign the response to the global user model
				_this._data.user = response;
				_this.user = response;
				console.log(_this._data.user);
				if (!response.token){
					$state.go('profile.payment');
				} else {
				// And redirect to the index page
					$state.go('rdash');
				}
			}).error(function(response) {
				$rootScope.$broadcast('error', response);
			});
		};


		_this.createUser = function(credentials, callback) {
			$http.post('/auth/signup', credentials)
			.success(function(response) {
				callback(response);
			}).error(function(response) {
				_this.error = response.message;
			});
		};

		_this.signout = function() {
			$http.get('/auth/signout').success(function(response) {
				// If successful we assign the response to the global user model
				console.log(response);
				$window.location.reload();
				// And redirect to the index page
			}).error(function(response) {
				_this.error = response.message;
			});
		};

		return _this;
	}
]);
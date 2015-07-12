'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [ '$http',  '$state',  '$location', '$window', '$rootScope',  
	function($http, $state,  $location, $window, $rootScope) {
		 
		var _this = this;
		var _user_exists = {};
		_this.appointment_query ={};
		_this.userRole = {};
		_this.showAdmin = false;
		_this._data = {
			user: window.user
		};
		_this.isClient = false;
		if (_this._data.user) {

			switch(_this._data.user.roles[0] || _this.user.roles[0]) {
			    case 'staff':
			    	_this.userRole = 'staff';
			    	_this.appointment_query = { 
			    		staff_id: _this._data.user._id, 
			    		cancelled: false
			    	};
			        break;
	 			case 'admin':
			    	_this.userRole = 'admin';
			    	_this.showAdmin = true;
			    	_this.appointment_query = { 
			    		cancelled: false
			    	};
			        break;
			    default:
			       _this.userRole = 'user';
			        _this.isClient = true;
			       _this.appointment_query = { 
			    		client: _this._data.user._id, 
			    		cancelled: false
			    	};
			}
		}
		
		_this.signUp = function(credentials, callback){
			$http.post('/auth/signup', credentials).success(function(response, message) {
				_this._data.user = response;
				_this.user = response;
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

				if (!response.stripeCustomer){
					$state.go('profile.payment');
				} else if(response.displayName === null) {
					$state.go('profile');
				}else{
				// And redirect to the index page
					$state.go('rdash.dash');
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
				console.log(response.user);
				console.log(response);
				_this._data.user = response;
				_this.user = response;
/*				$window.location.reload();
*/				// And redirect to the index page
			}).error(function(response) {
				_this.error = response.message;
			});
		};

		return _this;
	}
]);
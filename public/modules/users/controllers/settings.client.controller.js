'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$rootScope', '$http', '$location', 'Users', 'Authentication', 'Payment', '$state', 'geocoder', 'Upload', 'ngToast', 'Appointments',  '$stateParams', 'Staff', '$modal', 'myAppointment', 'notifications', 
	function($scope, $rootScope, $http,  $location, Users, Authentication, Payment, $state, geocoder, Upload, ngToast, Appointments, $stateParams, Staff, $modal, myAppointment, notifications) {
		$scope.user = Authentication.user;
		$scope.appointment = myAppointment.getData();
		$scope.authentication = Authentication;
		$scope.appointments = undefined;
		$scope.userFlag = true;
		$scope.btnText = 'Show Users';
		$scope.def_av = '../../../../img/flat-avatar.png';
		if ($scope.user.stripeCustomer){
			$scope.card = $scope.user.stripeCustomer.sources.data[0];
		}
		 $scope.role = $scope.authentication.userRole;

		
		$scope.save_customer = Payment;
		$scope.geocoder = geocoder;
		$scope.viewing = {};

		//This listens for the broadcast from the payment Service get token method
		$rootScope.$on('card_change', function(){
			 
			 console.log($scope.appointment);
			$scope.save_customer.updateUserTokens($scope.user, function(res){
				$scope.card = res.stripeCustomer.sources.data[0];

				ngToast.create({
					className: 'success',
					content: 'Your card details were updated successfully'
				});
					if ($scope.appointment){
						$scope.appointment.client = $scope.user._id;
						$scope.appointment.payment_entered = true;
						var appointment = new Appointments($scope.appointment);
						 appointment.$save(function(res){
						 	console.log(res);
						 	notifications.showSuccess({message: 'Success! You should recieve an email shortly'});
							$state.go('rdash.dash');
						});
					}

			});
			
		});

			//This listens for the broadcast from the payment Service get token method
		$rootScope.$on('show_card', function(){
			$state.reload();			
		});

		$scope.remove= function(user){
			user.$remove(function(res){
				console.log(res);
			});
		};

		$scope.findOne = function(app_query) {
			$scope.viewing = Users.get({
				id: $stateParams.userId
			});
		};
			
		if($stateParams.userId){
			$scope.findOne($stateParams.userId);
		}

		$scope.usersAppointments = function(){
				Appointments.query(app_query).$promise.then(function(res){
				if (res.length > 0){
					$scope.appointments = res;
					$scope.total_apps = $scope.appointments.length;	

				} else {
					$scope.msg = 'You have no appointments';
					$scope.total_apps = res.length;
				}				
			});
		};



		//Functions related to Client (users) STARTS
		$scope.openModal = function(user){
			var modalInstance = $modal.open({
			      templateUrl: 'modules/users/views/settings/payment.modal.view.html',
			      controller: 'PaymentModalCtrl',
			      size: 'sm',
			      scope: $scope, 
			      resolve: { 
			        user_card: function () {
			          return user;
			        }, 
			        payment: ['Payment', function(Payment){
			        	return Payment;
			        }]
			      }
			    });

			    modalInstance.result.then(function (selectedItem) {
			    	console.log(selectedItem);
			      $scope.selected = selectedItem;
			    }, function () {
			      $scope.modalInstance = null;
			    });


		}
		$scope.showUsers = function (){
			$scope.userFlag = !$scope.userFlag;
			if(!$scope.userFlag){
				$scope.btnText = 'Show Users';
				Staff.query({roles: 'staff'}).$promise.then(function(res){
				$scope.users = res;
				$scope.total_users = $scope.users.length;	
				});
			} else {
				$scope.btnText = 'Show Staff';
			$scope.users = Users.query();
			$scope.show_table = !$scope.show_table;
			}
		};	

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				 $scope.geocoder.geocode($scope.user)
				 .success(function(res, status){
				 		var results = res.results[0].geometry.location;
				 		
				 		$scope.user.address.main_address.lat = results.lat;
				 		$scope.user.address.main_address.lng = results.lng;
				 }).
				 error(function(res){
				 	ngToast.create({
				 		className: 'danger',
				 		content: res.message
				 	});
				 });

				var user = new Users($scope.user);
				
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;

					ngToast.create({
				 		className: 'success',
				 		content: 'Your profile updated successfully'
				 	});
					$state.go('dash');

				}, function(response) {
					ngToast.create({
				 		className: 'danger',
				 		content: response.data.message
				 	});
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};
		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

 
	}
]);
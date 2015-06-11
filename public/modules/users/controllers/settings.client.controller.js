'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$rootScope', '$http', '$location', 'Users', 'Authentication', 'Payment', '$cookieStore', '$state', 'geocoder', 'Upload', 'ngToast', 'Appointments',  '$stateParams',
	function($scope, $rootScope, $http,  $location, Users, Authentication, Payment, $cookieStore, $state, geocoder, Upload, ngToast, Appointments, $stateParams) {
		$scope.user = Authentication.user;
		$scope.authentication = Authentication;
		$scope.appointments = null;
		$scope.def_av = '../../../../img/flat-avatar.png';
		if ($scope.user.stripeCustomer){
			$scope.card = $scope.user.stripeCustomer.sources.data[0];
		}
		console.log($stateParams);
		/*if($stateParams.userId){
			console.log($stateParams.userId);
			$scope.findOne($stateParams.userId);
		}*/
		$scope.save_customer = Payment;
		$scope.geocoder = geocoder;
		$scope.viewing = {};

		//This listens for the broadcast from the payment Service get token method
		$rootScope.$on('card_change', function(){
			$scope.save_customer.updateUserTokens($scope.user, function(res){
				$scope.card = res.stripeCustomer.sources.data[0];
				ngToast.create({
					className: 'success',
					content: 'Your card details were updated successfully'
				});
			});
			
		});

		/*$scope.findOne = function() {
			$scope.viewing = Users.get({
				id: $stateParams.userId
			});
			console.log($scope.viewing);
		};*/
/*
		$scope.usersAppointments = function(user){
			var app_query = {};
			console.log(user);
			if (role === 'user'){
				app_query = {
					client[0]._id = id;
				}
			} else if (role === 'staff') {
				app_query = {
					staff_id[0]._id = id;
				}
			};
		};
			console.log(app_query);
			Appointments.query(app_query).$promise.then(function(res){
				console.log(res.length);
				if (res.length > 0){
					$scope.appointments = res;
					console.log(res);
					$scope.total_apps = $scope.appointments.length;	

				} else {
					$scope.msg = 'You have no appointments';
					$scope.total_apps = res.length;
				}				
			});
		};
*/
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

 /*               	//For the image upload
 				$scope.single = function(image) {
                    console.log(image);
                    var formData = new FormData();
                    formData.append('image', image.file, image.file.name);
                    formData.append('dataURL', image.resized.dataURL);
                    formData.append('img_type', image.resized.type);

                    $http.post('auth/uploadAvatar', formData, {
                        headers: { 'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function(result) {
                    	console.log(result);
                    	$scope.user.profile_pic = result.src;
                        $scope.sizeInBytes = result.size;

                        // create a toast with settings:
						ngToast.create({
						  className: 'success',
						  content: result.msg, 
						  timeout: 2000
						});
                    });
    			};


                  $scope.$watch('files', function () {
		       	 console.log($scope.files);
		       	  $scope.upload($scope.files);
		   		 });
		
					//For the image uplaod
		 console.log(Upload);

		    $scope.upload = function (files) {
		    	console.log(files);
		        if (files && files.length) {
		            for (var i = 0; i < files.length; i++) {
		                var file = files[i];
		                Upload.upload({
		                    url: 'auth/uploadAvatar',
		                    fields: {'username': $scope.username},
		                    file: file
		                }).progress(function (evt) {
		                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
		                }).success(function (data, status, headers, config) {
		                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
		                });
		            }
		        }
		    };*/
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$rootScope', '$http', '$location', 'Users', 'Authentication', 'Payment', '$cookieStore', '$state', 'geocoder', 'Upload', 'ngToast',  
	function($scope, $rootScope, $http,  $location, Users, Authentication, Payment, $cookieStore, $state, geocoder, Upload, ngToast) {
		$scope.user = Authentication.user;
		$scope.def_av = '../../../../img/flat-avatar.png';
		console.log($scope.def_av);
		if ($scope.user.token){
			$scope.card = $scope.user.token.card;
		}
		

		$scope.save_customer = Payment;
		$scope.geocoder = geocoder;

		$rootScope.$on('card_change', function(){
			console.log($scope.card);
			$scope.card = $cookieStore.card;
			console.log($scope.card);
			$state.go('profile');
			
		});


/*		$scope.user = $scope.save_customer.token;
*/		$scope.authentication = Authentication;


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
			console.log($scope.user);
			if (isValid) {
				$scope.success = $scope.error = null;
				 $scope.geocoder.geocode($scope.user)
				 .success(function(res, status){
				 console.log(res);
				 		var results = res.results[0].geometry.location;
				 		$scope.user.address.main_address.lat = results.lat;
				 		$scope.user.address.main_address.lng = results.lng;
			
				 	console.log($scope.user);

				 }).
				 error(function(res){
				 	console.log(res);
				 });

				var user = new Users($scope.user);
				
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
					$state.go('dash');

				}, function(response) {
					console.log(response);
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

			$scope.$watch('save_customer', function(newval, old){
				if(newval !== old){
				$scope.user.token = newval.token;	
				console.log($scope.user.token);
				$scope.save_customer.updateUserTokens($scope.user);

				}
			}, true);

                	//For the image upload
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
						  content: result.msg
						});
                    });
    			};

/*
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
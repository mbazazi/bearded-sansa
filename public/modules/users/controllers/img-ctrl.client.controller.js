'use strict';

angular.module('users').controller('ImgCtrl', ['$scope', 'Upload', 'Authentication', 'Users',
	function($scope, Upload, Authentication, Users) {
		$scope.user = Authentication.user;
                  $scope.$watch('files', function () {
		       	 console.log($scope.files);
		       	  $scope.upload($scope.files);
		   		 });
		
					//For the image uplaod

		    $scope.upload = function (files) {
		    	console.log(files);
		        if (files && files.length) {
		            for (var i = 0; i < files.length; i++) {
		                var file = files[i];
		                Upload.upload({
		                    url: 'auth/uploadAvatar',
		                    fields: {
		                    	'id': $scope.user._id	
		                },
		                    file: file
		                }).progress(function (evt) {
		                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);

		                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
		                }).success(function (data, status, headers, config) {

		                	//updates the user record with the Image URL
		                	console.log(data);
		                	console.log(config);
		                	/*var user = new Users($scope.user);
							
							user.$update(function(response) {
								$scope.success = true;
								Authentication.user = response;
								console.log(response);

							}, function(response) {
								console.log(response);
								$scope.error = response.data.message;
							});*/
		                    console.log('file ' + config.file.name + ' uploaded. Response: ' + data.msg);
		                });
		            }
		        }
		    };
	}
]);
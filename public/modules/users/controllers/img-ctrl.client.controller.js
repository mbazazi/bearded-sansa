'use strict';

angular.module('users').controller('ImgCtrl', ['$scope', 'Upload', 'Authentication', 'Users', 'ngToast',
	function($scope, Upload, Authentication, Users, ngToast) {
		$scope.user = Authentication.user;
		$scope.preview = Authentication.user.profile_pic;
                 $scope.$watch('files', function () {
		       	  $scope.upload($scope.files);
		   		 });
		
					//For the image uplaod

		    $scope.upload = function (files) {
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
		                	/*if (status === 200){
		                		var user = new Users(data);

		                	}*/
		                	//updates the user record with the Image URL
		                	var patharray = [];

		                	var profile_pic_path = '';

		                	var profile_pic_path = data.path.replace('/Users/Bazazi/Desktop/meanJS/public', '');
		                	$scope.preview = profile_pic_path;
		                	$scope.user.profile_pic = profile_pic_path;
		                	var user = new Users($scope.user);
							
							user.$update(function(response) {
								$scope.success = true;

								ngToast.create({
								  className: 'success',
								  content: 'Your Profile Picture was updated successfully', 
								  timeout: 4000
								});

								Authentication.user = response;

							}, function(response) {
								console.log(response);
								// create a toast with settings:
								ngToast.create({
								  className: 'danger',
								  content: response.data.message
								});
								
							});
		                    console.log('file ' + config.file.name + ' uploaded. Response: ' + data.msg);
		                });
		            }
		        }
		    };
	}
]);
'use strict';

angular.module('users').controller('ImgCtrl', ['$scope', 'Upload', 'Authentication', 'Users', 'ngToast', '$http',
	function($scope, Upload, Authentication, Users, ngToast, $http) {
		$scope.user = Authentication.user;
		$scope.preview = $scope.user.profile_pic;

          $scope.imageCropResult = null;
          $scope.showImageCropper = false;
          $scope.theResult = {};
          $scope.showImg = true;
			$scope.showImageFunction;

          $scope.showImageFunction = function(){
          	if ($scope.user.profile_pic && $scope.imageCropStep ===1 ){
          	$scope.showImg = true;
          } else if($scope.user.profile_pic && $scope.imageCropStep ===2) {
			$scope.showImg = false;
          }
          };

          

          $scope.$watch('imageCropResult', function(newVal) {
            if (newVal) {
            	/*$scope.imageCropResult = {
            		dataURL: newVal, 
            		
            	};*/
/*            	$scope.croppedImgUpload($scope.imageCropResult);
*/              console.log('imageCropResult', newVal);
				var theResult = {
				 	dataURL: newVal, 
				 	lastname: Authentication.user.lastName,
            		firstname: Authentication.user.firstName
				 };
				 console.log(theResult);
				 $scope.croppedImgUpload(theResult);
            }
            
          });
/*
				console.log($scope.preview);

                 $scope.$watch('files', function () {
		       	 /* $scope.upload($scope.files);
		   		 });*/
		
		$scope.croppedImgUpload = function(base64ImgObject){
			console.log('From the Cropped Image Upload Function');
			$http.post('/auth/uploadAvatar', base64ImgObject)
			.success(function(data, status, headers, config){
				console.log(data);
				console.log(status);
				console.log(data);
				if (status === 200){
                		var user = new Users(data);

                	}
		                	//updates the user record with the Image URL
		              		var patharray = [];
		                	var profile_pic_path = data.path.replace('/Users/Bazazi/Desktop/meanJS/public', '');
		                	$scope.preview = profile_pic_path;
		                	$scope.user.profile_pic = data.dataURL;
		                	var user = new Users($scope.user);
							
							user.$update(function(response) {
								$scope.success = true;
								$scope.imageCropStep =1
								ngToast.create({
								  className: 'success',
								  content: 'Your Profile Picture was updated successfully', 
								  timeout: 4000
								});

								Authentication.user = response;
								$scope.preview = Authentication.user.profile_pic;
							}, function(response) {
								console.log(response);
								// create a toast with settings:
								ngToast.create({
								  className: 'danger',
								  content: response.data.message
								});
								
							});





			}).error(function(data, status, headers, config){
				console.log(data);
			});
		}
					//For the image uplaod

		  /*  $scope.upload = function (files) {
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
		                if (status === 200){
		                		var user = new Users(data);

		                	}
		                	//updates the user record with the Image URL
		                	var patharray = [];
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
		    }*/
	}
]);
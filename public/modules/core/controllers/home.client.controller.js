'use strict';


angular.module('core').controller('HomeController', ['$scope', '$rootScope', 'Authentication', '$http', '$location', '$state', 'myAppointment', 'Payment', 'Users', 'Appointments', 'geocoder', 'notifications', '$locale', 
	function($scope, $rootScope, Authentication, $http, $location, $state, myAppointment, Payment, Users, Appointments, geocoder, notifications, $locale) {
		// This provides Authentication context.
		var hourly = 125;
	
	/*	This is for GEOLOCATION OF THE USER for currency
		 if(navigator.geolocation) {
		    var browserSupportFlag = true;
		    navigator.geolocation.getCurrentPosition(function(position) {
		    	geocoder.geolocate(position);

		    }, function() {
		      handleNoGeolocation(browserSupportFlag);
		    });
		  }

		var country_code = geocoder.getResults();
		console.log(country_code);
*/
		$scope.authentication = Authentication;
		$scope.payment = Payment;
		$scope.user_hadNoAccont = true;
		$scope.myAppointment = myAppointment;
		$rootScope.user_exists = null;
			$scope.$on('error', function(event, data){
				$scope.error = data.message;
			});
			console.log($state.current.name);
			$scope.$watch('myform', function (oldval, newval){
		   	$scope.myAppointment.addData($scope.formData);
			  
		   	/*$scope.authentication.check_username($scope.formData, function(res){
		   		console.log(res);
 					
 				});*/
		 	   });
			

			//Checks whether the user exists and offer them the log in
			$scope.emailChanged = function(val) {
				var json = {
					email: val.email
				};
			    if($scope.myform.email.$valid) {
			    	console.log(val);
			       $scope.authentication.check_username(json, function(res){
				       	if (res.isUser ===true){
				       		$scope.user_hadNoAccont = false;
				       	} else if(res.isUser === false){
				       		$scope.user_hadNoAccont = true;

				       	}
 					});
			    }
			};


			$scope.$on('MyAppointmentChange', function(){
				$scope.testing = myAppointment.data;
			});

			$scope.checkGeocoder = function (){
					geocoder.geocode($scope.authentication.user)
					.success(function(res){
						console.log(res);
					});
			};
			$scope.getClosestStaff = function (){
					$scope.formData = $scope.authentication.user;

					var myvar = geocoder.getClosestStaff($scope.formData);
					console.log(myvar);
			};

			$scope.sendEmail = function (appointmentId){
					$http.get('/email/'+appointmentId)
					.success(function(res){
						console.log(res);
					})
					.error(function(res){
						console.log(res);
					});
			};
			$scope.getResults = function (){
					geocoder.getResults($scope.formData)
					.success(function(res){
						console.log(res);
					});
			};

			$scope.submitAction = function(){
				if ($scope.authentication.user._id){
					$scope.formData.updated = new Date();
					$scope.formData.client = $scope.authentication.user._id;
					$scope.formData.appointment_address = $scope.authentication.user.address.main_address;
					console.log($scope.formData);

					var appointment = new Appointments($scope.formData);
					 appointment.$save(function(res){
					 	notifications.showSuccess({message: 'Success! You should recieve an email shortly'});
						var appointmentId = res._id;
						$state.go('rdash.dash');
					});
				}

				if(!$scope.user_hadNoAccont){
					$scope.authentication.signin($scope.formData, function(data){
						console.log(data);

					});	
				} else if($scope.user_hadNoAccont){
					$scope.authentication.signUp($scope.formData, function(res){
						console.log(res);
						console.log(res.token);
						geocoder.geocode(res)
						 .success(function(geores, status){
						 		var results = geores.results[0].geometry.location;
						 		console.log(results);
				 				console.log(res);
						 		$scope.formData.address.main_address.lat = results.lat;
						 		$scope.formData.address.main_address.lng = results.lng;
						 		$scope.myAppointment.addData($scope.formData);
					    }).
						error(function(err){
								 	alert(err);
						});

						if(res.token === undefined){
							$state.go('payment');
							} else {
								$state.go('rdash');
							};
						
					});
				}
			};	

		$scope.book = false;
		//sets the Select Data
		$scope.items = [{
		      desc: '60 Mins',
		      hours: 1
		    }, 
		    {
		      desc: '90 Mins',
		      hours: 1.5
		    }, 
		    {
		      desc: '120 Mins',
		      hours: 2
		    }];


		  $rootScope.formData = {};
	 	$scope.formData.total_cost = {
	 			dollar_total_price:hourly*1.13, 
		 		dollar_price: hourly,
		 		dollar_tax: hourly*0.13, 
				cent_price: hourly*1.13*100
		 	};
	 	console.log($scope.formData.total_cost);

			$scope.formData.total_time = 1;
				
				$scope.setTotalPrice = function(formData){
					var total_time = formData.total_time;
					var total_cost = {
						dollar_total_price: (total_time* hourly*1.13).toFixed(2), 
						dollar_price: (total_time*hourly).toFixed(2),
						dollar_tax: (total_time*hourly*0.13).toFixed(2),
					 	cent_price: total_time* hourly*1.13*100
					 };
					 $scope.formData.total_cost = total_cost; 
				};

			
			  function dump(obj) {
			    var out = '';
			    for (var i in obj) {
			        out += i + ': ' + obj[i] + '\n';
			    }


			    // or, if you wanted to avoid alerts...

			    var pre = document.createElement('pre');
			    pre.innerHTML = out;
			    document.body.appendChild(pre);
				}
			
			
/*
			$scope.updateTotal = function(item_selected) {
			    if (item_selected) {
			    	console.log(item_selected);
			      $rootScope.formData.additions++;
			    }
			     else {
			      $rootScope.formData.additions--;
			    } 
			};*/
			
			
		  //Setting preset date on load
		 $rootScope.formData.appointment_date = new Date();
		 $rootScope.formData.appointment_date.setHours(18,30);
		 $scope.d = new Date();
		 var day = $rootScope.formData.appointment_date.getDate() + 7;
		 $rootScope.formData.appointment_date.setDate(day);

		  $scope.showB = false;

		 //watches for a change in the datepicker and reveals the date
		   $scope.$watch(function(){
		   	return $rootScope.formData.appointment_date;
		   }, function (oldval, newval) {
		   		if (newval !== oldval){
		   			$scope.showB = true;
		   			$scope.showC = false;
		   			$scope.book = true;
			 	}
		    });

			//for the datetimepicker
		 $scope.dateTimeNow = function() {
		    $scope.date = new Date();
		  };
		  $scope.dateTimeNow();
		  
		  $scope.toggleMinDate = function() {
		    $scope.minDate = $scope.minDate ? null : new Date();
		  };
		   
		  $scope.maxDate = new Date('2014-06-22');
		  $scope.toggleMinDate();

		  $scope.dateOptions = {
		    startingDay: 1,
		    showWeeks: false
		  };
		  
		  // Disable weekend selection
		  $scope.disabled = function(calendarDate, mode) {
		    return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
		  };
		  
		  $scope.hourStep = 1;
		  $scope.minuteStep = 15;

		  $scope.timeOptions = {
		    hourStep: [1, 2, 3],
		    minuteStep: [1, 5, 10, 15, 25, 30]
		  };

		  $scope.showMeridian = true;
		  $scope.timeToggleMode = function() {
		    $scope.showMeridian = !$scope.showMeridian;
		  };
		  
		  $scope.resetHours = function() {
		    $scope.date.setHours(1);
		  };
		  //for the datetimepicker ENDS
	function generatePassword() {
			    var length = 8,
			        charset = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
			        retVal = '';
			    for (var i = 0, n = charset.length; i < length; ++i) {
			        retVal += charset.charAt(Math.floor(Math.random() * n));
			    }
			    return retVal;
			}
	}
]);
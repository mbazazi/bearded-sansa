'use strict';


angular.module('core').controller('HomeController', ['$scope', '$rootScope', 'Authentication', '$http', '$location', '$state', 'myAppointment', 'Payment', 'Users', '$cookies', '$cookieStore',
	function($scope, $rootScope, Authentication, $http, $location, $state, myAppointment, Payment, Users, $cookies, $cookieStore) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.payment = Payment;
		$scope.user_hadNoAccont = true;
		$scope.myAppointment = myAppointment;
		

		$rootScope.user_exists = null;
			$scope.$on('error', function(event, data){
				$scope.error = data.message;
			});

			$scope.$watch('myform', function (oldval, newval){
				console.log(newval);
		   	$scope.myAppointment.addData($scope.formData);
			  
		   	/*$scope.authentication.check_username($scope.formData, function(res){
		   		console.log(res);
 					
 				});*/
		 	   });
			

/*
			if($scope.formData.total_time.length > 0){
				 $scope.formData.total_cost = $scope.formData.total_time*85;
			}
		*/
/*


			//Adds all the inputs into myAppointment in case of Log In etc
 			$scope.$watch('myform.email', function (oldval, newval){
 				if (oldval !== newval){
	 				$scope.authentication.check_username($scope.credentials, function(res){
	 					if(res.isUser === false){
	 					$scope.show_password = true;
						}
	 				});
 				}
		 	   });*/

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

			$scope.submitAction = function(){
				if(!$scope.user_hadNoAccont){
					$scope.authentication.signin($scope.formData, function(data){
						console.log(data);
					});	
				} else if($scope.user_hadNoAccont){
					$scope.authentication.signUp($scope.formData, function(res){
						console.log(res);
						if(res.token === null){
							$state.go('payment');
						} else {
							$state.go('rdash');
						}
					});
				}
			};	

		$scope.book = false;
		//sets the Select Data
		$scope.items = [{
		      desc: 'One Hour',
		      hours: 1
		    }, 
		    {
		      desc: '90 Mins',
		      hours: 1.5
		    }, 
		    {
		      desc: 'Two Hours',
		      hours: 2
		    }];


		  $rootScope.formData = {};
	 	$scope.formData.total_cost = {
		 		dollar_price: 85, 
				cent_price: 85*100
		 	};
	 	console.log($scope.formData.total_cost);

			$scope.formData.total_time = 1;
				
				$scope.setTotalPrice = function(formData){
					var total_time = formData.total_time;
					var total_cost = {
						dollar_price: total_time*85, 
					 	cent_price: total_time*85*100
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
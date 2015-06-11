'use strict';

// Appointments controller
angular.module('appointments').controller('AppointmentsController',
 ['$scope', '$stateParams', '$location', 'Authentication', 'Appointments', 'myAppointment', 'Users', 'Staff', 
	function($scope, $stateParams, $location, Authentication, Appointments, myAppointment, Users, Staff) {
		$scope.authentication = Authentication;
		$scope.myAppointment = myAppointment;
		Users.query().$promise.then(function(res){
			$scope.clientList = res;
		});
		$scope.staffList = {};
		$scope.showControls = false;
			
		Staff.query({roles: 'staff'}).$promise.then(function(res){
			$scope.staffList = res;
		});
		$scope.formData = {};
		var app_query = {};

		if($scope.myAppointment) {
			$scope.formData = $scope.myAppointment;
		} else {
			$scope.formData = {};
		}

		if ($stateParams.role === 'staff'){
			app_query = {
					staff_id: $stateParams.id
			}
				
		} else {
			app_query = {
					client: $stateParams.id
			}
		}
		
		// Create new Appointment
		$scope.create = function() {
			$scope.formData.updated = new Date();
			$scope.formData.staff_id_query = $scope.formData.staff_id;
			// Create new Appointment object
			var appointment = new Appointments ($scope.formData);

			// Redirect after save
			appointment.$save(function(response) {
				$location.path('appointments/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Appointment
		$scope.remove = function(appointment) {
			if ( appointment ) { 
				appointment.$remove();

				for (var i in $scope.appointments) {
					if ($scope.appointments [i] === appointment) {
						$scope.appointments.splice(i, 1);
					}
				}
			} else {
				$scope.appointment.$remove(function() {
					$location.path('appointments');
				});
			}
		};

		// Update existing Appointment
		$scope.update = function() {
			var appointment = $scope.appointment;

			Appointments.update(appointment).$promise.then(function() {
				$location.path('/admin');
/*				$location.path('appointments/' + appointment._id);
*/			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Find a list of Appointments
		$scope.find = function() {
			$scope.appointments = Appointments.query();
			
		};

		// Find a list of Appointments
		$scope.findUserAppointments= function(app_query) {
			console.log(app_query);
			$scope.appointments = Appointments.query({app_query});
		};

		// Find existing Appointment
		$scope.findOne = function() {
			Appointments.get({ 
				appointmentId: $stateParams.appointmentId
			}).$promise.then(function(data){
				console.log(data);
				$scope.appointment = data;
				var address = data.client[0].address.main_address;
					$scope.map = { 
						center: { 
							latitude: address.lat, 
							longitude: address.lng }, 
						zoom: 15 };

					$scope.marker = {
					      id: 0,
					      coords: {
					        latitude: address.lat, 
							longitude: address.lng
					      },
					      options: { draggable: true }    
				    }; 
			}, function (err){
				$scope.error = err;
			});

		};






		 //Setting preset date on load
		 $scope.formData.appointment_date = new Date();
		 $scope.formData.appointment_date.setHours(18,30);
		 $scope.d = new Date();
		 var day = $scope.formData.appointment_date.getDate() + 7;
		 $scope.formData.appointment_date.setDate(day);

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


	}
]);
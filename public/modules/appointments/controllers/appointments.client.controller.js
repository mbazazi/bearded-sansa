'use strict';

// Appointments controller
angular.module('appointments').controller('AppointmentsController',
 ['$scope', '$stateParams', '$location', 'Authentication', 'Appointments', 'myAppointment', 'Users', 'Staff', '$state', '$http', 'ngToast', '$modal', '$rootScope', '$resource', 'appointments', 
	function($scope, $stateParams, $location, Authentication, Appointments, myAppointment, Users, Staff, $state, $http, ngToast, $modal, $rootScope, $resource, appointments) {
		$scope.authentication = Authentication;
	/*	var res = ($state.$current.self.resolve.appointments);
		console.log($state.$current.self.resolve.appointments);
		console.log($state.$current.locals.globals);*/


		
		$scope.app_query = Authentication.appointment_query;
		$scope.myAppointment = myAppointment;
		Users.query().$promise.then(function(res){
			$scope.clientList = res;
		});
		$scope.total_apps = appointments.length;
		$scope.staffList = {};
		$scope.formData = {};
		$scope.showControls = false;
		$scope.appointments_completed = undefined;
		Staff.query({roles: 'staff'}).$promise.then(function(res){
			$scope.staffList = res;
		});

		$scope.appointments = appointments;

		if($scope.myAppointment) {
			$scope.formData = $scope.myAppointment;
		} else {
			$scope.formData = {};
		}
		//customer function that sets the parameters upon which to display appointments
		$scope.AppointmentsGetter = function(app_query, cancelled){
			if (cancelled === true ){
				app_query.cancelled = true;

			} else {
				app_query.cancelled = false;
			}
			$scope.find(app_query);
		};
	
/*		$scope.appointments_completed = appointments[0].length;
*/
		

				// Find a list of Appointments
		$scope.find = function(query) {
			console.log(query);
			Appointments.query(query).$promise.then(function(res){
				console.log(res);
				console.log(res.length);
				if (res.length > 0){
					$scope.appointments = res;
					$scope.total_apps = res.length;
					return $scope.total_apps;

				} else {
					$scope.msg = 'You have no appointments';
					$scope.total_apps = res.length;
				}				
			});
		};

			$scope.dateRange = function(date1, date2){
			if (date1 === undefined || date2 === undefined){
				console.log('Undefined');
				return;
			} else {
				 var query = {};
				var Appointment_range = $resource('/admin/appointments');
				if (Authentication.userRole === 'staff'){
					query = {
					staff_id: Authentication.user._id,
					from: date1,
					to: date2};
				 } else if (Authentication.userRole === 'admin'){
				 		query = {
					from: date1,
					to: date2};
				 } else {
				 	query = {
					user: Authentication.user._id,
					from: date1,
					to: date2};
				 }
				
				Appointment_range.query(query).$promise.then(function(result){
				 	$scope.appointments = result;
				 });
				
			}
			

		};

		$scope.jobsDone = function(){
			alert('Jobs Done Fired'+$scope.appointments_completed);
			Appointments.query({jobDone: true}).$promise.then(function(res){
							 $scope.appointments_completed = res.length;
							return $scope.appointments_completed;
							
			 	 		 	});
		};
		

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
				$scope.formData = {};
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.modal = function(app){
			var modalInstance = $modal.open({
			      templateUrl: 'modules/appointments/views/cancel_modal.html',
			      controller: 'ModalInstanceController',
			      size: 'sm',
			      scope: $scope, 
			      resolve: {
			        app: function () {
			          return app;
			        }
			      }
			    });

			    modalInstance.result.then(function (selectedItem) {
			    	console.log(selectedItem);
			      $scope.selected = selectedItem;
			    }, function () {
			      $scope.modalInstance = null;
			    });

		};

		$scope.openJobDoneModal = function(app){
			console.log(app.jobDone);
		
				var today = new Date();
				var appointment_date = new Date(app.appointment_date);
				var difference_date = appointment_date - today;
				console.log(difference_date);
				if (difference_date >0){
					app.difference_date = difference_date;
				} else {
					app.difference_date = null;
				}
				
			//Warn the user about cancelleing before within 24 hours			

			
			var modalInstance = $modal.open({
			      templateUrl: 'modules/appointments/views/jobDone_modal.html',
			      controller: 'ModalInstanceController',
			      size: 'lg',
			      scope: $scope, 
			      resolve: {
			        app: function () {
			          return app;
			        }
			      }
			    });

			    modalInstance.result.then(function (selectedItem) {
			    	console.log(selectedItem);
			      $scope.selected = selectedItem;
			    }, function () {
			      $scope.modalInstance = null;
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

		$scope.refund = function(appointment_id){
			$scope.payment.createRefund(appointment_id, null, function(result){
				console.log(result);
				if (result.refundObj[0]){
					$scope.find($scope.app_query);
				} else {
					 ngToast.create({
                    className: 'danger',
                    dismissButton: true, 
                    content: result.data.error.message
                  });
				}
			});
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
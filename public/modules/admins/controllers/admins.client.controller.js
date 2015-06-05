'use strict';

// Admins controller
angular.module('admins').controller('AdminsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Users', '$http',  '$state', 'Staff', 'Appointments', 'geocoder', 
	function($scope, $stateParams, $location, Authentication, Users, $http, $state, Staff, Appointments, geocoder) {
		$scope.authentication = Authentication;
		$scope.users = Users.query();
		$scope.staffList = {};
		$scope.total_apps =null;	
		$scope.show_table = false;
		$scope.total_users = $scope.users.length;	
		var app_query = {
			cancelled: false
		};


		//sets the query parameter for the Appointment getter based on the user's role
		 if($scope.authentication.user.roles[0] === 'staff'){
		 		$scope.isClient = false;
 				app_query = {
				cancelled: false, 
				staff_id: $scope.authentication.user._id
			};
		 } else if ($scope.authentication.user.roles[0] === 'user'){
		 			$scope.isClient = true;
					app_query = {
				cancelled: false, 
				client: $scope.authentication.user._id
			};
		 }
			console.log($scope.isClient);
		//Functions related to Appointments
		$scope.appointmentsGetter = function(app_query){
console.log(app_query);
			Appointments.query(app_query).$promise.then(function(res){
				$scope.appointments = res;
				console.log(res);				
				$scope.total_apps = $scope.appointments.length;	

/**/				

			});
		};

		$scope.appointmentsGetter(app_query);

		$scope.viewCancelledAppointments = function(){
			Appointments.query({cancelled: true}).$promise.then(function(res){
				$scope.appointments = res;
				console.log(res);
			});
		};

		$scope.cancelAppointment = function(app){
			app.cancelled = true;
			var date = new Date();
			var time = date.getTime();
			console.log(time);
			console.log();

			var apptime = new Date(app.appointment_date).getTime();

			var difference_date = apptime - time;

			//Warn the user about cancelleing before within 24 hours			
			if (difference_date < 86400000){
				var confirmed = confirm('cancelling this appointment you will still be charged');
				if (confirmed){
					console.log('confirmed');
				} else {
					return;
				}
			}
			var appointment = new Appointments(app);

			appointment.$update(function(res){
				$state.go('rdash.dash');
				$scope.appointmentsGetter(app_query);
			}, function(error){
				console.error(error);
			});
		};

			$scope.deleteApp= function(app){
			var appointment = new Appointments(app);
					

			appointment.$delete(function(res){
			
			$scope.appointmentsGetter();

			}, function(error){
				console.error(error);
			});
		};

		//listens for a change and then fires the update for that appointment
		$scope.selectChange = function(app){
		  app.$update().then(function(data){
		  	console.log(data);
		  });

		};

		//Functions related to Appointments ENDS


		$scope.showStaff = function (){
		Staff.query({roles: 'staff'}).$promise.then(function(res){
			$scope.users = res;
			$scope.total_users = $scope.users.length;	

		});
		
		
		};

		//Functions related to Client (users) STARTS


		$scope.showUsers = function (){
			$scope.users = Users.query();
			$scope.show_table = !$scope.show_table;
		};	

		$scope.createUser = function() {
		
			geocoder.geocode($scope.credentials)
			.success(function(res, status, headers, config) {
				console.log(res);
		          var results = res.results[0].geometry.location;
		          $scope.credentials.address.main_address.lat = results.lat;
		          $scope.credentials.address.main_address.lng = results.lng;
		       

		         $http.post('/auth/createuser', $scope.credentials)
		         .success(function(response) {

					$location.path('/dashboard/tables');
				}).error(function(response) {
						$scope.error = response.message;
				});
		          // this callback will be called asynchronously
		          // when the response is available
		        }).
		      error(function(results, status, headers, config) {
		      	$scope.error = results.message;
		        // called asynchronously if an error occurs
		        // or server returns response with an error status.
		      });	
		};

		// Update a user profile
		$scope.updateUserProfile = function() {
		
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
					console.log(user);
				user.$update(function(response) {
					$scope.success = true;
					$scope.users = Users.query();
				}, function(response) {
					$scope.error = response.data.message;
				});
			
		};

		$scope.findOne = function() {
			Users.get({id: $stateParams.id})
			.$promise.then(function(res){
			console.log(res);
			$scope.user = res;
			});
			
		};

		$scope.removeUser = function(user) {
			Users.delete(user).$promise.then(function(res){
			console.log(res);
			if (res.message === 'No user'){
					$scope.error = res.message;
				} else{
				// And redirect to the index page
				$scope.showUsers();
				
				}
		});

		//Functions related to Client (users) ENDS

		//Functions related to Staff (users) STARTS

		


	
			/*$http.post('/auth/remove', user).success(function(response) {
				if (response.message === 'No user'){
					$scope.error = response.message;
				} else{
				// And redirect to the index page
				$location.path('/admin');
				}
			}).error(function(response) {
				$scope.error = response.message;
			});*/
		};


		$scope.editUser = function(user) {
		
				Users.update(user).$promise.then(function(res){
				console.log(res);
					if (res.message === 'No user'){
							$scope.error = res.message;
					} else{
						// And redirect to the main admin page
						$state.go('admin');
						$scope.showUsers();
					}
				});
			
		};




/*
		// Update existing Admin
		$scope.update = function() {
			var admin = $scope.admin;

			admin.$update(function() {
				$location.path('admins/' + admin._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Admins
		$scope.find = function() {
			$scope.admins = Admins.query();
		};

		// Find existing Admin
		$scope.findOne = function() {
			$scope.admin = Admins.get({ 
				adminId: $stateParams.adminId
			});
		};*/


}]);
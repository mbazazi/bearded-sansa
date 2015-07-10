'use strict';

// Admins controller
angular.module('rdash').controller('AdminsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Users', '$http',  '$state', 'Staff', 'Appointments', 'geocoder', 'Payment', 
	function($scope, $stateParams, $location, Authentication, Users, $http, $state, Staff, Appointments, geocoder, Payment) {
	    $scope.app_query = Authentication.appointment_query;
		$scope.authentication = Authentication;
		$scope.payment = Payment;
		$scope.users = Users.query();
		$scope.msg = '';
		$scope.isClient = Authentication.isClient;
		$scope.staffList = {};
		$scope.show_table = false;
		$scope.total_users = $scope.users.length;	
		if (!$scope.authentication.user){
			$state.go('signin');
		}

		$scope.dt1 = new Date();
		$scope.dt2 = null;

		$scope.filterDateAdded = function (){
			if($scope.dt1 !== null){
			  $scope.dateFilter = function (item) {
			    return ($scope.parseDate(item.dateAdded) >= $scope.dt1 && $scope.parseDate(item.dateAdded) <= $scope.dt2);
			  };
			}
		};

		//For ordering Table data
		 $scope.items = 10;
 	 	 $scope.orderProp = '';
    	 $scope.reverse = true;
    	 
	    $scope.order = function(orderProp) {
	        $scope.reverse = ($scope.orderProp === orderProp) ? !$scope.reverse : false;
	        $scope.orderProp = orderProp;
	    };

		//sets the query parameter for the Appointment getter based on the user's role
		 if($scope.authentication.userRole === 'staff' || $scope.authentication.userRole === 'admin'){
		 		$scope.isClient = false;
		 }
	
		//Functions related to Appointments ENDS



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
/*showStaff
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
			
		};*/


		$scope.viewing = {};
		var individuals_appointments = {};
		var ind_apps = {};
		if (Authentication.userRole === 'user'){
			individuals_appointments = {
				client: Authentication.user.id
			};
		} else {
			individuals_appointments = {
				staff_id: $stateParams.userId
			};
		}
		

		$scope.findOne = function() {
			$scope.viewing = Users.get({
				id: $stateParams.userId
			});
			console.log($scope.viewing);
			$scope.ind_apps = Appointments.query(individuals_appointments);

		};
		if ($stateParams.userId){
			$scope.findOne();
		}
		/*$scope.removeUser = function(user) {
			Users.delete(user).$promise.then(function(res){
			console.log(res);
			if (res.message === 'No user'){
					$scope.error = res.message;
				} else{
				// And redirect to the index page
				$scope.showUsers();
				
				}
			});

*/


}]);
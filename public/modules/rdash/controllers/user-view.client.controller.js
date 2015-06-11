'use strict';

angular.module('rdash').controller('UserViewController', ['$scope', 'Users', '$stateParams', 'Appointments',
	function($scope, Users, $stateParams, Appointments) {
		$scope.viewing = {};
		$scope.appointments = {};
		var app_query = {};
		if ($stateParams.userRole === 'user'){
			app_query = {
				client: $stateParams.userId
			}
		} else {
			app_query = {
				staff_id: $stateParams.userId
			}
		}
		console.log($stateParams);
		$scope.findOne = function() {
			$scope.viewing = Users.get({
				id: $stateParams.userId
			});

			$scope.appointments = Appointments.query(app_query);
			
		};
		if ($stateParams.userId){
			$scope.findOne();
		};
}]);
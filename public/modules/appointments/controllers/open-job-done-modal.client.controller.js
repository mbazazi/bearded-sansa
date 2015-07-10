'use strict';

angular.module('appointments').controller('JobDoneController', ['$scope', '$modalInstance', 'app',
	function($scope, app) {
		// Open job done modal controller logic
		// ...
		$scope.app = app;

  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };

		

	}
]);
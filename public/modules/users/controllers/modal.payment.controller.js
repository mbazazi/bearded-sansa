'use strict';

angular.module('users').controller('PaymentModalCtrl', ['$scope', '$rootScope', '$modalInstance', 'user_card', 'payment', 
 	function($scope, $rootScope, $modalInstance, user_card, payment) {
 		console.log(payment);
 		console.log(user_card);
 		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };

 		$scope.payment = payment;
 		$rootScope.$on('card_change', function(){
 			 $scope.cancel();
 		});
 	}]);
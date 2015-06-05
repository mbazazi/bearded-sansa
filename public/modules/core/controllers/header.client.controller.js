'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$http', '$state', 'myAppointment', '$cookies', '$cookieStore', 
	function($scope, Authentication, Menus, $http, $state, myAppointment, $cookies, $cookieStore) {
			
		$scope.authentication = Authentication;
		console.log($scope.authentication);
		$scope.authentication.user = Authentication._data.user;
		console.log($scope.authentication._data.user);

		$scope.myApp = myAppointment;
		$scope.card = $scope.authentication._data.user.card;
		console.log($scope.card);

/*		$cookieStore.card = $scope.authentication.user.token.card;
*/
		//watches for a change in the card details and updates the view
		$scope.$watch('card_change', function(res){
			$scope.card = $cookieStore.card;
			
		});
				
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		

		
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});


	}
]);
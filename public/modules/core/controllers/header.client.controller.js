'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$rootScope', 'Authentication', 'Menus', '$http', '$state', 'myAppointment',  '$location', 
	function($scope, $rootScope, Authentication, Menus, $http, $state, myAppointment, $location) {
			$scope.authentication = Authentication;
		
		$scope.authentication.user = Authentication._data.user;
		$scope.myApp = myAppointment;
		if ($rootScope.authentication._data.user.stripeCustomer !== undefined){
		$scope.card = $rootScope.authentication._data.user.stripeCustomer.sources.data[0];
	} 
/*		$cookieStore.card = $scope.authentication.user.token.card;
*/
	/*	//watches for a change in the card details and updates the view
		$scope.$watch('card_change', function(res){
			$scope.card = $cookieStore.card;
			
		});
*/
		$rootScope.$on('password_reset', function(res){
			$scope.authentication = Authentication;
			
		});
				
	
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		

		
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
			console.log($scope.authentication.user);
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});


	}
]);
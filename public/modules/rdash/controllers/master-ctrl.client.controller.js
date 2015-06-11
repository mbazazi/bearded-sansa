'use strict';

angular.module('rdash').controller('MasterCtrl', ['$scope', '$cookieStore', '$state', '$rootScope', 'Authentication', 
    function($scope, $cookieStore, $stateParams, $rootScope, Authentication){
  /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
   $scope.authentication = Authentication;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
    
}]);


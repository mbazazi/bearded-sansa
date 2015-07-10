'use strict';

angular.module('rdash').controller('MasterCtrl', ['$scope', '$state', '$rootScope', 'Authentication', '$cookieStore',  
    function($scope,  $stateParams, $rootScope, Authentication, $cookieStore){
  /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
   $scope.authentication = Authentication;
console.log($scope.authentication);
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


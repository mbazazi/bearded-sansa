'use strict';

angular.module('staff-onboard').controller('StaffOnboardController', ['$scope', 'Payment', '$http', 'ngToast', '$state',  
	function($scope, Payment, $http, ngToast, $state) {


		 	$scope.payment = Payment;
		 	$scope.account_details = {};
		 	$scope.account_details.legal_entity = {};
		 	$scope.account_details.legal_entity.managed = true;
		 	$scope.account_details.legal_entity.country = 'CA';
		 	$scope.account_details.legal_entity.dob = '';
		 	$scope.account_details.today = new Date();

$scope.sendApplication = function(rmt){
  $http.post('/staff', rmt)
  .success(function(data, status){
    $state.go('onboard.thanks');
  }).error(function(err, status){
    console.log(err);
    ngToast.create({
      className: 'danger', 
      content: err.msg
    });
  });

};

$scope.today = function() {
  $scope.account_details.legal_entity.dob = new Date()-20;
  };
  $scope.today();

  $scope.clear = function () {
    $scope.account_details.legal_entity.dob = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };

  $scope.format = 'dd-MMMM-yyyy';

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

	}

]);
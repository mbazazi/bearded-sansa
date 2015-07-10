'use strict';


angular.module('charts').controller('ChartCtrl', ['$scope',  'charts', 'Appointments', '$resource', 'Authentication',
	function($scope, charts, Appointments, $resource, Authentication) {
		// Chart ctrl controller logic
		// ...
		 $scope.options = {
		   multiTooltipTemplate : function (label) {
		    return label.datasetLabel + ': $' + label.value;
		   } 
		  };
		console.log(charts);
		$scope.showAlert = false;
		if (charts.length <=0){
			$scope.showAlert = true;
		}
		$scope.data = [];
		 $scope.labels = [];
		 $scope.total_earnings = 0;

	 	
		  $scope.series = ['Earned', 'Refund'];

		  $scope.data = [];
		  $scope.data[0] = [];
		  $scope.data[1] = [];
		  $scope.data[2] = [];

		  console.log( $scope.data[0][0]);
		  console.log( $scope.data[1]);
		  $scope.onClick = function (points, evt) {
		    console.log(points, evt);
		  };


		$scope.dateRange = function(date1, date2){
			if (date1 === undefined || date2 === undefined){
				console.log('Undefined');
				return;
			} else {
				 
				var Appointment_range = $resource('/admin/appointments');
				
				Appointment_range.query({
					staff_id: Authentication.user._id,
					from: date1,
					to: date2
				 }).$promise.then(function(result){
				 	console.log(result.length);
				 	$scope.showChart(result);
				 });
				
			}
			

		};

		$scope.showChart = function(charts){	
			
				$scope.data = [];
				 $scope.data[0] = [];
		 		 $scope.data[1] = [];
		 		  $scope.data[2] = [];
		 		 $scope.labels = [];
				$scope.total_earnings = 0;
		if (charts.length <= 0){
			$scope.hideChart = true;
			return;
		}
			$scope.hideChart = false;
	
		
			angular.forEach(charts, function(chart, key) {
			 var d = new Date(chart.appointment_date).toDateString();
			
			 $scope.labels.push(d);
			 $scope.total_earnings += chart.cost.dollars;
			 $scope.total_earnings.toFixed(2);
			   $scope.data[0].push(chart.cost.dollars);
			   if (!chart.refundObj[0]){
			   	 $scope.data[1].push(0);
			   	} else {
			   	 $scope.data[1].push((chart.refundObj[0].amount/100));
			   	}
/*			   	  $scope.data[2] = chart.client[0].displayName;
*/			});
			
		}

		
		
		$scope.showChart(charts);
	
		

	}
]);
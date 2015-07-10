'use strict';

angular.module('appointments').controller('ModalInstanceController', ['$scope', '$modalInstance', 'app', 'Appointments', 
 	function($scope, $modalInstance, app, Appointments) {
		// Modal instance controller logic
		// ...
		$scope.app = app;
		console.log(app);
		 $scope.cancel = function () {
		  	$scope.app.jobDone = false;
		  	app.difference_date = null;
		    $modalInstance.dismiss('cancel');
		  }; 
		
	

		$scope.cancelAppointment = function(){
			app.cancelled = true;
			app.cancelled_date = new Date();
			if (!app.staff_id[0]){
				app.cancelled_by_staff = false;
			} else if ($scope.authentication.user.id === app.staff_id[0]._id){
				app.cancelled_by_staff = true;

			}

			app.cancelled_by_staff = false;

			var date = new Date();
			var time = date.getTime();
			var apptime = new Date(app.appointment_date).getTime();

			var difference_date = apptime - time;

			//Warn the user about cancelleing before within 24 hours			
			if (difference_date < 86400000){
				var confirmed = confirm('cancelling this appointment you will still be charged');
				if (confirmed){
					console.log('confirmed');
				} else {
					return;
				}
			}
			var appointment = new Appointments(app);

			appointment.$cancel(function(res){
				console.log(res);
				 $modalInstance.dismiss();
				$scope.find($scope.app_query);
				ngToast.create({
					content: 'Cancellation Successful', 
					className: 'success'
				});

					
			}, function(error){
				console.log(error);
				ngToast.create({
					content: error, 
					className: 'danger'
				});
			});
	};

		if (app.difference_date > 0){

		alert('You cannot claim this appointment until the job has been done.');
		} 

		//listens for a change and then fires the update for that appointment
		$scope.selectChange = function(){
			if (app.jobDone === true){
		 	 		 $scope.payment.createCharge(app.client[0], app._id, function(app){
		 	 		 	console.log(app);
		 	 		

		 	 		 	app.$update().then(function(result){
						if (result.response === '250 Great success'){
							$scope.jobsDone();
							console.log($scope.appointments_completed);
							 $modalInstance.dismiss();
							$scope.find($scope.app_query);
							
		 	 				ngToast.create({
		                    className: 'success',
		                    dismissButton: true, 
		                    content: 'Invoice Emailed to Client'
		                    });
						}
		

		 	 		 	})
						
						
					});
				} 
		};




	}
]);
'use strict';

// Messages controller
angular.module('messages').controller('MessagesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Messages', 'MessageHelper', 'ngToast', 'Users', 'messages',
	function($scope, $stateParams, $location, Authentication, Messages, MessageHelper, ngToast, Users, messages) {
		$scope.authentication = Authentication;
		$scope.user = Authentication._data.user;
		$scope.test = MessageHelper;
		$scope.testObj = {};
		$scope.testObj.originalObject = {};
		var now = new Date();
		console.log(messages);
		$scope.messages = messages;

		$scope.items = MessageHelper.items;

	$scope.new_messages = 0;
		var now = new Date();

		angular.forEach(messages, function(message, key) {
					
					if (message.message_read === false){
						$scope.new_messages ++;
					}
				});



		if ($stateParams.usertoId){
			var user_to = new Users.get({id: $stateParams.usertoId}).$promise
			.then(function(res){
				user_to = res;
				$scope.testObj.displayName = 'To: '+user_to.displayName;
				$scope.testObj.originalObject._id = user_to._id;
				return user_to;
				
			});
			$scope.testObj.displayName = user_to.displayName;
		}



		// Create new Message
		$scope.create = function() {

			
			// Create new Message object
			var message = new Messages ({
				subject: this.subject, 
				message_body: this.message_body,
				user_to: $scope.testObj.originalObject._id			
			});


			// Redirect after save
			message.$save(function(response) {
				$location.path('dashboard/admin');
				ngToast.create({
					content: 'Message Sent to '+$scope.testObj.displayName, 
					className: 'success'
				});				
				$scope.subject = '';
			}, function(errorResponse) {
				ngToast.create({
					content: errorResponse.data.message, 
					className: 'danger'
				});
				$scope.error = errorResponse.data.message;

			});
		};

		// Remove existing Message
		$scope.remove = function(message) {
			if ( message ) { 
				message.$remove();

				for (var i in $scope.messages) {
					if ($scope.messages [i] === message) {
						$scope.messages.splice(i, 1);
					}
				}
			} else {
				$scope.message.$remove(function() {
					$location.path('messages');
				});
			}
		};

		// Update existing Message
		$scope.update = function() {
			var message = $scope.message;
			console.log(message);
			message.$update(function() {
/*				$location.path('dashboard/admin');

*/	
		console.log('The message has been updated');
		}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	// Find a list of Messages
		$scope.find = function() {
			Messages.query({user_to: $scope.user._id}).$promise.then(function(result){
				$scope.messages = result;
			});
				
		};

		
		// Find existing Message
		$scope.findOne = function() {
			Messages.get({ 
				messageId: $stateParams.messageId
			}).$promise.then(function(result){
				$scope.message = result;
				console.log($scope.message);
				$scope.message.message_read = true;
				$scope.update();
			});
			
		};
	}
]);
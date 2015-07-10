'use strict';

//Setting up route
angular.module('messages').config(['$stateProvider',
	function($stateProvider) {
		// Messages state routing
		$stateProvider.
		state('listMessages', {
			url: '/messages',
			templateUrl: 'modules/messages/views/list-messages.client.view.html', 
			controller: 'MessagesController', 
            resolve: {
                        messages: ['$q', 'Authentication', 'Messages', function($q, Authentication, Messages){
                            return Messages.query({user_to: Authentication.user._id}).$promise;
                        }]
                    }
		}).
		state('createMessage', {
			url: '/messages/create/:usertoId',
			templateUrl: 'modules/messages/views/create-message.client.view.html', 
			controller: 'MessagesController'
			
		}).
		state('viewMessage', {
			url: '/messages/:messageId',
			templateUrl: 'modules/messages/views/view-message.client.view.html', 
			controller: 'MessagesController', 
            resolve: {
                        messages: ['$q', 'Authentication', 'Messages', function($q, Authentication, Messages){
                            return Messages.query({user_to: Authentication.user._id}).$promise;
                           

                        }]
                    }
			 
		}).
		state('editMessage', {
			url: '/messages/:messageId/edit',
			templateUrl: 'modules/messages/views/edit-message.client.view.html', 
			controller: 'MessagesController'
		});
	}
]);
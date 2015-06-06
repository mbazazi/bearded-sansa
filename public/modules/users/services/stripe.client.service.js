'use strict';

angular.module('users').factory('Stripe', [ '$resource', 
	function($resource) {
		return $resource('stripe/:stripeToken', {token: '@token'}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
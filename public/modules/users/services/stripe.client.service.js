'use strict';

angular.module('users').factory('Stripe', [ '$resource', 
	function($resource) {
		return $resource('stripe/:stripeToken', {stripeToken: '@token'}, {
			update: {
				method: 'PUT'
			}, 
			charge: 
			{	method:'POST', 
				params:{
					charge:true
				}
			}
		});
	}
]);
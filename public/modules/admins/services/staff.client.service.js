'use strict';

angular.module('admins').factory('Staff', [ '$resource', 
	function($resource) {
		return $resource('staff/:id', {id: '@_id'}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
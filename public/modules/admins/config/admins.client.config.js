'use strict';

// Configuring the Articles module
angular.module('admins').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Dashboard',  '/dashboard/admin');
	
	}
]);
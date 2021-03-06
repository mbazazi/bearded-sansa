'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$urlRouterProvider', '$httpProvider', 'uiGmapGoogleMapApiProvider', 'ngToastProvider', 'notificationsConfigProvider', 'ChartJsProvider',
	function($locationProvider, $urlRouterProvider, $httpProvider, uiGmapGoogleMapApiProvider, ngToastProvider, notificationsConfigProvider, ChartJsProvider) {
		//Settings for the Notification Bar
			 // auto hide
	    notificationsConfigProvider.setAutoHide(true);

	    // delay before hide
	    notificationsConfigProvider.setHideDelay(3000);

	    // support HTML
	    notificationsConfigProvider.setAcceptHTML(false);


	    // Configure all charts
    	ChartJsProvider.setOptions({
      colours: ['#ffbb66', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      responsive: true
    });

		ngToastProvider.configure({
		    animation: 'fade' // or 'slide'
		  });
		 	// use HTML 5
		Stripe.setPublishableKey('pk_test_7LnUmjmnIwkkWJUvgKlqLtSd');
		uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyACVwB4i_6ujTrdjTMI-_tnsDrf6yOfssw',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    	});

    	/*flowFactoryProvider.defaults = {
        target: '/auth/uploadAvatar',
        permanentErrors:[404, 500, 501], 
        maxChunkRetries: 1,
	    chunkRetryInterval: 5000,
	    simultaneousUploads: 4
	    };
	    // You can also set default events:
	    flowFactoryProvider.on('catchAll', function (event) {
	      
	    });
	    // Can be used with different implementations of Flow.js
	    // flowFactoryProvider.factory = fustyFlowFactory;
*/
	 $locationProvider.html5Mode(true).hashPrefix('!');
/*		 $urlRouterProvider.otherwise("/");
*/			//Sets the HTTP header type for the redirects
		 $httpProvider.defaults.headers.common = {
		    'Accept': 'application/json', 
		    'Content-Type': 'application/json'
		};


	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
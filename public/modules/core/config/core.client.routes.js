'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
            views:{
                '': {templateUrl:'modules/core/views/home.client.view.html'},
                'checkout@home': {templateUrl:'modules/core/views/sidebar.client.html'}
            }, 
            controller: 'HomeController'
        
		}) // route to show our basic form (/form)
        .state('home.date', {
            url: 'date',
            views:{
                '': {templateUrl:'modules/core/views/form-date.html'},
                'checkout@home': {templateUrl:'modules/core/views/checkout.html'}
            },
            controller: 'HomeController'
        }) 
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
       .state('home.address', {
            url: 'address',
            views:{
                '': {templateUrl:'modules/core/views/form-address.html'},
                'checkout@home': {templateUrl:'modules/core/views/checkout.html'}
            },
            controller: 'HomeController'
        })
       .state('success', {
            url: '/success',
            views:{
                '': {templateUrl:'modules/core/views/success.html', 
            controller: 'HomeController'},
                'panel@success': {templateUrl:'modules/core/views/checkout.html', 
            controller: 'HomeController'}
            }
        })/* 
        // url will be /form/payment
        .state('payment', {
            url: 'payment',
            templateUrl: 'modules/core/views/form-payment.html'
            
        })*/;
}])
.run(['$rootScope', '$state', '$stateParams', 'Authentication', function ($rootScope, $state, $stateParams, Authentication) {
    $rootScope.authentication = Authentication;

        $rootScope.$on('password_reset', function(res){
            $rootScope.authentication = Authentication;
            
        });

 }]);





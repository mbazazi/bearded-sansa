'use strict';

//Setting up route
angular.module('rdash').config(['$stateProvider',
	function($stateProvider) {
		// Rdash state routing

        // Application routes
        $stateProvider
            .state('rdash', {
                url: '/dashboard',
                templateUrl: 'modules/rdash/views/main.html', 
                controller: 'AdminsController'
            })
            .state('rdash.dash', {
                url: '/admin',
               resolve: {
                        messages: ['$q', 'Authentication', 'Messages', function($q, Authentication, Messages){
                            console.log(Authentication.user);

                            return Messages.query({user_to: Authentication.user._id}).$promise;
                        
                        }], 
                        appointments: [ 'Authentication', 'Appointments',  function(Authentication, Appointments){
                            console.log(Authentication.user);
                            var query = {
                                cancelled: false
                            }

                            switch(Authentication.user.roles[0]) {
                                case 'staff':
                                    var query = {
                                        staff_id: Authentication.user._id, 
                                        cancelled: false
                                    };
                                    break;
                                default:
                                   var query = {
                                        client: Authentication.user._id, 
                                        cancelled: false
                                    };
                            }

                            console.log(Authentication.appointment_query);
                            return Appointments.query(query).$promise;
                        }], 
                          Authentication: 'Authentication'
                    }, 
                 views:{
                '': {templateUrl: 'modules/rdash/views/dashboard.html',
                    controller: 'AppointmentsController'
                },
                'appointments@rdash.dash': {
                    templateUrl: 'modules/appointments/views/appointments-view.html',
                    controller: 'AppointmentsController'
                }, 
                'new_messages@rdash.dash':{
                    templateUrl: 'modules/rdash/views/new_messages.html',
                    controller: 'MessagesController'
                },
                'messages@rdash.dash': {
                    templateUrl: 'modules/messages/views/list-messages.client.view.html', 
                    controller: 'MessagesController'
                }
              }

            })
            .state('rdash.dash.view', {
               url: '',
               parent: 'rdash.dash',
                templateUrl: 'modules/appointments/views/appointments-view.html',
                controller: 'AppointmentsController'
            })
            .state('rdash.tables', {
                url: '/tables',
                views:{
                '': {templateUrl: 'modules/rdash/views/tables.html',
                    controller: 'SettingsController'
                }
              }
            })
            .state('rdash.tables.users', {
                url: '/users',
                templateUrl: 'modules/rdash/views/main.html'
              });

	}
]).run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
         $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){ 
         /*  console.log(fromParams);
            console.log(fromState);
            console.log(toState);*/
           
        });

        



    }]);

/*run('$rootScope'), function($rootScope){
    
});*/
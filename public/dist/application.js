'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mymeanapp';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils', 'ui.bootstrap.datetimepicker', 'stripe', 'angularUtils.directives.dirPagination', 'frapontillo.bootstrap-switch', 'uiGmapgoogle-maps', 'ngFileUpload', 'ngToast', 'angucomplete-alt', 'ngNotificationsBar',  'chart.js', 'ImageCropper'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
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
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('admins');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('appointments');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('charts');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('messages');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('rdash');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('staff-onboard');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('admins').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Dashboard',  '/dashboard/admin');
	
	}
]);
'use strict';

//Setting up route
angular.module('admins').config(['$stateProvider', 
	function($stateProvider) {
		// Admins state routing
		$stateProvider.
		state('admin', {
			url: '/admin',
			templateUrl: 'modules/admins/views/dashboard/main.html', 
			controller: 'AdminsController'
		}).
		state('admin.dashboard', {
			url: '/dashboard',
			templateUrl: 'modules/admins/views/list-admins.client.view.html'
		}).
		state('admin.appointments_view', {
			url: '/appointments/:appointmentId',
			templateUrl: 'modules/appointments/views/view-appointment.client.view.html',
			controller: 'AppointmentsController'
		}).
		state('adduser', {
			url: '/admin/create',
			templateUrl: 'modules/admins/views/create-admin.client.view.html',
			controller: 'AdminsController'
		}).
		state('admin.edituser', {
			url: '/:id/edit',
			templateUrl: 'modules/admins/views/edit-admin.client.view.html', 
			controller: 'AdminsController'
		}).
		state('editAdmin', {
			url: '/admins/:adminId/edit',
			templateUrl: 'modules/admins/views/edit-admin.client.view.html'
		});
	}
]);
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
'use strict';

// Configuring the Articles module
angular.module('appointments').run(['Menus',
	function(Menus) {
		/*// Set top bar menu items
		Menus.addMenuItem('topbar', 'Appointments', 'Appointments', 'dropdown', '/appointments(/create)?');
		Menus.addSubMenuItem('topbar', 'Appointments', 'View All', '/appointments');
		Menus.addSubMenuItem('topbar', 'Appointments', 'New Appointments', 'appointments/create');*/
	}
]);
'use strict';

//Setting up route
angular.module('appointments').config(['$stateProvider',
	function($stateProvider) {
		// Appointments state routing
		$stateProvider.
		state('appointments', {
			url: '/appointments',
			templateUrl: 'modules/appointments/views/appointments-view.html', 
			controller: 'AppointmentsController'
		}).
		state('create_appointment', {
			url: '/appointments/create',
			templateUrl: 'modules/appointments/views/create-appointment.client.view.html', 
			controller: 'AppointmentsController'
		}).
		state('appointments_view', {
			url: '/appointments/:appointmentId',
			templateUrl: 'modules/appointments/views/view-appointment.client.view.html',
			controller: 'AppointmentsController'
		}).
		state('appointment_edit', {
			url: '/appointments/:appointmentId/edit',
			templateUrl: 'modules/appointments/views/edit-appointment.client.view.html', 
			controller: 'AppointmentsController'
		});


	}
]);
'use strict';

// Appointments controller
angular.module('appointments').controller('AppointmentsController',
 ['$scope', '$stateParams', '$location', 'Authentication', 'Appointments', 'myAppointment', 'Users', 'Staff', '$state', '$http', 'ngToast', '$modal', '$rootScope', '$resource', 'appointments', 
	function($scope, $stateParams, $location, Authentication, Appointments, myAppointment, Users, Staff, $state, $http, ngToast, $modal, $rootScope, $resource, appointments) {
		$scope.authentication = Authentication;
	/*	var res = ($state.$current.self.resolve.appointments);
		console.log($state.$current.self.resolve.appointments);
		console.log($state.$current.locals.globals);*/


		
		$scope.app_query = Authentication.appointment_query;
		$scope.myAppointment = myAppointment;
		Users.query().$promise.then(function(res){
			$scope.clientList = res;
		});
		$scope.total_apps = appointments.length;
		$scope.staffList = {};
		$scope.formData = {};
		$scope.showControls = false;
		$scope.appointments_completed = undefined;
		Staff.query({roles: 'staff'}).$promise.then(function(res){
			$scope.staffList = res;
		});

		$scope.appointments = appointments;

		if($scope.myAppointment) {
			$scope.formData = $scope.myAppointment;
		} else {
			$scope.formData = {};
		}
		//customer function that sets the parameters upon which to display appointments
		$scope.AppointmentsGetter = function(app_query, cancelled){
			if (cancelled === true ){
				app_query.cancelled = true;

			} else {
				app_query.cancelled = false;
			}
			$scope.find(app_query);
		};
	
/*		$scope.appointments_completed = appointments[0].length;
*/
		

				// Find a list of Appointments
		$scope.find = function(query) {
			console.log(query);
			Appointments.query(query).$promise.then(function(res){
				console.log(res);
				console.log(res.length);
				if (res.length > 0){
					$scope.appointments = res;
					$scope.total_apps = res.length;
					return $scope.total_apps;

				} else {
					$scope.msg = 'You have no appointments';
					$scope.total_apps = res.length;
				}				
			});
		};

			$scope.dateRange = function(date1, date2){
			if (date1 === undefined || date2 === undefined){
				console.log('Undefined');
				return;
			} else {
				 var query = {};
				var Appointment_range = $resource('/admin/appointments');
				if (Authentication.userRole === 'staff'){
					query = {
					staff_id: Authentication.user._id,
					from: date1,
					to: date2};
				 } else if (Authentication.userRole === 'admin'){
				 		query = {
					from: date1,
					to: date2};
				 } else {
				 	query = {
					user: Authentication.user._id,
					from: date1,
					to: date2};
				 }
				
				Appointment_range.query(query).$promise.then(function(result){
				 	$scope.appointments = result;
				 });
				
			}
			

		};

		$scope.jobsDone = function(){
			alert('Jobs Done Fired'+$scope.appointments_completed);
			Appointments.query({jobDone: true}).$promise.then(function(res){
							 $scope.appointments_completed = res.length;
							return $scope.appointments_completed;
							
			 	 		 	});
		};
		

		// Create new Appointment
		$scope.create = function() {
			$scope.formData.updated = new Date();
			$scope.formData.staff_id_query = $scope.formData.staff_id;
			// Create new Appointment object
			var appointment = new Appointments ($scope.formData);

			// Redirect after save
			appointment.$save(function(response) {
				$location.path('appointments/' + response._id);

				// Clear form fields
				$scope.formData = {};
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.modal = function(app){
			var modalInstance = $modal.open({
			      templateUrl: 'modules/appointments/views/cancel_modal.html',
			      controller: 'ModalInstanceController',
			      size: 'sm',
			      scope: $scope, 
			      resolve: {
			        app: function () {
			          return app;
			        }
			      }
			    });

			    modalInstance.result.then(function (selectedItem) {
			    	console.log(selectedItem);
			      $scope.selected = selectedItem;
			    }, function () {
			      $scope.modalInstance = null;
			    });

		};

		$scope.openJobDoneModal = function(app){
			console.log(app.jobDone);
		
				var today = new Date();
				var appointment_date = new Date(app.appointment_date);
				var difference_date = appointment_date - today;
				console.log(difference_date);
				if (difference_date >0){
					app.difference_date = difference_date;
				} else {
					app.difference_date = null;
				}
				
			//Warn the user about cancelleing before within 24 hours			

			
			var modalInstance = $modal.open({
			      templateUrl: 'modules/appointments/views/jobDone_modal.html',
			      controller: 'ModalInstanceController',
			      size: 'lg',
			      scope: $scope, 
			      resolve: {
			        app: function () {
			          return app;
			        }
			      }
			    });

			    modalInstance.result.then(function (selectedItem) {
			    	console.log(selectedItem);
			      $scope.selected = selectedItem;
			    }, function () {
			      $scope.modalInstance = null;
			    });

		};

		
		// Remove existing Appointment
		$scope.remove = function(appointment) {
			if ( appointment ) { 
				appointment.$remove();

				for (var i in $scope.appointments) {
					if ($scope.appointments [i] === appointment) {
						$scope.appointments.splice(i, 1);
					}
				}
			} else {
				$scope.appointment.$remove(function() {
					$location.path('appointments');
				});
			}
		};

		$scope.refund = function(appointment_id){
			$scope.payment.createRefund(appointment_id, null, function(result){
				console.log(result);
				if (result.refundObj[0]){
					$scope.find($scope.app_query);
				} else {
					 ngToast.create({
                    className: 'danger',
                    dismissButton: true, 
                    content: result.data.error.message
                  });
				}
			});
		};

	


		// Update existing Appointment
		$scope.update = function() {
			var appointment = $scope.appointment;

			Appointments.update(appointment).$promise.then(function() {
				$location.path('/admin');
/*				$location.path('appointments/' + appointment._id);
*/			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};




		// Find existing Appointment
		$scope.findOne = function() {
			Appointments.get({ 
				appointmentId: $stateParams.appointmentId
			}).$promise.then(function(data){
				console.log(data);
				$scope.appointment = data;
				var address = data.client[0].address.main_address;
					$scope.map = { 
						center: { 
							latitude: address.lat, 
							longitude: address.lng }, 
						zoom: 15 };

					$scope.marker = {
					      id: 0,
					      coords: {
					        latitude: address.lat, 
							longitude: address.lng
					      },
					      options: { draggable: true }    
				    }; 
			}, function (err){
				$scope.error = err;
			});

		};






		 //Setting preset date on load
		 $scope.formData.appointment_date = new Date();
		 $scope.formData.appointment_date.setHours(18,30);
		 $scope.d = new Date();
		 var day = $scope.formData.appointment_date.getDate() + 7;
		 $scope.formData.appointment_date.setDate(day);

			//for the datetimepicker
		 $scope.dateTimeNow = function() {
		    $scope.date = new Date();
		  };
		  $scope.dateTimeNow();
		  
		  $scope.toggleMinDate = function() {
		    $scope.minDate = $scope.minDate ? null : new Date();
		  };
		   
		  $scope.maxDate = new Date('2014-06-22');
		  $scope.toggleMinDate();

		  $scope.dateOptions = {
		    startingDay: 1,
		    showWeeks: false
		  };
		  
		  // Disable weekend selection
		  $scope.disabled = function(calendarDate, mode) {
		    return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
		  };
		  
		  $scope.hourStep = 1;
		  $scope.minuteStep = 15;

		  $scope.timeOptions = {
		    hourStep: [1, 2, 3],
		    minuteStep: [1, 5, 10, 15, 25, 30]
		  };

		  $scope.showMeridian = true;
		  $scope.timeToggleMode = function() {
		    $scope.showMeridian = !$scope.showMeridian;
		  };
		  
		  $scope.resetHours = function() {
		    $scope.date.setHours(1);
		  };
		  //for the datetimepicker ENDS


	}
]);
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
'use strict';

angular.module('appointments').controller('JobDoneController', ['$scope', '$modalInstance', 'app',
	function($scope, app) {
		// Open job done modal controller logic
		// ...
		$scope.app = app;

  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };

		

	}
]);
'use strict';

//Appointments service used to communicate Appointments REST endpoints
angular.module('appointments').factory('Appointments', ['$resource',
	function($resource) {
		return $resource('appointments/:appointmentId', { appointmentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}, 
			cancel: {
				method: 'POST'
			}
		});
	}

]);
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider', 
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html', 
			 controller: ["$scope", "art", function($scope, art){
		          $scope.articles = art;
		      }],
			resolve:{
	         art:  ["Articles", function(Articles){
	            return Articles.query();
         		}]
	         } 
		}).
		state('listArticles.createArticle', {
			url: '/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html', 
			controller: 'ArticlesController'
		}).
		state('listArticles.viewArticle', {
			url: '/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'

		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', 'myAppointment', 
	function($scope, $stateParams, $location, Authentication, Articles, myAppointment, art) {
		$scope.authentication = Authentication;
	
	/*	$scope.articles = Articles.query();
			console.log($scope.articles);
*/
		$scope.find = function() {
		    Articles.query({}, function (response) {
		        // Will update scope, function will be called if http status === 200
		        $scope.articles = response;
		    }, function () {
		        // This is a error function will called if http status != 200
		    });
		};

		$scope.create = function() {
			console.log('From the Create(): '+$scope.articles);
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save().then(function(response) {
				console.log('From the Callback: '+$scope.articles);
				$location.path('articles');

				$scope.title = '';
				$scope.content = '';
				$scope.find();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		$scope.myAppointment = myAppointment;

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		
		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
			
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: { method: 'PUT'}
		});
	}
]);
'use strict';

//Setting up route
angular.module('charts').config(['$stateProvider',
	function($stateProvider) {
		// Charts state routing
		$stateProvider.
		state('rdash.charts', {
			url: '/charts',
			views:{
                '': {templateUrl: 'modules/charts/views/chart-view.html', 
                    controller: 'ChartCtrl', 
                    resolve: {
			        charts: ['Appointments', 'Authentication', function (Appointments, Authentication) {
			          return Appointments.query({jobDone: true, staff_id: Authentication.user._id}).$promise;
			    	    }], 
			    	 Appointments: 'Appointments'
			   		 }
                }
            }, 
            
		});
	}
]);
'use strict';


angular.module('charts').controller('ChartCtrl', ['$scope',  'charts', 'Appointments', '$resource', 'Authentication',
	function($scope, charts, Appointments, $resource, Authentication) {
		// Chart ctrl controller logic
		// ...
		 $scope.options = {
		   multiTooltipTemplate : function (label) {
		    return label.datasetLabel + ': $' + label.value;
		   } 
		  };
		console.log(charts);
		$scope.showAlert = false;
		if (charts.length <=0){
			$scope.showAlert = true;
		}
		$scope.data = [];
		 $scope.labels = [];
		 $scope.total_earnings = 0;

	 	
		  $scope.series = ['Earned', 'Refund'];

		  $scope.data = [];
		  $scope.data[0] = [];
		  $scope.data[1] = [];
		  $scope.data[2] = [];

		  console.log( $scope.data[0][0]);
		  console.log( $scope.data[1]);
		  $scope.onClick = function (points, evt) {
		    console.log(points, evt);
		  };


		$scope.dateRange = function(date1, date2){
			if (date1 === undefined || date2 === undefined){
				console.log('Undefined');
				return;
			} else {
				 
				var Appointment_range = $resource('/admin/appointments');
				
				Appointment_range.query({
					staff_id: Authentication.user._id,
					from: date1,
					to: date2
				 }).$promise.then(function(result){
				 	console.log(result.length);
				 	$scope.showChart(result);
				 });
				
			}
			

		};

		$scope.showChart = function(charts){	
			
				$scope.data = [];
				 $scope.data[0] = [];
		 		 $scope.data[1] = [];
		 		  $scope.data[2] = [];
		 		 $scope.labels = [];
				$scope.total_earnings = 0;
		if (charts.length <= 0){
			$scope.hideChart = true;
			return;
		}
			$scope.hideChart = false;
	
		
			angular.forEach(charts, function(chart, key) {
			 var d = new Date(chart.appointment_date).toDateString();
			
			 $scope.labels.push(d);
			 $scope.total_earnings += chart.cost.dollars;
			 $scope.total_earnings.toFixed(2);
			   $scope.data[0].push(chart.cost.dollars);
			   if (!chart.refundObj[0]){
			   	 $scope.data[1].push(0);
			   	} else {
			   	 $scope.data[1].push((chart.refundObj[0].amount/100));
			   	}
/*			   	  $scope.data[2] = chart.client[0].displayName;
*/			});
			
		}

		
		
		$scope.showChart(charts);
	
		

	}
]);
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





'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$rootScope', 'Authentication', 'Menus', '$http', '$state', 'myAppointment',  '$location', 
	function($scope, $rootScope, Authentication, Menus, $http, $state, myAppointment, $location) {
			$scope.authentication = Authentication;
		
		$scope.authentication.user = Authentication._data.user;
		$scope.myApp = myAppointment;
		if ($rootScope.authentication._data.user.stripeCustomer !== undefined){
		$scope.card = $rootScope.authentication._data.user.stripeCustomer.sources.data[0];
	} 
/*		$cookieStore.card = $scope.authentication.user.token.card;
*/
	/*	//watches for a change in the card details and updates the view
		$scope.$watch('card_change', function(res){
			$scope.card = $cookieStore.card;
			
		});
*/
		$rootScope.$on('password_reset', function(res){
			$scope.authentication = Authentication;
			
		});
				
	
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		

		
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
			console.log($scope.authentication.user);
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});


	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', '$rootScope', 'Authentication', '$http', '$location', '$state', 'myAppointment', 'Payment', 'Users', 'Appointments', 'geocoder', 'notifications', '$locale', 
	function($scope, $rootScope, Authentication, $http, $location, $state, myAppointment, Payment, Users, Appointments, geocoder, notifications, $locale) {
		// This provides Authentication context.
		var hourly = 125;
	
	/*	This is for GEOLOCATION OF THE USER for currency
		 if(navigator.geolocation) {
		    var browserSupportFlag = true;
		    navigator.geolocation.getCurrentPosition(function(position) {
		    	geocoder.geolocate(position);

		    }, function() {
		      handleNoGeolocation(browserSupportFlag);
		    });
		  }

		var country_code = geocoder.getResults();
		console.log(country_code);
*/
		$scope.authentication = Authentication;
		$scope.payment = Payment;
		$scope.user_hadNoAccont = true;
		$scope.myAppointment = myAppointment;
		$rootScope.user_exists = null;
			$scope.$on('error', function(event, data){
				$scope.error = data.message;
			});
			console.log($state.current.name);
			$scope.$watch('myform', function (oldval, newval){
		   	$scope.myAppointment.addData($scope.formData);
			  
		   	/*$scope.authentication.check_username($scope.formData, function(res){
		   		console.log(res);
 					
 				});*/
		 	   });
			

			//Checks whether the user exists and offer them the log in
			$scope.emailChanged = function(val) {
				var json = {
					email: val.email
				};
			    if($scope.myform.email.$valid) {
			    	console.log(val);
			       $scope.authentication.check_username(json, function(res){
				       	if (res.isUser ===true){
				       		$scope.user_hadNoAccont = false;
				       	} else if(res.isUser === false){
				       		$scope.user_hadNoAccont = true;

				       	}
 					});
			    }
			};


			$scope.$on('MyAppointmentChange', function(){
				$scope.testing = myAppointment.data;
			});

			$scope.checkGeocoder = function (){
					geocoder.geocode($scope.authentication.user)
					.success(function(res){
						console.log(res);
					});
			};
			$scope.getClosestStaff = function (){
					$scope.formData = $scope.authentication.user;

					var myvar = geocoder.getClosestStaff($scope.formData);
					console.log(myvar);
			};

			$scope.sendEmail = function (appointmentId){
					$http.get('/email/'+appointmentId)
					.success(function(res){
						console.log(res);
					})
					.error(function(res){
						console.log(res);
					});
			};
			$scope.getResults = function (){
					geocoder.getResults($scope.formData)
					.success(function(res){
						console.log(res);
					});
			};

			$scope.submitAction = function(){
				if ($scope.authentication.user._id){
					$scope.formData.updated = new Date();
					$scope.formData.client = $scope.authentication.user._id;
					$scope.formData.appointment_address = $scope.authentication.user.address.main_address;
					console.log($scope.formData);

					var appointment = new Appointments($scope.formData);
					 appointment.$save(function(res){
					 	notifications.showSuccess({message: 'Success! You should recieve an email shortly'});
						var appointmentId = res._id;
						$state.go('rdash.dash');
					});
				}

				if(!$scope.user_hadNoAccont){
					$scope.authentication.signin($scope.formData, function(data){
						console.log(data);

					});	
				} else if($scope.user_hadNoAccont){
					$scope.authentication.signUp($scope.formData, function(res){
						console.log(res);
						console.log(res.token);
						geocoder.geocode(res)
						 .success(function(geores, status){
						 		var results = geores.results[0].geometry.location;
						 		console.log(results);
				 				console.log(res);
						 		$scope.formData.address.main_address.lat = results.lat;
						 		$scope.formData.address.main_address.lng = results.lng;
						 		$scope.myAppointment.addData($scope.formData);
					    }).
						error(function(err){
								 	alert(err);
						});

						if(res.token === undefined){
							$state.go('payment');
							} else {
								$state.go('rdash');
							};
						
					});
				}
			};	

		$scope.book = false;
		//sets the Select Data
		$scope.items = [{
		      desc: '60 Mins',
		      hours: 1
		    }, 
		    {
		      desc: '90 Mins',
		      hours: 1.5
		    }, 
		    {
		      desc: '120 Mins',
		      hours: 2
		    }];


		  $rootScope.formData = {};
	 	$scope.formData.total_cost = {
	 			dollar_total_price:hourly*1.13, 
		 		dollar_price: hourly,
		 		dollar_tax: hourly*0.13, 
				cent_price: hourly*1.13*100
		 	};
	 	console.log($scope.formData.total_cost);

			$scope.formData.total_time = 1;
				
				$scope.setTotalPrice = function(formData){
					var total_time = formData.total_time;
					var total_cost = {
						dollar_total_price: (total_time* hourly*1.13).toFixed(2), 
						dollar_price: (total_time*hourly).toFixed(2),
						dollar_tax: (total_time*hourly*0.13).toFixed(2),
					 	cent_price: total_time* hourly*1.13*100
					 };
					 $scope.formData.total_cost = total_cost; 
				};

			
			  function dump(obj) {
			    var out = '';
			    for (var i in obj) {
			        out += i + ': ' + obj[i] + '\n';
			    }


			    // or, if you wanted to avoid alerts...

			    var pre = document.createElement('pre');
			    pre.innerHTML = out;
			    document.body.appendChild(pre);
				}
			
			
/*
			$scope.updateTotal = function(item_selected) {
			    if (item_selected) {
			    	console.log(item_selected);
			      $rootScope.formData.additions++;
			    }
			     else {
			      $rootScope.formData.additions--;
			    } 
			};*/
			
			
		  //Setting preset date on load
		 $rootScope.formData.appointment_date = new Date();
		 $rootScope.formData.appointment_date.setHours(18,30);
		 $scope.d = new Date();
		 var day = $rootScope.formData.appointment_date.getDate() + 7;
		 $rootScope.formData.appointment_date.setDate(day);

		  $scope.showB = false;

		 //watches for a change in the datepicker and reveals the date
		   $scope.$watch(function(){
		   	return $rootScope.formData.appointment_date;
		   }, function (oldval, newval) {
		   		if (newval !== oldval){
		   			$scope.showB = true;
		   			$scope.showC = false;
		   			$scope.book = true;
			 	}
		    });

			//for the datetimepicker
		 $scope.dateTimeNow = function() {
		    $scope.date = new Date();
		  };
		  $scope.dateTimeNow();
		  
		  $scope.toggleMinDate = function() {
		    $scope.minDate = $scope.minDate ? null : new Date();
		  };
		   
		  $scope.maxDate = new Date('2014-06-22');
		  $scope.toggleMinDate();

		  $scope.dateOptions = {
		    startingDay: 1,
		    showWeeks: false
		  };
		  
		  // Disable weekend selection
		  $scope.disabled = function(calendarDate, mode) {
		    return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
		  };
		  
		  $scope.hourStep = 1;
		  $scope.minuteStep = 15;

		  $scope.timeOptions = {
		    hourStep: [1, 2, 3],
		    minuteStep: [1, 5, 10, 15, 25, 30]
		  };

		  $scope.showMeridian = true;
		  $scope.timeToggleMode = function() {
		    $scope.showMeridian = !$scope.showMeridian;
		  };
		  
		  $scope.resetHours = function() {
		    $scope.date.setHours(1);
		  };
		  //for the datetimepicker ENDS
	function generatePassword() {
			    var length = 8,
			        charset = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
			        retVal = '';
			    for (var i = 0, n = charset.length; i < length; ++i) {
			        retVal += charset.charAt(Math.floor(Math.random() * n));
			    }
			    return retVal;
			}
	}
]);
  'use strict';

// Setting up route
angular.module('core').directive('image', 
[ '$q',  function($q) {
    var URL = window.URL || window.webkitURL;

        var getResizeArea = function () {
            var resizeAreaId = 'fileupload-resize-area';

            var resizeArea = document.getElementById(resizeAreaId);

            if (!resizeArea) {
                resizeArea = document.createElement('canvas');
                resizeArea.id = resizeAreaId;
                resizeArea.style.visibility = 'hidden';
                document.body.appendChild(resizeArea);
            }

            return resizeArea;
        };


        var resizeImage = function (origImage, options) {
            var maxHeight = options.resizeMaxHeight || 300;
            var maxWidth = options.resizeMaxWidth || 250;
            var quality = options.resizeQuality || 0.7;
            var type = options.resizeType || 'image/jpg';

            var canvas = getResizeArea();

            var height = origImage.height;
            var width = origImage.width;

           /* // calculate the width and height, constraining the proportions
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round(height *= maxWidth / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round(width *= maxHeight / height);
                    height = maxHeight;
                }
            }*/
            canvas.width = width;
            canvas.height = height;
            var sourceWidth, sourceHeight;

            var sourceX = width*0.20;
            var sourceY = height*0.20;
            if (width || height > 500){
                 sourceWidth = width/4;
                 sourceHeight = height/4;
            } else {
             sourceWidth = width/2;
             sourceHeight = height/2;
            }
            var destWidth = sourceWidth;
            var destHeight = sourceHeight;
            var destX = canvas.width / 2 - destWidth / 2;
            var destY = canvas.height / 2 - destHeight / 2;

            

            //draw image on canvas
            var ctx = canvas.getContext('2d');
             ctx.drawImage(origImage, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
           /* ctx.drawImage(origImage, 0, 0, width, height);*/

            // get the data from canvas as 70% jpg (or specified type).
            return canvas.toDataURL(type, quality);
        };

        var createImage = function(url, callback) {
            var image = new Image();
            image.onload = function() {
                callback(image);
            };
            image.src = url;
        };

        var fileToDataURL = function (file) {
            var deferred = $q.defer();
            var reader = new FileReader();
            reader.onload = function (e) {
                deferred.resolve(e.target.result);
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        };

        return {
            restrict: 'A',
            scope: {
                image: '=',
                resizeMaxHeight: '@?',
                resizeMaxWidth: '@?',
                resizeQuality: '@?',
                resizeType: '@?',
            },
            link: function postLink(scope, element, attrs, ctrl) {

                var doResizing = function(imageResult, callback) {
                    createImage(imageResult.url, function(image) {
                        var dataURL = resizeImage(image, scope);
                        imageResult.resized = {
                            dataURL: dataURL,
                            type: dataURL.match(/:(.+\/.+);/)[1],
                            name: imageResult.file.name,
                            size: imageResult.file.size,
                            webkitRelativePath: imageResult.file.webkitRelativePath,
                            lastModified: imageResult.file.lastmodified,
                            lastModifiedDate: imageResult.file.lastModifiedDate
                        };
                        callback(imageResult);
                    });
                };

                var applyScope = function(imageResult) {
                    scope.$apply(function() {
                        //console.log(imageResult);
                        if(attrs.multiple)
                            scope.image.push(imageResult);
                        else
                            scope.image = imageResult; 
                    });
                };


                element.bind('change', function (evt) {
                    //when multiple always return an array of images
                    if(attrs.multiple)
                        scope.image = [];

                    var files = evt.target.files;
                   /* for(var i = 0; i < files.length; i++) {
                        //create a result object for each file in files
                        var imageResult = {
                            file: files[i],
                            url: URL.createObjectURL(files[i])
                        };

                        fileToDataURL(files[i]).then(function (dataURL) {
                            imageResult.dataURL = dataURL;
                        });

                        if(scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
                            doResizing(imageResult, function(imageResult) {
                                applyScope(imageResult);
                            });
                        }
                        else { //no resizing
                            applyScope(imageResult);
                        }
                    }*/
                });
            }
        };


}]);
  'use strict';

// Setting up route
angular.module('core').directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm, attrs) {
      var idToScroll = attrs.href;
      $elm.on('click', function() {
        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $elm;
        }
        $('body').animate({scrollTop: $target.offset().top}, 'slow');
      });
    }
  }
});
  'use strict';

// Setting up route
angular.module('core').directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: ["$scope", "$element", function($scope, $element) {
        var panes = $scope.panes = [];

        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        };

        this.addPane = function(pane) {
          if (panes.length === 0) $scope.select(pane);
          panes.push(pane);
        };
      }],
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  })

  .directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  });
'use strict';

angular.module('core')
.factory('geocoder', ['$http','$state', 'Staff', 'uiGmapGoogleMapApi',  function($http, $state, Staff, uiGmapGoogleMapApi){

var geocoder = {};
 geocoder.results = {};
 var key = 'AIzaSyACVwB4i_6ujTrdjTMI-_tnsDrf6yOfssw';
geocoder.geocode = function (formData){
	console.log(formData.address.main_address.street_1);
	var address = formData.address.main_address.street_1+', '+formData.address.main_address.street_2+' ,'+formData.address.main_address.city+', '+formData.address.main_address.postcode;

			  

			   var res = $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key);
			   geocoder.results = res;

				return res;
   
};

geocoder.getResults = function (){
		if (geocoder.results === undefined){
			return 'No results';
		} else {
			return geocoder.results;
	}
};
//calculates distance between two points in km's
geocoder.calcDistance = function(p1, p2){
return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
};


geocoder.geolocate = function(position){
	var mygeocoder = null;
	uiGmapGoogleMapApi.then(function(map){
		 var latlng  = new google.maps.LatLng(40.714224, -73.961452);
	 var geocoder = map.Geocoder({'location':latlng});
	 console.log(geocoder);
	});

	 mygeocoder = new google.maps.Geocoder();
	console.log(mygeocoder);
  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  mygeocoder.geocode({'location': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        var country = results.slice(-1).pop();
        console.log(country.address_components[0].short_name);

        geocoder.results.country_code = country.address_components[0].short_name;
       
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}


geocoder.getClosestStaff = function (formData){

	Staff.query({roles: 'staff'})
	.$promise.then(function(res){

		var myDistances = [];

		angular.forEach(res, function (result) {
			var p1 = new google.maps.LatLng(result.address.main_address.lat, result.address.main_address.lng);
			var p2 = new google.maps.LatLng(46.0438317, 9.75936230000002);
			var distance = geocoder.calcDistance(p1, p2);
			myDistances.push({distance: distance, staff_id: result._id});
   		 });

		var index = 0;
		var value = myDistances[0].distance;
		for (var i = 1; i < myDistances.length; i++) {
		  if (myDistances[i].distance < value) {
		    value = myDistances[i].distance;
		    index = i;
		  }
		}
		console.log(index);

	});
	/*geocoder.geocode(formData)
	.success(function(res){
		console.log(res);

	});*/
   
};



return geocoder;

}]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Authentication service for user variables
angular.module('core').factory('myAppointment', ["$rootScope", function($rootScope){
var myAppointment = {};

	myAppointment.addData = function(data){
		myAppointment.data = data;
		this.broadcastChange();
	};

	myAppointment.removeData = function(){
		myAppointment.data = '';
		this.broadcastChange();
	};

	myAppointment.getData = function(){
		return this.data;
	};

	myAppointment.broadcastChange = function(){
		$rootScope.$broadcast('MyAppointmentChange');
	};
	
    

	return myAppointment;
}]);
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
'use strict';

angular.module('messages').factory('MessageHelper', [
	function() {
		// Messagehelper service logic
		var _this = this;
		_this.to = {};

		_this.setReceive= function(to){
			_this.to = to;
			alert(to._id);
		};
		_this.getReceive = function(){
			alert(_this.to._id);
			console.log(_this.to);
			return _this.to;
	
		};

		_this.items = 5;

		return _this;
	}
]);
'use strict';

//Messages service used to communicate Messages REST endpoints
angular.module('messages').factory('Messages', ['$resource',
	function($resource) {
	
			 return $resource('messages/:messageId', { messageId: '@_id'}, {
				update: {
					method: 'PUT'
				}, 
				query: {
					method: 'GET', 
					isArray: true
				}
			});

	}
]);
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
'use strict';

// Admins controller
angular.module('rdash').controller('AdminsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Users', '$http',  '$state', 'Staff', 'Appointments', 'geocoder', 'Payment', 
	function($scope, $stateParams, $location, Authentication, Users, $http, $state, Staff, Appointments, geocoder, Payment) {
	    $scope.app_query = Authentication.appointment_query;
		$scope.authentication = Authentication;
		$scope.payment = Payment;
		$scope.users = Users.query();
		$scope.msg = '';
		$scope.isClient = Authentication.isClient;
		$scope.staffList = {};
		$scope.show_table = false;
		$scope.total_users = $scope.users.length;	
		if (!$scope.authentication.user){
			$state.go('signin');
		}

		$scope.dt1 = new Date();
		$scope.dt2 = null;

		$scope.filterDateAdded = function (){
			if($scope.dt1 !== null){
			  $scope.dateFilter = function (item) {
			    return ($scope.parseDate(item.dateAdded) >= $scope.dt1 && $scope.parseDate(item.dateAdded) <= $scope.dt2);
			  };
			}
		};

		//For ordering Table data
		 $scope.items = 10;
 	 	 $scope.orderProp = '';
    	 $scope.reverse = true;
    	 
	    $scope.order = function(orderProp) {
	        $scope.reverse = ($scope.orderProp === orderProp) ? !$scope.reverse : false;
	        $scope.orderProp = orderProp;
	    };

		//sets the query parameter for the Appointment getter based on the user's role
		 if($scope.authentication.userRole === 'staff' || $scope.authentication.userRole === 'admin'){
		 		$scope.isClient = false;
		 }
	
		//Functions related to Appointments ENDS



		$scope.createUser = function() {
		
			geocoder.geocode($scope.credentials)
			.success(function(res, status, headers, config) {
				console.log(res);
		          var results = res.results[0].geometry.location;
		          $scope.credentials.address.main_address.lat = results.lat;
		          $scope.credentials.address.main_address.lng = results.lng;
		       

		         $http.post('/auth/createuser', $scope.credentials)
		         .success(function(response) {

					$location.path('/dashboard/tables');
				}).error(function(response) {
						$scope.error = response.message;
				});
		          // this callback will be called asynchronously
		          // when the response is available
		        }).
		      error(function(results, status, headers, config) {
		      	$scope.error = results.message;
		        // called asynchronously if an error occurs
		        // or server returns response with an error status.
		      });	
		};
/*showStaff
		// Update a user profile
		$scope.updateUserProfile = function() {
		
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
					console.log(user);
				user.$update(function(response) {
					$scope.success = true;
					$scope.users = Users.query();
				}, function(response) {
					$scope.error = response.data.message;
				});
			
		};*/


		$scope.viewing = {};
		var individuals_appointments = {};
		var ind_apps = {};
		if (Authentication.userRole === 'user'){
			individuals_appointments = {
				client: Authentication.user.id
			};
		} else {
			individuals_appointments = {
				staff_id: $stateParams.userId
			};
		}
		

		$scope.findOne = function() {
			$scope.viewing = Users.get({
				id: $stateParams.userId
			});
			console.log($scope.viewing);
			$scope.ind_apps = Appointments.query(individuals_appointments);

		};
		if ($stateParams.userId){
			$scope.findOne();
		}
		/*$scope.removeUser = function(user) {
			Users.delete(user).$promise.then(function(res){
			console.log(res);
			if (res.message === 'No user'){
					$scope.error = res.message;
				} else{
				// And redirect to the index page
				$scope.showUsers();
				
				}
			});

*/


}]);
'use strict';

angular.module('rdash').controller('AlertsCtrl', ['$scope', function($scope){
   /* $scope.alerts = [{
        type: 'success',
        msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
    }, {
        type: 'danger',
        msg: 'Found a bug? Create an issue with as many details as you can.'
    }, 
    {
        type: 'warning',
        msg: 'Ooh yeah!!.'
    }];*/

    $scope.addAlert = function() {
        $scope.alerts.push({
            msg: 'Another alert!'
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}]);

'use strict';

angular.module('rdash').controller('MasterCtrl', ['$scope', '$state', '$rootScope', 'Authentication', '$cookieStore',  
    function($scope,  $stateParams, $rootScope, Authentication, $cookieStore){
  /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
   $scope.authentication = Authentication;
console.log($scope.authentication);
    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
    
}]);


'use strict';

angular.module('rdash').controller('UserViewController', ['$scope', 'Users', '$stateParams', 'Appointments',
	function($scope, Users, $stateParams, Appointments) {
		$scope.viewing = {};
		$scope.appointments = {};
		var app_query = {};
		if ($stateParams.userRole === 'user'){
			app_query = {
				client: $stateParams.userId
			};
		} else {
			app_query = {
				staff_id: $stateParams.userId
			};
		}
		console.log($stateParams);
		$scope.findOne = function() {
			$scope.viewing = Users.get({
				id: $stateParams.userId
			});

			$scope.appointments = Appointments.query(app_query);
			
		};
		if ($stateParams.userId){
			$scope.findOne();
		}
}]);
'use strict';
/**
 * Loading Directive
 * @see http://tobiasahlin.com/spinkit/
 */
angular
    .module('rdash')
    .directive('rdLoading', function(){
    	var directive = {
        restrict: 'AE',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
    return directive;
    });


/**
 * Widget Body Directive
 */
'use strict';
angular
    .module('rdash')
    .directive('rdWidgetBody', function(){
        var directive = {
        requires: '^rdWidget',
        scope: {
            loading: '@?',
            classes: '@?', 
            query: '@?'
        },
        transclude: true,
        template: '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
        restrict: 'E'
    };
    return directive;

    });


/**
 * Widget Footer Directive
 */
'use strict';
angular
    .module('rdash')
    .directive('rdWidgetFooter', function(){
    	var directive = {
        requires: '^rdWidget',
        transclude: true,
        template: '<div class="widget-footer" ng-transclude></div>',
        restrict: 'E'
   		 };
   		 return directive;
    });

/**
 * Widget Header Directive
 */
'use strict';
angular
    .module('rdash')
    .directive('rdWidgetHeader', function(){
     var directive = {
        requires: '^rdWidget',
        scope: {
            title: '@',
            icon: '@', 
            query: '@?'
        },
        transclude: true,
        template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="col-xs-12" ng-transclude></div></div></div>',
        restrict: 'E'
    };
    return directive;        
    });


/**
 * Widget Directive
 */
'use strict';
angular
    .module('rdash')
    .directive('rdWidget', function(){
 
          var directive = {
                transclude: true,
                template: '<div class="widget" ng-transclude></div>',
                restrict: 'EA', 
                link: function(scope, element, attrs, tabsCtrl) {
/*                    tabsCtrl.addPane(scope);
*/                }
            };
            return directive;

    });

'use strict';

// Setting up route
angular.module('staff-onboard').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('onboard', {
			url: '/rmt',
			abstract: true,
			template: '<ui-view>',
			controller: 'StaffOnboardController'
   		}).
   		state('onboard.onboard_1', {
   			url: '/onboard', 
   			views:{
	                '': {templateUrl: 'modules/staff-onboard/views/staff-onboard.html', 
	             		controller: 'StaffOnboardController'
	             	},
	                'panel1@onboard.onboard_1': {
	                    templateUrl: 'modules/staff-onboard/views/onboard_1.html', 
	                    controller: 'StaffOnboardController'
   					}
              	} 
   		})
   		.state('onboard.onboard_2', {
   			url: '/apply', 
   			templateUrl: 'modules/staff-onboard/views/onboard_2.html', 
	        controller: 'StaffOnboardController'
	             	
             
   		})
   		.state('onboard.thanks', {
   			url: '/thanks', 
   			views:{
	                '': {templateUrl: 'modules/staff-onboard/views/thanks.html', 
	             		controller: 'StaffOnboardController'
	             	}
              	} 
   		})/*.
		state('user', {
                url: '/user/:userId/:userRole',
                views:{
	                '': {templateUrl: 'modules/users/views/settings/user.client.view.html', 
	             		controller: 'SettingsController'
	             	},
	                'userAppointments@user': {
	                    templateUrl: 'modules/appointments/views/appointments-view.html', 
	                    controller: 'AppointmentsController'
   					}, 
   					'profile@user': {
   						templateUrl: 'modules/users/views/partials/staff-profile.html', 
   						controller: 'SettingsController'
   					}
              	}  
         })*/;
	}
]);
'use strict';

angular.module('staff-onboard').controller('StaffOnboardController', ['$scope', 'Payment', '$http', 'ngToast', '$state',  
	function($scope, Payment, $http, ngToast, $state) {


		 	$scope.payment = Payment;
		 	$scope.account_details = {};
		 	$scope.account_details.legal_entity = {};
		 	$scope.account_details.legal_entity.managed = true;
		 	$scope.account_details.legal_entity.country = 'CA';
		 	$scope.account_details.legal_entity.dob = '';
		 	$scope.account_details.today = new Date();

$scope.sendApplication = function(rmt){
  $http.post('/staff', rmt)
  .success(function(data, status){
    $state.go('onboard.thanks');
  }).error(function(err, status){
    console.log(err);
    ngToast.create({
      className: 'danger', 
      content: err.msg
    });
  });

};

$scope.today = function() {
  $scope.account_details.legal_entity.dob = new Date()-20;
  };
  $scope.today();

  $scope.clear = function () {
    $scope.account_details.legal_entity.dob = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };

  $scope.format = 'dd-MMMM-yyyy';

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

	}

]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', '$injector',
			function($q, $location, $injector) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								$injector.get('Authentication').user = null;

								// Redirect to signin page
								$location.path('/signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html', 
			controller: 'SettingsController'
		}).
		state('profile.payment', {
			url: '/payment',
			templateUrl: 'modules/users/views/settings/payment.client.view.html'
		})
		.
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('payment', {
			url: '/payment',
			templateUrl: 'modules/users/views/settings/payment.client.view.html', 
			controller: 'SettingsController'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		}).
		state('user', {
                url: '/user/:userId/:userRole',
                views:{
	                '': {templateUrl: 'modules/users/views/settings/user.client.view.html', 
	             		controller: 'SettingsController'
	             	},
	                'userAppointments@user': {
	                    templateUrl: 'modules/appointments/views/appointments-view.html', 
	                    controller: 'AppointmentsController', 
	                    resolve: {
                        	appointments: [ '$q', 'Appointments', function($q, Appointments){
                            var JobDone = Appointments.query({jobDone: true});
                            var notCancelled = Appointments.query({cancelled: false});
                            return $q.all([JobDone.$promise, notCancelled.$promise]);
                        	}]
                   		 }
   					}, 
   					'profile@user': {
   						templateUrl: 'modules/users/views/partials/staff-profile.html', 
   						controller: 'SettingsController'
   					}
              	}  
         });
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', '$rootScope', '$state', 'myAppointment', 
	function($scope, $http, $location, Authentication, $rootScope, $state, myAppointment) {
		$scope.authentication = Authentication;
	/*	var myAppointmentObj = myAppointment.getData();
		$scope.credentials = myAppointmentObj;
		console.log($scope.credentials);*/
	/*
	if ($scope.credentials.password !== $scope.credentials.password1){
			$scope.error= 'Password do not match';
		} else {
			$scope.error = '';
		}*/
		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');
			$scope.$on('error', function(event, data){
				$scope.error = data.message;
			
			});

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				console.log(response);
				$scope.authentication.user = response;
				
				if (response.token ===''){
					$location.path('/payment');
				} else {
					$location.path('/user/home');
				}
				
				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('ImgCtrl', ['$scope', 'Upload', 'Authentication', 'Users', 'ngToast', '$http',
	function($scope, Upload, Authentication, Users, ngToast, $http) {
		$scope.user = Authentication.user;
		$scope.preview = $scope.user.profile_pic;

          $scope.imageCropResult = null;
          $scope.showImageCropper = false;
          $scope.theResult = {};
          $scope.showImg = true;
			$scope.showImageFunction;

          $scope.showImageFunction = function(){
          	if ($scope.user.profile_pic && $scope.imageCropStep ===1 ){
          	$scope.showImg = true;
          } else if($scope.user.profile_pic && $scope.imageCropStep ===2) {
			$scope.showImg = false;
          }
          };

          

          $scope.$watch('imageCropResult', function(newVal) {
            if (newVal) {
            	/*$scope.imageCropResult = {
            		dataURL: newVal, 
            		
            	};*/
/*            	$scope.croppedImgUpload($scope.imageCropResult);
*/              console.log('imageCropResult', newVal);
				var theResult = {
				 	dataURL: newVal, 
				 	lastname: Authentication.user.lastName,
            		firstname: Authentication.user.firstName
				 };
				 console.log(theResult);
				 $scope.croppedImgUpload(theResult);
            }
            
          });
/*
				console.log($scope.preview);

                 $scope.$watch('files', function () {
		       	 /* $scope.upload($scope.files);
		   		 });*/
		
		$scope.croppedImgUpload = function(base64ImgObject){
			console.log('From the Cropped Image Upload Function');
			$http.post('/auth/uploadAvatar', base64ImgObject)
			.success(function(data, status, headers, config){
				console.log(data);
				console.log(status);
				console.log(data);
				if (status === 200){
                		var user = new Users(data);

                	}
		                	//updates the user record with the Image URL
		              		var patharray = [];
		                	var profile_pic_path = data.path.replace('/Users/Bazazi/Desktop/meanJS/public', '');
		                	$scope.preview = profile_pic_path;
		                	$scope.user.profile_pic = data.dataURL;
		                	var user = new Users($scope.user);
							
							user.$update(function(response) {
								$scope.success = true;
								$scope.imageCropStep =1
								ngToast.create({
								  className: 'success',
								  content: 'Your Profile Picture was updated successfully', 
								  timeout: 4000
								});

								Authentication.user = response;
								$scope.preview = Authentication.user.profile_pic;
							}, function(response) {
								console.log(response);
								// create a toast with settings:
								ngToast.create({
								  className: 'danger',
								  content: response.data.message
								});
								
							});





			}).error(function(data, status, headers, config){
				console.log(data);
			});
		}
					//For the image uplaod

		  /*  $scope.upload = function (files) {
		        if (files && files.length) {
	            for (var i = 0; i < files.length; i++) {
		                var file = files[i];
		                Upload.upload({
		                    url: 'auth/uploadAvatar',
		                    fields: {
		                    	'id': $scope.user._id	
		                },
		                    file: file
		                }).progress(function (evt) {
		                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);

		                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
		                }).success(function (data, status, headers, config) {
		                if (status === 200){
		                		var user = new Users(data);

		                	}
		                	//updates the user record with the Image URL
		                	var patharray = [];
		                	var profile_pic_path = data.path.replace('/Users/Bazazi/Desktop/meanJS/public', '');
		                	$scope.preview = profile_pic_path;
		                	$scope.user.profile_pic = profile_pic_path;
		                	var user = new Users($scope.user);
							
							user.$update(function(response) {
								$scope.success = true;

								ngToast.create({
								  className: 'success',
								  content: 'Your Profile Picture was updated successfully', 
								  timeout: 4000
								});

								Authentication.user = response;

							}, function(response) {
								console.log(response);
								// create a toast with settings:
								ngToast.create({
								  className: 'danger',
								  content: response.data.message
								});
								
							});
		                    console.log('file ' + config.file.name + ' uploaded. Response: ' + data.msg);
		                });
		            }
		        }
		    }*/
	}
]);
'use strict';

angular.module('users').controller('PaymentModalCtrl', ['$scope', '$rootScope', '$modalInstance', 'user_card', 'payment', 
 	function($scope, $rootScope, $modalInstance, user_card, payment) {
 		console.log(payment);
 		console.log(user_card);
 		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };

 		$scope.payment = payment;
 		$rootScope.$on('card_change', function(){
 			 $scope.cancel();
 		});
 	}]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication', '$rootScope', 'ngToast',
	function($scope, $stateParams, $http, $location, Authentication, $rootScope, ngToast) {
		$scope.authentication = Authentication;
		console.log($scope.authentication);
		$rootScope.$broadcast('password_reset');
		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;
				$rootScope.$emit('password_reset');
				// And redirect to the index page
				$location.path('/dashboard');
				ngToast({
					content: 'Your password was changed successfully', 
					className: 'success'
				});
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$rootScope', '$http', '$location', 'Users', 'Authentication', 'Payment', '$state', 'geocoder', 'Upload', 'ngToast', 'Appointments',  '$stateParams', 'Staff', '$modal', 'myAppointment', 'notifications', 
	function($scope, $rootScope, $http,  $location, Users, Authentication, Payment, $state, geocoder, Upload, ngToast, Appointments, $stateParams, Staff, $modal, myAppointment, notifications) {
		$scope.user = Authentication.user;
		$scope.appointment = myAppointment.getData();
		$scope.authentication = Authentication;
		$scope.appointments = undefined;
		$scope.userFlag = true;
		$scope.btnText = 'Show Users';
		$scope.def_av = '../../../../img/flat-avatar.png';
		if ($scope.user.stripeCustomer){
			$scope.card = $scope.user.stripeCustomer.sources.data[0];
		}
		 $scope.role = $scope.authentication.userRole;

		
		$scope.save_customer = Payment;
		$scope.geocoder = geocoder;
		$scope.viewing = {};

		//This listens for the broadcast from the payment Service get token method
		$rootScope.$on('card_change', function(){
			 
			 console.log($scope.appointment);
			$scope.save_customer.updateUserTokens($scope.user, function(res){
				$scope.card = res.stripeCustomer.sources.data[0];

				ngToast.create({
					className: 'success',
					content: 'Your card details were updated successfully'
				});
					if ($scope.appointment){
						$scope.appointment.client = $scope.user._id;
						$scope.appointment.payment_entered = true;
						var appointment = new Appointments($scope.appointment);
						 appointment.$save(function(res){
						 	console.log(res);
						 	notifications.showSuccess({message: 'Success! You should recieve an email shortly'});
							$state.go('rdash.dash');
						});
					}

			});
			
		});

			//This listens for the broadcast from the payment Service get token method
		$rootScope.$on('show_card', function(){
			$state.reload();			
		});

		$scope.remove= function(user){
			user.$remove(function(res){
				console.log(res);
			});
		};

		$scope.findOne = function(app_query) {
			$scope.viewing = Users.get({
				id: $stateParams.userId
			});
		};
			
		if($stateParams.userId){
			$scope.findOne($stateParams.userId);
		}

		$scope.usersAppointments = function(){
				Appointments.query(app_query).$promise.then(function(res){
				if (res.length > 0){
					$scope.appointments = res;
					$scope.total_apps = $scope.appointments.length;	

				} else {
					$scope.msg = 'You have no appointments';
					$scope.total_apps = res.length;
				}				
			});
		};



		//Functions related to Client (users) STARTS
		$scope.openModal = function(user){
			var modalInstance = $modal.open({
			      templateUrl: 'modules/users/views/settings/payment.modal.view.html',
			      controller: 'PaymentModalCtrl',
			      size: 'sm',
			      scope: $scope, 
			      resolve: { 
			        user_card: function () {
			          return user;
			        }, 
			        payment: ['Payment', function(Payment){
			        	return Payment;
			        }]
			      }
			    });

			    modalInstance.result.then(function (selectedItem) {
			    	console.log(selectedItem);
			      $scope.selected = selectedItem;
			    }, function () {
			      $scope.modalInstance = null;
			    });


		}
		$scope.showUsers = function (){
			$scope.userFlag = !$scope.userFlag;
			if(!$scope.userFlag){
				$scope.btnText = 'Show Users';
				Staff.query({roles: 'staff'}).$promise.then(function(res){
				$scope.users = res;
				$scope.total_users = $scope.users.length;	
				});
			} else {
				$scope.btnText = 'Show Staff';
			$scope.users = Users.query();
			$scope.show_table = !$scope.show_table;
			}
		};	

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				 $scope.geocoder.geocode($scope.user)
				 .success(function(res, status){
				 		var results = res.results[0].geometry.location;
				 		
				 		$scope.user.address.main_address.lat = results.lat;
				 		$scope.user.address.main_address.lng = results.lng;
				 }).
				 error(function(res){
				 	ngToast.create({
				 		className: 'danger',
				 		content: res.message
				 	});
				 });

				var user = new Users($scope.user);
				
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;

					ngToast.create({
				 		className: 'success',
				 		content: 'Your profile updated successfully'
				 	});
					$state.go('dash');

				}, function(response) {
					ngToast.create({
				 		className: 'danger',
				 		content: response.data.message
				 	});
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};
		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

 
	}
]);
'use strict';

// Validator Directive for user variables
angular.module('users').directive('match', ["$parse", function($parse) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(function() {        
        return $parse(attrs.match)(scope) === ctrl.$modelValue;
      }, function(currentValue) {
        ctrl.$setValidity('mismatch', currentValue);
      });
    }
  };
}]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [ '$http',  '$state',  '$location', '$window', '$rootScope',  
	function($http, $state,  $location, $window, $rootScope) {
		 
		var _this = this;
		var _user_exists = {};
		_this.appointment_query ={};
		_this.userRole = {};
		_this.showAdmin = false;
		_this._data = {
			user: window.user
		};
		_this.isClient = false;
		if (_this._data.user) {

			switch(_this._data.user.roles[0] || _this.user.roles[0]) {
			    case 'staff':
			    	_this.userRole = 'staff';
			    	_this.appointment_query = { 
			    		staff_id: _this._data.user._id, 
			    		cancelled: false
			    	};
			        break;
	 			case 'admin':
			    	_this.userRole = 'admin';
			    	_this.showAdmin = true;
			    	_this.appointment_query = { 
			    		cancelled: false
			    	};
			        break;
			    default:
			       _this.userRole = 'user';
			        _this.isClient = true;
			       _this.appointment_query = { 
			    		client: _this._data.user._id, 
			    		cancelled: false
			    	};
			}
		}
		
		_this.signUp = function(credentials, callback){
			$http.post('/auth/signup', credentials).success(function(response, message) {
				_this._data.user = response;
				_this.user = response;
				callback(response);
			}).error(function(response) {
				_this.error = response.message;
			});
		};

		_this.check_username = function (obj, callback){
					$http.post('/auth/check_username', obj).success(function(response) {
					
					callback(response);

					// And sets the error parameter to null
					/*$location.url('/signin');*/
				}).error(function(response) {
					$rootScope.$broadcast('error', response);
				});
		};

		_this.signin = function(credentials, callback) {
			$http.post('/auth/signin', credentials).success(function(response) {

				// If successful we assign the response to the global user model
				_this._data.user = response;
				_this.user = response;

				console.log(_this._data.user);

				if (!response.stripeCustomer){
					$state.go('profile.payment');
				} else if(response.displayName === null) {
					$state.go('profile');
				}else{
				// And redirect to the index page
					$state.go('rdash.dash');
				}
			}).error(function(response) {
				$rootScope.$broadcast('error', response);
			});
		};


		_this.createUser = function(credentials, callback) {
			$http.post('/auth/signup', credentials)
			.success(function(response) {
				callback(response);
			}).error(function(response) {
				_this.error = response.message;
			});
		};

		_this.signout = function() {
			$http.get('/auth/signout').success(function(response) {
				// If successful we assign the response to the global user model
				console.log(response.user);
				console.log(response);
				_this._data.user = response;
				_this.user = response;
/*				$window.location.reload();
*/				// And redirect to the index page
			}).error(function(response) {
				_this.error = response.message;
			});
		};

		return _this;
	}
]);
'use strict';

// Authentication service for user variables
angular.module('core').factory('Payment', ['$rootScope', 'Users',  '$state', 'Stripe', 'Authentication', 'ngToast', '$sce', '$q', 'Appointments', '$resource', '$http',
	function($rootScope, Users,  $state, Stripe, Authentication, ngToast, $sce, $q, Appointments, $resource, $http){
   
    var user = Authentication._data.user;
    var payment = {};
    payment.token = '';
    payment.data = {};
  	payment.getStripeToken = function(status, response) {
      	
  		if (response.error) {
         ngToast.create({
          content: response.error.message,
          className: 'danger'
         });
  		   payment.error = response.error;
  		   return response;
  		  } else {
  		    // response contains id and card, which contains additional card details
  		    var token = response;
  		    payment.token = token;
          
          $state.go('profile');
  		    $rootScope.$emit('card_change');
  		    
  		    return payment.token;
      	}
    };

    payment.getToken = function(){
    	return payment.token;
    };

    payment.updateUserTokens = function(user, callback){
     var token = payment.token;
        console.log('updateUserTokens Running');

      //pass the new token to Stripe resource to create a Customer Object
      var stripe = new Stripe(token);
      stripe.$save().then(function(res){
        console.log(res);
        //update the user object with the new stripeCustomer Data
        var newuser = new Users(user); 
        newuser.stripeCustomer = res.stripeCustomer;

          //update the User object with the stripCustomer Data
          newuser.$update().then(function(updatedUser) {
            Authentication._data.user = updatedUser;
            Authentication.user = updatedUser;
              $rootScope.$emit('show_card');
            callback(updatedUser);
          }, function(errorResponse) {
            payment.error = errorResponse.data.message;
          });
      });  
    };

    payment.createRefund = function(appointmentID, dollarAmount, callback){
      console.log(appointmentID);
console.log(dollarAmount);
      var refundAmount = {};

  
       Appointments.get({ 
            appointmentId: appointmentID
          }).$promise.then(function(data){
              console.log(data); 
              if (data.stripeChargeObj === undefined){
                  ngToast.create({
                  className: 'danger',
                  dismissButton: true, 
                  content: 'This customer has not been charged'
                });
              } else if(data.refundObj[0] !== undefined){
                 ngToast.create({
                  className: 'danger',
                  dismissButton: true, 
                  content: 'This refund has already been made'
                });
                 return;
              } else {

                 if (dollarAmount !== null){
                  refundAmount = dollarAmount*100;
                 } else {
                  refundAmount = data.stripeChargeObj.amount;
                 };
                 console.log(data.stripeChargeObj.amount);
                 console.log(refundAmount);

                var refundDetails = {
                  refundAmount: refundAmount,
                  chargeID: data.stripeChargeObj.id, 
                  reason: 'No show', 
                  stripeCustomer: user.stripeCustomer.id
                };
                var Myresource = $resource('stripe/refund/:chargeID', {chargeID: '@chargeID'});
                var stripe = new Myresource(refundDetails);
                console.log(stripe);
                stripe.$save().then(function(refundRes){
                  console.log(refundRes);
                  data.refundObj.push(refundRes.refund);
                  data.$update().then(function(result){
                    
                    ngToast.create({
                    className: 'success',
                    dismissButton: true, 
                    content: refundRes.message
                    });
                  
                    callback(result);
                  });
                  
                }, function(err){
                  //This is the errror handler
                  console.log(err);
                  
                     ngToast.create({
                    className: 'danger',
                    dismissButton: true, 
                    content: err.data.error.message
                  });
                });
              }
          });
    };

    payment.createStaffAccount = function (account_details){
      console.log(account_details);
       $http.post('stripe/staff/create', account_details)
       .success(function(result){
        console.log(result);
       }).error(function(err){
        console.log(err);

       })
    };

    payment.createCharge = function(user, appointmentID, callback){
      console.log(user);
      if (user.stripeCustomer === undefined){
        payment.error = 'You must add a valid card to proceed';
      } else {
        console.log(user.stripeCustomer.id);
        var Obj = {token: user.stripeCustomer.id, appointment_id: appointmentID };
         var stripe = new Stripe(Obj);
          stripe.$charge().then(function(res){
            Appointments.get({ 
            appointmentId: appointmentID
            })
            .$promise.then(function(data){
              data.stripeChargeObj = res.chargeObj;
              data.jobDone = true;
              data.cost = res.amount;
              callback(data);
           
            }, function(err){
              console.log('Get Error '+err);
                ngToast.create({
                    className: 'success',
                    dismissButton: true, 
                    content: err.data.message.message
                    });
              });

            ngToast.create({
                  className: 'success',
                  dismissButton: true, 
                  content: res.msg
            });
          
         }, function(err){
          console.log(err);
          var toast = ngToast.create({
                className: 'danger',
                dismissButton: true, 
                content: $sce.trustAsHtml(err.data.message.message + '<br> <a ng-click="$state.go(\'payment\')">Click here to add a card</a>'),
                compileContent: true
              });
         });
      }
    };
	return payment;
}]);
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
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users/:id', {id: '@_id'}, {
			update: {
				method: 'PUT'
			}, 
			getStaff: {
				method: 'GET', 
				isArray: true
			}
		});
	}
]);
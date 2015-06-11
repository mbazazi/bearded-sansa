'use strict';

module.exports = {
	app: {
		title: 'myMeanApp',
		description: 'Full Stack Mean Example',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				
				'public/lib/bootstrap/dist/css/bootstrap.css', 
				'public/lib/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css',
				'public/lib/ngtoast/dist/ngToast.min.css', 
				'public/lib/ngtoast/dist/ngToast-animations.min.css'				/*
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/modules/core/css/mystyle.css',*/
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/bootstrap/dist/js/bootstrap.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-bootstrap/ui-bootstrap.js', 
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js', 
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-utils/ui-utils.js', 
				'public/lib/angular-ui-bootstrap-datetimepicker/datetimepicker.js', 
				'public/lib/stripe-angular/stripe-angular.js', 
				'public/lib/angular-strap/dist/angular-strap.js', 
				'public/lib/angular-utils-pagination/dirPagination.js', 
				'public/lib/bootstrap-switch/dist/js/bootstrap-switch.js', 
				'public/lib/angular-bootstrap-switch/common/module.js',
				'public/lib/angular-bootstrap-switch/src/directives/bsSwitch.js', 
				'public/lib/lodash/dist/lodash.js', 
				'public/lib/angular-google-maps/dist/angular-google-maps.js',
				'public/lib/ng-file-upload-shim/ng-file-upload-shim.min.js',
				'public/lib/ng-file-upload/ng-file-upload.min.js', 
				'public/lib/ngtoast/dist/ngToast.min.js'
				/*'public/lib/oclazyload/dist/ocLazyLoad.js', 
				'public/lib/metisMenu/dist/metisMenu.js', 
				'public/lib/json3/lib/json3.js', 
				'public/lib/es5-shim/es5-sham.js', 
				'public/lib/es5-shim/es5-shim.js', 
				'public/lib/Chart.js/src/*.js', 
				'public/lib/angular-chart.js/dist/angular-chart.js', 
				'public/lib/angular-loading-bar/build/loading-bar.js'*/

			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
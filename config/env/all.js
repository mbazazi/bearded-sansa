'use strict';

module.exports = {
	app: {
		title: 'Hander',
		description: 'Registered Massage Therapists on Demand',
		keywords: 'Registered, Massage, Therapy, on demand, RMT'
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
				'public/lib/ngtoast/dist/ngToast-animations.min.css', 
				'public/lib/angucomplete-alt/angucomplete-alt.css', 
				'public/lib/ng-notifications-bar/dist/ngNotificationsBar.min.css',
				'public/lib/angular-busy/dist/angular-busy.min.css',
				'public/lib/angular-chart.js/dist/angular-chart.min.css', 
				'public/lib/angular-image-crop/image-crop-styles.css'
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
				'public/lib/ngtoast/dist/ngToast.min.js',
				'public/lib/angucomplete-alt/dist/angucomplete-alt.min.js', 
				'public/lib/ng-notifications-bar/dist/ngNotificationsBar.min.js', 
				'public/lib/angular-busy/dist/angular-busy.min.js',
				'public/lib/Chart.js/Chart.min.js',
				'public/lib/angular-chart.js/dist/angular-chart.min.js', 
				'public/lib/angular-image-crop/image-crop.js'

			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/javascripts/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
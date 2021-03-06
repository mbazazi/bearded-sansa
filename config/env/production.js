'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mymeanapp',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',

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
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',

				'public/lib/jquery/dist/jquery.js',
				'public/lib/bootstrap/dist/js/bootstrap.js',
			
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
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};

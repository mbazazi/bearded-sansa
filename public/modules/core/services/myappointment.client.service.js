'use strict';

// Authentication service for user variables
angular.module('core').factory('myAppointment', function($rootScope){
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
});
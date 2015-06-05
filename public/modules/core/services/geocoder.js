'use strict';

angular.module('core')
.factory('geocoder', ['$http','$state', function($http, $state){

var geocoder ={};

geocoder.geocode = function (formData){
	console.log(formData.address.main_address.street_1);
	var address = formData.address.main_address.street_1+', '+formData.address.main_address.street_2+' ,'+formData.address.main_address.city+', '+formData.address.main_address.postcode;

			    var key = 'AIzaSyACVwB4i_6ujTrdjTMI-_tnsDrf6yOfssw';

			   return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key);
   
};


return geocoder;

}]);
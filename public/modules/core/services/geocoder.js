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
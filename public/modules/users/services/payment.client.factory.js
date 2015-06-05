'use strict';

// Authentication service for user variables
angular.module('core').factory('Payment', ['$rootScope', 'Users', '$cookieStore', '$state', 
	function($rootScope, Users, $cookieStore, $state){
var payment = {};
payment.token = '';
	payment.getStripeToken = function(status, response) {
    		
		if (response.error) {
		    // Show the errors on the form 
		  /*!!!!!!!!!!!!C onfigure the error showing on the page*/
		   console.log(response);
		   payment.error = response.error;
		   return response;
		  } else {
		    // response contains id and card, which contains additional card details
		    var token = response;
		    payment.token = token;
		    $cookieStore.card = token.card;
		    $rootScope.$emit('card_change');
		    
		    return payment.token;
    	}
    };

   /*  payment.charge = function () {
    	var card = payment.getToken();
    	card
        return $http.post('https://yourserver.com/payments', payment);
      })
      .then(function (payment) {
        console.log('successfully submitted payment for $', payment.amount);
      })
      .catch(function (err) {
        if (err.type && /^Stripe/.test(err.type)) {
          console.log('Stripe error: ', err.message);
        }
        else {
          console.log('Other error occurred, possibly with your API', err.message);
        }
      });
  };*/




    payment.getToken = function(){
    	return payment.token;
    };

    payment.updateUserTokens = function(user, token, address){
    	var newuser = new Users(user); 
    	newuser.token = payment.token; 
      console.log(newuser);
     newuser.$update(function(response) {
       $state.go('profile');
      }, function(errorResponse) {
        payment.error = errorResponse.data.message;
      });
    	
    };

	return payment;
}]);
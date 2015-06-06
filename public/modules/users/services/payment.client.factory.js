'use strict';

// Authentication service for user variables
angular.module('core').factory('Payment', ['$rootScope', 'Users', '$cookieStore', '$state', 'Stripe', 'Authentication', 
	function($rootScope, Users, $cookieStore, $state, Stripe, Authentication){
var user = Authentication._data.user;
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
        
/*        //creates a Stripe Customer Object
        if(user.stripeCustomer === null){

        } else {
            stripe.$update().then(function(res){
            console.log(res);
          });
        }*/


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

    payment.updateUserTokens = function(user, address){
      var token = payment.token;
      //pass the new token to Stripe resource to create a Customer Object
      var stripe = new Stripe(token);
      stripe.$save().then(function(res){
        //update the user object with the new stripeCustomer Data
        var newuser = new Users(user); 
        newuser.stripeCustomer = res.stripeCustomer;

        //update the User object with the stripCustomer Data
        newuser.$update(function(updatedUser) {
          Authentication.user = updatedUser;
         $state.go('profile');
        }, function(errorResponse) {
          payment.error = errorResponse.data.message;
        });
      });
    };

	return payment;
}]);
'use strict';

// Authentication service for user variables
angular.module('core').factory('Payment', ['$rootScope', 'Users', '$cookieStore', '$state', 'Stripe', 'Authentication', 'ngToast', '$sce', '$q', 'Appointments', '$resource',
	function($rootScope, Users, $cookieStore, $state, Stripe, Authentication, ngToast, $sce, $q, Appointments, $resource){
var user = Authentication._data.user;
var payment = {};
payment.token = '';
payment.data = {};
payment.counter = 0;
	payment.getStripeToken = function(status, response) {
    		
		if (response.error) {
		    // Show the errors on the form 
		  /*!!!!!!!!!!!!C onfigure the error showing on the page*/
		   console.log(response);
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

    payment.updateUserTokens = function(user, callback){
     var token = payment.token;
        console.log('updateUserTokens Running');

      //pass the new token to Stripe resource to create a Customer Object
      var stripe = new Stripe(token);
      console.log(stripe);
      stripe.$save().then(function(res){
        //update the user object with the new stripeCustomer Data
        var newuser = new Users(user); 
        newuser.stripeCustomer = res.stripeCustomer;

          //update the User object with the stripCustomer Data
          newuser.$update().then(function(updatedUser) {
            Authentication._data.user = updatedUser;
            Authentication.user = updatedUser;
            callback(updatedUser);
          }, function(errorResponse) {
            payment.error = errorResponse.data.message;
          });
      });  
    };

    payment.createRefund = function(appointmentID){
      console.log(appointmentID);
      var id = '5578489d5988bc32b5455207';
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
              } else {

                var refundDetails = {
                  amount: 2200,
                  chargeID: data.stripeChargeObj.id, 
                  reason: 'No show', 
                  stripeCustomer: user.stripeCustomer.id
                };
                var myresource = $resource('stripe/refund/:chargeID', {chargeID: '@chargeID'});
                var stripe = new myresource(refundDetails);
                console.log(stripe);
                stripe.$save().then(function(refundRes){
                  console.log(refundRes);
                  data.refundObj.push(refundRes.refund);
                  data.$update().then(function(){
                    ngToast.create({
                    className: 'success',
                    dismissButton: true, 
                    content: refundRes.message
                    });
                  });
                  
                }, function(data){
                  //This is the errror handler
                  console.log(data);
                
                   ngToast.create({
                    className: 'danger',
                    dismissButton: true, 
                    content: data.data.error.message
                  });
                });
              }
          });
    };

    payment.createCharge = function(user, appointmentID){
      if (user.stripeCustomer === undefined){
        payment.error = 'You must add a valid card to proceed';
      } else {
        console.log(user.stripeCustomer.id);
        var Obj = {token: user.stripeCustomer.id};
         var stripe = new Stripe(Obj);
           stripe.$charge().then(function(res){
            Appointments.get({ 
            appointmentId: appointmentID
            })
            .$promise.then(function(data){
              data.stripeChargeObj = res.chargeObj;
              Appointments.update(data).$promise.then(function(data) {
                console.log(data);
              }, function(err){
                console.log('Update Error '+err);
                   ngToast.create({
                    className: 'success',
                    dismissButton: true, 
                    content: err.data.message.message
                    });
              });
            }, function(err){
              console.log('Get Error '+err);
                ngToast.create({
                    className: 'success',
                    dismissButton: true, 
                    content: err.data.message.message
                    });
              });
          console.log(res);

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
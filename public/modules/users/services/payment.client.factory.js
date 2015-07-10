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
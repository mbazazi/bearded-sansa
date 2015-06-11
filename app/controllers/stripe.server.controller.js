'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    _ = require('lodash'), 
   stripe = require('stripe')('sk_test_Ti4SYMYKTgO1Or9j6ITUCG1H');

/**
 * Create a Stripe Customer
 */
exports.createCustomer = function(req, res) {
  console.log('The Create Customer Request: '+req.body);
var stripeToken = req.body.id, 
	user = req.user;

	stripe.customers.create({
	  source: stripeToken,
	  description: user.email
	}).then(function(customer) {
		res.status(200).json({
			stripeCustomer: customer
		});
  }, function(err){
      res.status(400).json({
        error: err
      });
  });
};

/**
 * Show the current Stripe
 */
exports.createCharge = function(req, res, next) {
  console.log('The Create Charge Request: '+req.params);
console.log(req);
var customerId = req.params.stripeToken;
stripe.charges.create({
    amount: 2200, // amount in cents, again
    currency: 'cad',
    customer: customerId
  }, function(err, charge){
  	if (err) {
  		console.log('This is in the IF'+err);
  		 res.json(400, {
				message: err
		});
  	} else {
	  		console.log('This is in the ELSE'+charge);
	  	res.json(200, {
	  		msg: 'Charge Made Successfully', 
	  		chargeObj: charge
	  	});
  	}
  });
/*stripe.charges.create({
  amount: 400,
  currency: "cad",
  source: "tok_15h7kqAiN7fdr9RjifVA8J4n", // obtained with Stripe.js
  description: "Charge for test@example.com"
}, {
  idempotency_key: "Y74rQEkwwD9iCDls"
}, function(err, charge) {
  // asynchronously called
});*/


};

/**
 * Update a Stripe
 */


 exports.createRefund = function(req, res){
console.log('The Create refund Request: '+req.body.amount);
console.log('The Parameter with the Charge id is: '+req.params.chargeID+' and the rest of the data is in '+ req.body);
/*var myObj = req.body;
console.log(myObj);*/

  stripe.charges.createRefund(
    req.params.chargeID,
    {amount: 10},
    function(err, refund) {
      if (err){
        console.log(err);
        res.status(400).json({
          error: err
        });
      } else {
        res.status(200).json({
          message: 'The refund was made successfully',
          refund: refund
        });
      }
  });
};

exports.update = function(req, res) {

};

/**
 * Delete an Stripe
 */
exports.delete = function(req, res) {

};

/**
 * List of Stripes
 */
exports.list = function(req, res) {
console.log(req);
};
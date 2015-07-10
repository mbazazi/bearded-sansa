'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    _ = require('lodash'), 
   stripe = require('stripe')('sk_test_Ti4SYMYKTgO1Or9j6ITUCG1H');
  var users = require('../../app/controllers/users.server.controller');
  var Appointment = mongoose.model('Appointment');
   var app = require('../../app/controllers/appointments.server.controller');
  var config = require('../../config/config');

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
exports.createCharge = function(req, res) {
  console.log(req.params);
  console.log(req.body);
var customerId = req.params.stripeToken;
var amount = {};

  Appointment.findById(req.body.appointment_id)
  .populate('client')
  .populate('staff_id')
  .exec(function(err, appointment) {
    if (err) {
        console.log('This is in the IF'+err);
         res.json(400, {
          message: err
         });
    }

    if (! appointment) return next(new Error('Failed to load Appointment ' + id));
    console.log(appointment);

    amount.dollars = config.pricelist.price_per_hour_dollars * appointment.total_time;
    amount.dollars_to_staff = (1-config.pricelist.our_commission)* amount.dollars;
    amount.tax = amount.dollars * config.pricelist.tax_rate;
    amount.total_price = amount.tax + amount.dollars;
    amount.dollars.toFixed(2);
    amount.dollars_to_staff.toFixed(2);
    amount.tax.toFixed(2);
    amount.total_price.toFixed(2);
    amount.dollars_to_staff_stripe = amount.dollars_to_staff*100;
    amount.stripeamount = amount.total_price*100;

     stripe.charges.create({
      amount: amount.stripeamount, // amount in cents, again
      currency: 'cad',
      customer: customerId
    }, function(err, charge){
      if (err) {
        console.log('This is in the IF'+err);
         res.json(400, {
          message: err
      });
      } else {
          console.log('This is in the ELSE**********************'+charge);
        res.json(200, {
          status: 200,
          msg: 'Charge Made Successfully', 
          chargeObj: charge, 
          amount: amount
        });
      }
    });

  });
};

/**
 * Update a Stripe
 */


 exports.createRefund = function(req, res){
console.log('The Create refund Request: '+req.body);
console.log('The Parameter with the Charge id is: '+req.params.chargeID+' and the rest of the data is in '+ req.body);
/*var myObj = req.body;
console.log(myObj);*/
var refundAmount = req.body.refundAmount;

  stripe.charges.createRefund(
    req.params.chargeID,
    {amount: refundAmount},
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

exports.createStaffManagedAccount = function(req, res){
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

     /*var legal_entity = {};
     legal_entity.type="individual";
     legal_entity.first_name = req.body.legal_entity.firstName;
     legal_entity.last_name = req.body.legal_entity.lastName;

     legal_entity.address.city = req.body.legal_entity.city;
     legal_entity.dob = req.body.legal_entity.dob;
     legal_entity.ssn_last_4 = req.body.legal_entity.ssn_last_4;*/
console.log(req.body);
stripe.accounts.create({
  managed: false,
  country: 'CA', 
  email: req.body.email
}, function(err, account) {
   if(err){
    res.status(400).json(err);
   } else {
console.log(account);
req.body.stripe_managed_data = account.keys
req.body.roles = 'staff';
  users.create_user(req, res);
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
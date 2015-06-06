'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');
    var stripe = require('stripe')('sk_test_Ti4SYMYKTgO1Or9j6ITUCG1H');

/**
 * Create a Stripe Customer
 */
exports.createCustomer = function(req, res) {
	console.log(req.body);
var stripeToken = req.body.id, 
	user = req.user;
	console.log(stripeToken);

	stripe.customers.create({
	  source: stripeToken,
	  description: 'payinguser@example.com'
	}).then(function(customer) {
		console.log(customer);
		res.json({
			stripeCustomer: customer
		});
	});

};

/**
 * Show the current Stripe
 */
exports.read = function(req, res) {

};

/**
 * Update a Stripe
 */
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

};
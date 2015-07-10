	'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Appointment = mongoose.model('Appointment'),
	_ = require('lodash');
	var mailer = require('../../app/controllers/users.server.controller');

/**
 * Create a Appointment
 */
exports.create = function(req, res) {
	var appointment = new Appointment(req.body);
	appointment.user = req.user;
	appointment.cost = {};
	appointment.cost.stripe = appointment.total_time * 12500;
	appointment.cost.dollars = appointment.total_time * 125;
	appointment.cost.dollars.toFixed(2);

	appointment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			if (appointment.payment_entered === true){
				console.log('This is coming from the create appointment');
				mailer.sendEmail(appointment, null, function(emailSentOK){
					if (emailSentOK.emailSent === 'OK'){
						mailer.sendAppointmentConfirmation(appointment, function(result){
							
							if (result.response ==='250 Great success'){
								res.jsonp(appointment);
							} else {
								res.status(400).json(errorHandler);
							}
						});
						
					} else {
						res.status(400).json(errorHandler);
					}
				});
			} else{
				res.jsonp(appointment);
			}
		}
	});
};

/**
 * Show the current Appointment
 */
exports.read = function(req, res) {
	res.jsonp(req.appointment);
};

/**
 * Update a Appointment
 */
exports.update = function(req, res) {
	var staff_template = {};
	var client_template = {};
	var appointment = req.appointment;
	if (req.params.staffId){
			/*if (appointment.staff_allocated === true && appointment.cancelled === false){
				console.log('Staff Allocated');
				res.json({message: 'Already allocated - you snoozed!'});
			}*/
	
		appointment.staff_id = req.params.staffId;
		appointment.confirm_appointment = true;
		appointment.staff_allocated = true;
		appointment.cancelled = false;
		appointment.staff_allocated_date = new Date();
	} else {
		appointment = _.extend(appointment , req.body);
	}
	
	appointment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			if (req.params.staffId){

				 staff_template = {
					template: 'staff_confirm', 
					subject: 'You\'ve been confirmed for the appointment'
				};

				 client_template = {
					template: 'client_confirm', 
					subject: 'Your RMT will be...'
				};
				//This sends the email confirming the appointment for the staff and client
				mailer.confirm_email(appointment.client[0], appointment.staff_id, appointment, staff_template, client_template, function(result, err){
						console.log('The result from the callback in the Controller is\n'+result);
					if (result){
						console.log(result);
						res.status(200).json(appointment);
					} else {
						res.status(400).json(err);
					}
				});	
			} else if(appointment.jobDone === true && appointment.refundObj[0] === undefined){
			console.log('JobDone RefundObj --- NULL\n'+appointment);

				mailer.sendInvoice(appointment, function(responseStatus){
					res.status(200).json(responseStatus);
				});
			} else if(appointment.jobDone === true && appointment.refundObj[0] !== undefined){
			console.log('JobDone RefundObj NOT NULL\n'+appointment.refundObj[0]);

					res.status(200).json(appointment);
				// send Refund Email
				/*mailer.sendInvoice(appointment, function(responseStatus){
					res.status(200).json(responseStatus);
				});*/
			}  else {
				console.log('This if from the Upadte'+appointment);
				res.status(200).json(appointment);
			}
		}
	});
};

/**
 * Delete an Appointment
 */
exports.delete = function(req, res) {
	var appointment = req.appointment ;

	appointment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appointment);
		}
	});
};
exports.deleteCancelled = function(req, res){

Appointment.remove(req.body)
.exec(function(err, appointments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appointments);
		}
	});
};
exports.cancel = function(req, res) {

var appointment = req.appointment;
appointment = _.extend(appointment , req.body);
appointment.save(function(err, appointment) {
			if (err) {
				console.log(err);
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {

				console.log(appointment);
				var d = appointment.appointment_date.toLocaleString();
				var theDate = d.split(','); 
				var theTime = d.split(':');
				appointment.appointment_date.date = theDate[0];
				appointment.appointment_date.time = theTime[1]+':'+theTime[2];	

				if (appointment.cancelled_by_staff === true){
					mailer.cancelledByStaff(appointment, function(responseStatus, excludeUser){
						if (responseStatus.response === '250 Great success'){
							mailer.sendEmail(appointment, excludeUser, function(emailSentOK){
								console.log(emailSentOK);
								console.log(res);
								if (emailSentOK.emailSent === 'OK'){
									res.status(200).jsonp(appointment);
								}
							});
						
						} else {
							res.json({message: 'No Email was sent, but the appointment was cancelled OK'});
						}
					});
				} else {
					mailer.cancelledByClient(appointment, req, function(responseStatus){
						if (responseStatus.response === '250 Great success'){
							res.status(200).jsonp(appointment);	
						} else {
							res.status(400).jsonp({message:'There was an error - Please contact support'});	
						}
					});
				}
			}
		});
};

/**
 * List of Appointments
 */
exports.list = function(req, res) { 


	if (req.query.cancelled === 'false'){
		req.query.cancelled = false;
	}
	Appointment.find(req.query)
	.populate('client')
	.populate('staff_id')
	.sort('jobDone -appointment_date')
	.exec(function(err, appointments) {
		if (err) {
			console.log('Eroor'+err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {

			res.jsonp(appointments);
		}
	});
};

exports.date = function(req, res) { 
	console.log(req.query);
	var user = req.query.user;
	var staff = req.query.staff_id;
	

	var query={};

	
	if (user){
		 query = {
		client : user, 
		jobDone: true
		};
	} else if (staff){
		 query = {
		staff_id : staff, 
		jobDone: true
		};
	} else if(!user){
		query={};
	}
		
	Appointment.find(query)
	.where('appointment_date')
    .lt(req.query.to)
    .gt(req.query.from)
	.populate('client')
	.populate('staff_id')
	.sort('appointment_date')
	.exec(function(err, appointments) {
		if (err) {
			console.log('Eroor'+err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
console.log(appointments);
			res.jsonp(appointments);
		}
	});
};


/**
 * Appointment middleware
 */
exports.appointmentByID = function(req, res, next, id) { 
	Appointment.findById(id)
	.populate('client')
	.populate('staff_id')
	.exec(function(err, appointment) {
		if (err) return next(err);
		if (! appointment) return next(new Error('Failed to load Appointment ' + id));
		req.appointment = appointment ;
		if (next === null){
			return appointment;
		} else {
		next();
		}
	});
};

/**
 * Appointment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
console.log('OCming from hasAuthorization: \n'+req);
	if (req.appointment.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

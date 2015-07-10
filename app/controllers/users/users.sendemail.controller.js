'use strict';

/**
 * Module dependencies.
 */
var _ 				= require('lodash'),
	errorHandler 	= require('../errors.server.controller'),
	mongoose 		= require('mongoose'),
	passport 		= require('passport'),
	User 			= mongoose.model('User'), 
	Appointment 	= mongoose.model('Appointment'), 
	path            = require('path'), 
	templatesDir    = ('./app/views/templates'), 
	config = require('../../../config/config'),
	emailTemplates  = require('email-templates'),
	nodemailer      = require('nodemailer'), 
	smtpPool 	    = require('nodemailer-smtp-pool'), 
	async 			= require('async'), 
	GoogleMapsAPI 	= require('googlemaps'), 
	fs 				= require('fs'), 
	pdf 			= require('html-pdf');

	/*var api_key = 'key-eaba6b6f12ab16128f2d7969ba67afc4';
	var domain = 'sandbox717ed0cfb43748538a57654c683c267c.mailgun.org';
	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});*/
var publicConfig = {
  key: 'AIzaSyACVwB4i_6ujTrdjTMI-_tnsDrf6yOfssw',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             false // use https
};
var gmAPI = new GoogleMapsAPI(publicConfig);
var locals = [];
var users = [];
var transport = nodemailer.createTransport(config.mailer.options);

var createEmail = function(appointment, templateName, subject){
	var myId = appointment.id.substring(18, 24);
appointment.invoice_id = myId;
var d = appointment.appointment_date.toLocaleString();
var theDate = d.split(',');
appointment.date = theDate[0];
appointment.time = theDate[1];

appointment.cost.tax = {};
appointment.cost.dollars = appointment.cost.dollars.toFixed(2);
appointment.cost.tax.stripe = config.pricelist.tax_rate * appointment.cost.dollars*100;
appointment.cost.tax = config.pricelist.tax_rate * appointment.cost.dollars;
appointment.cost.tax.toFixed(2);
appointment.cost.total_price = parseInt(appointment.cost.dollars) + appointment.cost.tax;
appointment.cost.total_price_stripe = appointment.cost.total_price*100;

return appointment;

};

var createInvoice = function(html, appointment, callback){
	var options = { filename: './invoices/'+appointment._id+'.pdf', format: 'Letter' };

	pdf.create(html, options).toFile(function(err, res) {
	if (err) return err;
	console.log(res);
	var mypath = {};
	mypath.filename = appointment._id+'.pdf';
	mypath.path = './invoices/'+mypath.filename;
	console.log('the Path is\n'+mypath);
	callback(mypath);
	});
};



exports.sendAdminEmail = function(user, callback){
var locals = user;
console.log(locals);

emailTemplates(templatesDir, function(err, template) {
				 template('new_staff', locals, function(err, html, text) {
				      if (err) {
				        console.log(err);
				      } else {
				        transport.sendMail({
				          from: 'The Hander New Staff Member <info@hander.com>',
				          to: 'mo.bazazi@gmail.com',
				          subject: 'A New Staff Query',
				          html: html,
				          generateTextFromHTML: true,
				          text: text
				        }, function(err, responseStatus) {
				          if (err) {
				            console.log(err);
				            return err; 				     
				          } else {
				          	if (responseStatus.response ==='250 Great success'){

				          		callback(responseStatus);
				          	}

				          }
				        });
				     }
		 		   });
		});

};


exports.cancelledByStaff = function(appointment, callback){
var locals = appointment;
console.log(locals);

emailTemplates(templatesDir, function(err, template) {
				 template('cancelled_by_staff', locals, function(err, html, text) {
				      if (err) {
				        console.log(err);
				      } else {
				        transport.sendMail({
				          from: 'Cancelled By Staff <info@hander.com>',
				          to: locals.staff_id[0].email,
				          subject: 'You\'ve cancelled this appointment',
				          html: html,
				          generateTextFromHTML: true,
				          text: text
				        }, function(err, responseStatus) {
				          if (err) {
				            console.log(err);
				            return err; 				     
				          } else {
				          	if (responseStatus.response ==='250 Great success'){
				          		var excludeUser = locals.staff_id[0]._id;
				          		console.log(excludeUser);
				          		callback(responseStatus, excludeUser);
				          	}

				          }
				        });
				     }
		 		   });
		});

};


exports.cancelledByClient = function(appointment, req, callback){
var locals = appointment;
locals.cancellation_policy = req.headers.host+'/cancellation';
console.log(appointment);

emailTemplates(templatesDir, function(err, template) {
				 template('cancelled_by_client', locals, function(err, html, text) {
				      if (err) {
				        console.log(err);
				      } else {
				        transport.sendMail({
				          from: 'Appointment Cancelled <info@hander.com>',
				          to: locals.client[0].email,
				          subject: 'Your appointment has been cancelled',
				          html: html,
				          generateTextFromHTML: true,
				          text: text
				        }, function(err, responseStatus) {
				          if (err) {
				            console.log(err);
				            return err; 				     
				          } 
				          
				        });
				     }
		 		   });

				 template('cancelled_by_client_staff', locals, function(err, html, text) {
				      if (err) {
				        console.log(err);
				      } else {
				        transport.sendMail({
				          from: 'Appointment Cancelled by Client <info@hander.com>',
				          to: locals.staff_id[0].email,
				          subject: 'Your appointment has been cancelled by the Client',
				          html: html,
				          generateTextFromHTML: true,
				          text: text
				        }, function(err, responseStatus) {
				          if (err) {
				            console.log(err);
				            return err; 				     
				          } else {
				          	if (responseStatus.response ==='250 Great success'){
				          		callback(responseStatus);
				          	}

				          }
				        });
				     }
	 		   });
});

};


exports.sendInvoice = function(appointment, callback){

createEmail(appointment, 'this is an email test');

	

emailTemplates(templatesDir, function(err, template) {
				 template('invoice', appointment, function(err, html, text) {
				      if (err) {
				        console.log(err);
				      } else {
				     createInvoice(html, appointment, function(path){
						console.log(path);	
						transport.sendMail({
				          from: 'Hander <info@hander.com>',
				          to: 'mo.bazazi@gmail.com',
				          subject: 'Hander Invoice : '+  appointment.invoice_id,
				          html: html,
				          generateTextFromHTML: true,
				          text: text, 
				          attachements:{   // encoded string as an attachment
				            path: path.path
				        	}
				        }, function(err, responseStatus) {
				          if (err) {
				            console.log(err);
				            return err; 				     
				          } else {
				          	if (responseStatus.response ==='250 Great success'){
				          		callback(responseStatus);
				          	}

				          }
				        });
				     });
				      	
				        
				     }
		 		   });
		});

};
exports.sendAppointmentConfirmation = function(appointment, callback) {
//Need to adjust this so as to send a confirmation email initally and then, once a staff member has sign up, a final comfirmation. 


Appointment.findOne({_id: appointment._id})
	.populate('client staff_id')
	.exec(function(err, appointment) {
		if (err) {
			callback(err);
		} else {
			var locals = appointment;
			console.log(appointment);
			emailTemplates(templatesDir, function(err, template) {
				 template('client_appointment_confirmation', locals, function(err, html, text) {
				      if (err) {
				        callback(err);
				      } else {
				        transport.sendMail({
				          from: 'Appointment Confirmed <info@hander.com>',
				          to: locals.client[0].email,
				          subject: 'Your appointment has been confirmed',
				          html: html,
				          generateTextFromHTML: true,
				          text: text
				        }, function(err, responseStatus) {
				          if (err) {
				           callback(err);
				            				     
				          } else {
				          	callback (responseStatus);
				          }
				          
				        });
				     }
		 		   });
			});

		}
	});



	





};
exports.sendEmail = function(appointment, excludeUser, callback) {
console.log('The start of the Send Email');
console.log(appointment);

var getGoogleMapParams = function(address){
	var params = {
	  center: {lat: address.lat, lng: address.lng },
	  zoom: 15,
	  size: '500x400',
	  maptype: 'roadmap',
	  markers: [
	    {
	      location: address.street_1 +', ' +address.street_2 +', ' +address.city +', ' +address.postcode,
	      label   : 'Client'
	    }
	  ],
	  style: [
	    {
	      feature: 'road',
	      element: 'all',
	      rules: {
	        hue: '0x00ff00'
	      }
	    }
	  ]
	};
	return params;
};

var id = appointment._id;

async.waterfall([
		function(done) {
			console.log(1);
			Appointment.findOne(id)
			.select('appointment_address cost appointment_date client')
			.populate('client', '-password -salt -roles')
			.exec(function(err, appointment) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					console.log(appointment.address);
					done(err, appointment);			
				}
			});
		},
		function(appointment, done){
			console.log(2);
			var d = appointment.appointment_date.toLocaleString();
			var theDate = d.split(',');
			console.log(appointment);
			var myAppointmenMap = getGoogleMapParams(appointment.client[0].address.main_address);
			var mapUrlString = gmAPI.staticMap(myAppointmenMap);
					User.find({roles: 'staff'})
					.where('_id').ne(excludeUser)
					.select('_id email displayName')
					.exec(function(err, users) {
						if (err) {
							res.status(400).send({
								message: errorHandler.getErrorMessage(err)
							});
						} else {
							console.log('The users are\n'+users);
							for (var i = 0; i<users.length; i++){
								var Myobject = {
									appointmentId: id, 
									email: users[i].email, 
									displayName: users[i].displayName, 
									cost: appointment.cost,
									clientname: appointment.client[0].displayName,
									date: theDate[0], 
									time: theDate[1],
									mapUrlString: mapUrlString,
									client_address: appointment.client[0].address.main_address.street_1,
									acceptUrl: '/appointments/accept/'+users[i]._id+'/appointmentId/'+id
								};
									locals.push(Myobject);
							}
							done(err, locals);
						}
					});
		}, 
		function(locals,  done){
			console.log(3);
			console.log();
			emailTemplates(templatesDir, function(err, template) {

			    // ## Send a batch of emails and only load the template once

			    // Prepare nodemailer transport object
			 	 var users = locals;
			    // Custom function for sending emails outside the loop
			    //
			    // NOTE:
			    //  We need to patch postmark.js module to support the API call
			    //  that will let us send a batch of up to 500 messages at once.
			    //  (e.g. <https://github.com/diy/trebuchet/blob/master/lib/index.js#L160>)
			    var Render = function(locals) {
			      this.locals = locals;
			      this.send = function(err, html, text) {
			        if (err) {
			          console.log(err);
			        } else {
			          transport.sendMail({
			            from: 'Hander Update <info@hander.com>',
			            to: locals.email,
			            subject: 'A New Client',
			            html: html,
			            // generateTextFromHTML: true,
			            text: text
			          }, function(err, responseStatus) {
			            if (err) {
			              console.log(err);
			            } else {
			              console.log(responseStatus.message);
			            }
			          });
			        }
			      };
			      this.batch = function(batch) {
			        batch(this.locals, templatesDir, this.send);
			      };
			    };

			    // Load the template and send the emails
			    template('staff_appointment_notify', true, function(err, batch) {
			      for(var user in users) {
			        var render = new Render(users[user]);
			        render.batch(batch);
			      }
			    });
				  done(err);
		 	});
		}
	], function(err){
		if (err) {
			callback(err);
		} else{
			var emailSentOK = {
				emailSent: 'OK', 
				appointment: locals
			};
			callback(emailSentOK);
		}
	});


};


exports.confirm_email = function(clientObject, staffId, appointment, staff_template, client_template, callback){
var locals = [];
	 locals.staff = {};

	

	//This step sets up all the variables in the locals object
async.waterfall([
	function(done){
		console.log(1);
		var d = appointment.appointment_date.toLocaleString();
			var err = null;

		var theDate = d.split(',');
		locals.client = clientObject;
		locals.appointment = appointment;
		locals.appointment_date = {};
		locals.appointment_date.date = theDate[0];
		locals.appointment_date.time = theDate[1];
		if (staffId[0].email !== undefined){
			locals.staff = staffId[0];
		}
		done(err, locals);
	}, 
	function(locals, done){
		console.log(2);
			
			User.findOne({roles: 'staff', _id: staffId[0]})
					.select('_id email displayName profile_pic')
					.exec(function(err, user) {
						if (err) {
							console.log(err);
						} 
						locals.staff = user;
						done(err, locals);
				});

	}, 
	function(locals, done){
	console.log(3);
			emailTemplates(templatesDir, function(err, template) {
					 template(staff_template.template, locals, function(err, html, text) {
					      if (err) {
					        console.log(err);
					      } else {
					        transport.sendMail({
					          from: 'The Hander Team <info@hander.com>',
					          to: locals.staff.email,
					          subject: staff_template.subject,
					          html: html,
					          generateTextFromHTML: true,
					          text: text
					        }, function(err, responseStatus) {
					          if (err) {
					            console.log(err);
					          } 
					          console.log('staff email sent ok');
					      
					          });
					      } 
					  }); 
			});
			emailTemplates(templatesDir, function(err, template) {
					 template(client_template.template, locals, function(err, html, text) {
					      if (err) {
					        console.log(err);
					      } else {
					        transport.sendMail({
					          from: 'The Hander Team <info@hander.com>',
					          to: locals.client.email,
					          subject: client_template.subject,
					          html: html,
					          generateTextFromHTML: true,
					          text: text
					        }, function(err, responseStatus) {
					          if (err) {
					            console.log(err);
					            return err; 				     
					          } else {
					          	if (responseStatus.response ==='250 Great success'){
					          		done(err);
					          	}

					          }
					        });
					     }
			 		  });
			});
	}
], function(err){
	if(err){
		callback(false, err);
	} else {
		callback(true);
	}
});



};
'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');
	var mailer = require('../users/users.sendemail.controller.js');
	var path = require('path');
	var fs = require('fs');
	var logger = require('morgan');
	var multer = require('multer');
/**
 * Update user details
 */
exports.update = function(req, res) {

	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

exports.list = function(req, res, next) {

		User.find({roles: 'user'})
		.exec(function(err, user) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.json(user);
			}
		});


};

exports.uploadAvatar = function(req, res){
	console.log(req.body);
	console.log(req.files);
var dataURL = req.body.dataURL;
var date = new Date().toDateString();
var base64 = dataURL.replace(/^data:image\/png;base64,/, '');

var filename = req.body.firstname+'_'+req.body.lastname+'_'+date;
console.log(filename);
var dirname = path.resolve('.');
 fs.writeFile(dirname +'/public/img/profile_pics/'+filename, base64, 'base64', function(err) {
            if(err) res.sendStatus(404);
            console.log(err);
             res.json(200, { 
                path: dirname +'/public/img/profile_pics/'+filename,
                msg: 'Pic Updated Successfully', 
                dataURL: dataURL
            });
	});
/*
	/*console.log(req);*/
/*var image =  req.files.file;
var tmp_path = req.files.file.path;

var target_path = dirname + '/public/img/profile_pics/'+image.originalname;
 fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send(200, {
            	path: target_path, 
            	size: req.files.file.size,
            	msg: 'Your Profile Picture was updated succeeded'
            });  
        });
    });
*/
/*res.json({msg: 'OK'});
*///getting the variables we need   
/*var */
/*var filename = req.files.image.name;
var lastname = filename.replace(' ','_');
var name = lastname.split('.');

var date = new Date();
var time = date.getTime();
var imageDest = name[0]+time+'.'+name[name.length-1];*/
/*console.log(imageDest);
*//*
//creates the final file name on our system
*/
/*
console.log(dirname);
  //creates an new image file on our own server 
    fs.writeFile(dirname +'/public/img/profile_pics/'+image.name, base64, 'base64', function(err) {
            if(err) res.sendStatus(404);
            console.log(err);
             res.json(200, { 
                src: dirname +'/public/img/profile_pics/'+image.name, 
                msg: 'Pic Updated Successfully'
            });
	});
*/


  /*  var newImageLocation = path.join(__dirname, 'public/images', image.name);
    
    fs.readFile(image.path, function(err, data) {
        fs.writeFile(newImageLocation, data, function(err) {
            res.json(200, { 
                src: '/public/modules/core/img/public_profiles/' + image.name,
                size: image.size
            });
        });
    });*/


};

/*//function that processes image upload. 
exports.uploadAvatar = function (req, res) {
	console.log(req);
	*/
	/*console.log(req.body);
	console.log(req.files);
	res.send(200);*/
/*	console.log(req);
*/ /*   var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var file = files.file;
        var username = fields.email;
        var tempPath = file.path;
        var targetPath = path.resolve('./public/photos/' + username + '/' + file.name);
        fs.rename(tempPath, targetPath, function (err) {
            if (err) {
                throw err;
            }
            logger.debug(file.name + ' upload complete for user: ' + username);
            return res.json({path: 'photos/' + username + '/' + file.name});
        });
    });
 };
*/

exports.get_staff = function (req, res, next){

if (req.query && req.query.roles === undefined){
	var query = req.query.s;
	console.log(query);
User.find({displayName:  new RegExp(query, 'i'), 
roles: 'staff'}).select('-password -salt -stripeCustomer -email -address')
.exec(function (err, user){
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		if (user.length === 0){
		res.json({staff: false});
		} else {
			console.log(user);
			res.json(user);
		}
	});

} else {
		User.find({roles: req.query.roles})
		.select('-salt -password')
		.exec(function (err, user){
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				}
				if (user.length === 0){
				res.json({staff: false});
				} else {
					res.json(user);
				}
		});
	}
};

exports.new_staff_application = function(req, res){

console.log(req.body.address);
req.body.roles = 'staff';
req.body.staff_data = {};
req.body.staff_data.application_date = new Date();
req.body.provider = 'local';
req.body.displayName = req.body.firstName + ' '+ req.body.lastName;
req.body.password = 12312412412;
var user = new User(req.body);
console.log(user.address);

// /*Then save the user 
	user.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			mailer.sendAdminEmail(user, function(result){
				if (result.response ==='250 Great success'){
					res.status(200).json({
						msg: 'OK'
					});
				}
					
			});
		}
	});
};
exports.getOne = function(req, res, next) {
console.log('THis is the GEt one User &&&&&&&&&'+req);
	User.findOne({_id: req.params.id}).exec(function(err, user) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};

exports.check_username = function (req, res, next){
/*	console.log(req.body);
*/	User.find({email: req.body.email}).exec(function (err, user){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		if (user.length === 0){
		res.json({
			isUser: false
		});
		} else {
			res.json({
				isUser: true
				});
		}
	});
};




exports.removeUser = function (req, res, next){
var id = req.params.id;

	User.remove({_id: id}, 1).exec(function (err, user){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		if (user.length === 0){
		res.status(404).send({
			message: 'No user'
		});
		} else {
			res.status(200).send({message: 'User Removed'});
			
		}
	});
};

exports.removeAdmin = function (req, res, next){
var email = req.body.email;
console.log(email);
	User.remove({email: email}, 1).exec(function (err, user){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		if (user.length === 0){
		res.status(404).send({
			message: 'No user'
		});
		} else {
			res.status(200).send({message: 'User Removed'});
			
		}
	});
};


/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};
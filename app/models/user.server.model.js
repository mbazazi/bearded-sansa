'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: ''
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
	},
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: 'Please fill in a username',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	token: {},
	stripeCustomer: {},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer']
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'staff', 'admin']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}, 
	jobs: { 
  		type: Schema.ObjectId, 
  		ref: 'Appointments'
  	}, 
  	profile_pic: { 
  		type: String,
  		default: '/public/img/flat-avatar.png'
  	},
  	address: {
  		main_address: { 
	  		street_1: {type: String}, 
	  		street_2: {type: String}, 
	  		street_3: {type: String}, 
	  		city: 	  {type: String}, 
	  		province: {type: String}, 
	  		postcode: {type: String}, 
	  		lat: {type: Number}, 
	  		lng: {type: Number}
  		}, 
  		secondary_address: { 
	  		street_1: {type: String}, 
	  		street_2: {type: String}, 
	  		street_3: {type: String}, 
	  		city: 	  {type: String}, 
	  		province: {type: String}, 
	  		postcode: {type: String}
  		}
  	} 
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		email: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);
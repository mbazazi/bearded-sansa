'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Message Schema
 */
var MessageSchema = new Schema({
	subject: {
		type: String,
		default: '',
		required: 'You forgot to add a subject',
		trim: true
	},
	message_body: {
		type: String,
		default: '',
		required: 'You forgot to write your message content'

	},
	created: {
		type: Date,
		default: Date.now
	},
	user_from: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	user_to: {
		type: Schema.ObjectId,
		ref: 'User', 
		required: 'You must select a recepient'
	}, 
	message_read: {
		type: Boolean, 
		default: false
	}
});

mongoose.model('Message', MessageSchema);
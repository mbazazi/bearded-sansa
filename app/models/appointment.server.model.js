'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Appointment Schema
 */
var AppointmentSchema = new Schema({
	appointment_date: {type: Date},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {type: Date},
	client: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
	staff_id_query: { type: String }, 
	staff_id: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
	appointment_address: {}, 
	cost:{
		type: Number
	}, 
	jobDone:{
		type: Boolean, 
		default: false
	},  
	cancelled:{
		type: Boolean, 
		default: false
	}
});

mongoose.model('Appointment', AppointmentSchema);
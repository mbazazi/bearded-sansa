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
	stripeChargeObj: {},
	refundObj: [{}],
	appointment_date: {type: Date, required: 'You must select a date'},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {type: Date},
	client: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
	staff_id_query: { type: String }, 
	staff_id: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
	appointment_address: {}, 
	cost:{}, 
	total_time:{
		type: Number, 
		default: 1
	},
	confirm_appointment:{
		type: Boolean, 
		default: false
	},
	jobDone:{
		type: Boolean, 
		default: false
	},  
	cancelled:{
		type: Boolean, 
		default: false
	}, 
	cancelled_date:{
		type: Date
	},
	staff_allocated:{
		type:Boolean, 
		default: false
	}, 
	staff_allocated_date: {
		type: Date
	}, 
	cancelled_by_staff: {
		type: Boolean, 
		default: false
	}, 
	payment_entered: {
		type: Boolean, 
		default: false
	}
});

mongoose.model('Appointment', AppointmentSchema);
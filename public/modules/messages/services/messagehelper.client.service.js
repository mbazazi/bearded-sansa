'use strict';

angular.module('messages').factory('MessageHelper', [
	function() {
		// Messagehelper service logic
		var _this = this;
		_this.to = {};

		_this.setReceive= function(to){
			_this.to = to;
			alert(to._id);
		};
		_this.getReceive = function(){
			alert(_this.to._id);
			console.log(_this.to);
			return _this.to;
	
		};

		_this.items = 5;

		return _this;
	}
]);
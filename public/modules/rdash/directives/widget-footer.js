/**
 * Widget Footer Directive
 */
'use strict';
angular
    .module('rdash')
    .directive('rdWidgetFooter', function(){
    	var directive = {
        requires: '^rdWidget',
        transclude: true,
        template: '<div class="widget-footer" ng-transclude></div>',
        restrict: 'E'
   		 };
   		 return directive;
    });

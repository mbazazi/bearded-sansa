/**
 * Widget Header Directive
 */
'use strict';
angular
    .module('rdash')
    .directive('rdWidgetHeader', function(){
     var directive = {
        requires: '^rdWidget',
        scope: {
            title: '@',
            icon: '@', 
            query: '@?'
        },
        transclude: true,
        template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="col-xs-12" ng-transclude></div></div></div>',
        restrict: 'E'
    };
    return directive;        
    });


/**
 * Widget Body Directive
 */
'use strict';
angular
    .module('rdash')
    .directive('rdWidgetBody', function(){
        var directive = {
        requires: '^rdWidget',
        scope: {
            loading: '@?',
            classes: '@?', 
            query: '@?'
        },
        transclude: true,
        template: '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
        restrict: 'E'
    };
    return directive;

    });


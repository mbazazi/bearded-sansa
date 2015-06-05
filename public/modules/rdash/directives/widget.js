/**
 * Widget Directive
 */
'use strict';
angular
    .module('rdash')
    .directive('rdWidget', function(){
 
          var directive = {
                transclude: true,
                template: '<div class="widget" ng-transclude></div>',
                restrict: 'EA', 
                link: function(scope, element, attrs, tabsCtrl) {
/*                    tabsCtrl.addPane(scope);
*/                }
            };
            return directive;

    });

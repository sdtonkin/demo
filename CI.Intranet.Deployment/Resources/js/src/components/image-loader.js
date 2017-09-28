'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'imageLoaderCtrl';

myApp.directive('imageLoader', function () {
    return {
        link: function (scope, element, attrs) {
            scope.$watch('window.lowBandwidth', function () {
                if (!window.lowBandwidth) {
                    var tag = '<img';
                    tag += (scope.imageSrc != null ? ' src="' + scope.imageSrc + '"' : '');
                    tag += (scope.imageAltText != null || scope.imageAltText != '' ? ' alt="' + scope.imageAltText + '"' : '');
                    tag += (scope.imageCssClass != null ? ' class="' + scope.imageCssClass + '"' : '');
                    tag += (scope.imageWidth != null ? ' width="' + scope.imageWidth + '"' : '');
                    tag += (scope.imageHeight != null ? ' height="' + scope.imageHeight + '"' : '');
                    tag += ' />';
                    element.append(tag);
                }
            });
        },
        scope: {
            imageSrc: '@',
            imageCssClass: '@',
            imageAltText: '@',
            imageWidth: '@',
            imageHeight: '@'
        }
    }    
});

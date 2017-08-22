﻿'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'imageLoaderCtrl';

myApp.directive('imageLoader', function () {
    return {
        link: function (scope, element, attrs) {
            scope.$watch('window.lowBandwidth', function () {
                if (!window.lowBandwidth) {
                    element.append('<img src="' + scope.imageSrc + '" title="' + scope.imageAltText + '" class="' + scope.imageCssClass + '" />');
                }

            });
        },
        scope: {
            imageSrc: '@',
            imageCssClass: '@',
            imageAltText: '@'
        }
    }    
});
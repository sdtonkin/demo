﻿'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'howDoICtrl';

myApp.controller(controllerName, ['$scope', 'common', 'howDoIService', 'COM_CONFIG', function ($scope, common, howDoIService, COM_CONFIG) {
    var ctrl = this;
    this.$onInit = function () {
    }
}]).component('howDoI', {
    template: require('../../includes/How-Do-I.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

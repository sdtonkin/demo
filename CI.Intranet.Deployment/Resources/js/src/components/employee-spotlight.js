'use strict';
var myApp = angular.module('compassionIntranet'),
    ctrlName = 'employeeSpotlightCtrl';

myApp.controller(ctrlName, ['$rootScope', '$scope', '$q', 'COM_CONFIG', function ($rootScope, $scope, $q, COM_CONFIG) {
    var ctrl = this;
    $scope.activeTab = 'g';
    this.$onInit = function () {
        
    };
}]).component('employeeSpotlight', {
    template: require('../../includes/Employee-Spotlight.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
});
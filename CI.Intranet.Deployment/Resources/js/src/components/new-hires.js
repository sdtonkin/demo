'use strict';
var ctrlName = "newHiresCtrl";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'newHireService', 'COM_CONFIG', function ($scope, newHireService, COM_CONFIG) {
    var ctrl = this;

    this.$onInit = function () {
        newHireService.getHire().then(function (data) {
            if (!COM_CONFIG.isProduction) { console.log('new hires', data); }
            $scope.newHires = data;
        });
    }


}]).component('newHires', {
    template: require('../../includes/New-Hires.html'),
    controller: ctrlName,
    controlleras: 'ctrl'
});
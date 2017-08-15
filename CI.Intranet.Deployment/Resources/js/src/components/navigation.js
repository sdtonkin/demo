'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'myDocumentsCtrl';

myApp.controller(controllerName, ['$scope', 'navigationService', 'COM_CONFIG', function ($scope, navigationService, COM_CONFIG) {
    var ctrl = this;
    this.$onInit = function () {
        navigationService.getAllNodes().then(function (response) {
            ctrl.navNodes = response;
        });
    };
}]).component('navigation', {
    template: require('../../includes/Navigation.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'findPeopleCtrl';

myApp.controller(controllerName, ['$scope', 'graphService', 'COM_CONFIG', function ($scope, graphService, COM_CONFIG) {
    var ctrl = this;

    this.$onInit = function () {
        graphService.getMyPeople().then(function (data) {
            ctrl.myPeople = data;
        });
    }
    
}]).component('findPeople', {
    template: require('../../includes/Find-People.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

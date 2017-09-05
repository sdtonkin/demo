﻿'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'findPeopleCtrl';

myApp.controller(controllerName, ['$scope', 'graphService', 'COM_CONFIG', function ($scope, graphService, COM_CONFIG) {
    var ctrl = this;
    ctrl.searchText;

    this.$onInit = function () {
        if (window.lowBandwidth) return;
        graphService.getMyPeople().then(function (data) {
            ctrl.myPeople = data;
        });
    }

    ctrl.searchUsers = function () {
        graphService.searchMyUsers(ctrl.searchText).then(function (data) {
            ctrl.myPeople = data;
        });
    }

}]).component('findPeople', {
    template: require('../../includes/Find-People.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

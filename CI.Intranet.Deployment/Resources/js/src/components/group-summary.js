'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'groupSummaryCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'appService', 'COM_CONFIG', function ($scope, common, appService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;

    this.$onInit = function () {
        ctrl.myApps = $scope.$parent.ctrl.myApps;
    };

}]).component('groupSummary', {
    template: require('../../includes/Group-Summary.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

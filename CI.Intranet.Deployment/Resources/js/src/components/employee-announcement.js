'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'employeeAnnouncementCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'appService', 'COM_CONFIG', function ($scope, common, appService, COM_CONFIG) {
    var ctrl = this;
    
    this.$onInit = function () {
        ctrl.myApps = $scope.$parent.ctrl.myApps;
    };
}]).component('employeeAnnouncement', {
    template: require('../../includes/Employee-Announcement.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

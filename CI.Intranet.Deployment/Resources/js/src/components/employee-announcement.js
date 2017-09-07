'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'employeeAnnouncementCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'employeeAnnouncementService', 'COM_CONFIG', function ($scope, common, employeeAnnouncementService, COM_CONFIG) {
    var ctrl = this;
    
    this.$onInit = function () {
        employeeAnnouncementService.getAnnouncements().then(function (data) {
            ctrl.announcements = data;
        });
    };
}]).component('employeeAnnouncement', {
    template: require('../../includes/Employee-Announcement.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

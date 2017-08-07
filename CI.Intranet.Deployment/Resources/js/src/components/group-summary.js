'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'groupSummaryCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'groupService', 'COM_CONFIG', function ($scope, common, groupService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;
    var closedGroups = [];
    var openGroups = [];

    ctrl.toggleSummary = toggleSummary;
    ctrl.isGroupActive = isGroupActive;

    this.$onInit = function () {
        groupService.getGroups().then(function (data) {
            ctrl.groups = data;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                closedGroups.push(item.id);
            }
        });
    };
    function isGroupActive(id) {
        var closedIndex = closedGroups.indexOf(id);
        var openIndex = openGroups.indexOf(id);
        if (closedIndex == -1 && openIndex > -1) {
            return true
        } else if (openIndex == -1 && closedIndex > -1) {
            return false;
        }
        return false;
    }
    function toggleSummary(id) {
        // if group is closed
        var closedIndex = closedGroups.indexOf(id);
        var openIndex = openGroups.indexOf(id);
        if (closedIndex != -1) {
            closedGroups.splice(closedIndex, 1);
            openGroups.push(id);
        } else if (openIndex != -1) {
            openGroups.splice(openIndex, 1);
            closedGroups.push(id);
        }
    }
}]).component('groupSummary', {
    template: require('../../includes/Group-Summary.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

'use strict';
var myApp = angular.module('compassionIntranet'),
    ctrlName = 'employeeLifeCtrl';

myApp.controller(ctrlName, function ($scope) {
    var ctrl = this;
    ctrl.activeTab = 'US';

    $scope.toggleActiveTab = toggleActiveTab;    
    this.$onInit = function () {
        $scope.activeTab = 'US'
    };
    function toggleActiveTab(activeTab) {
        $scope.activeTab = activeTab;
    }
}).component('employeeLife', {
    template: require('../../includes/Employee-Life.html'),
    controller: ctrlName,
    controlleras: 'ctrl'
});
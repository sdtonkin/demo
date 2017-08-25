'use strict';
var myApp = angular.module('compassionIntranet'),
    ctrlName = 'peoplePlacesController';

myApp.controller(ctrlName, ['$rootScope', '$scope', '$q', 'COM_CONFIG', function ($rootScope, $scope, $q, COM_CONFIG) {
    var ctrl = this;
    ctrl.activeTab = 'gratitudes';

    this.$onInit = function () {
        $rootScope.$broadcast('activeTab', 'gratitudes');
    };
    ctrl.toggleActiveTab = function (tabName) {
        ctrl.activeTab = tabName;
        $rootScope.$broadcast('activeTab', tabName);
    }



}]).component('employeeSpotlight', {
    template: require('../../includes/Employee-Spotlight.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        spotlightlimit: '@'
}
});
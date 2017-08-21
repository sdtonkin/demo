'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'peoplePlacesController';

myApp.controller(controllerName, ['$rootScope', '$scope', '$q', 'COM_CONFIG', function ($rootScope, $scope, $q, COM_CONFIG) {
    var ctrl = this;
    ctrl.activeTab = 'people';    
    
    this.$onInit = function () { 
        $rootScope.$broadcast('activeTab', 'people');
    };
    ctrl.toggleActiveTab = function (tabName) {        
        ctrl.activeTab = tabName;
        $rootScope.$broadcast('activeTab', tabName);
    }

}]).component('peoplePlaces', {
    template: require('../../includes/People-Places.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
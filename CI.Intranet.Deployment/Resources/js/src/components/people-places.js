'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'peoplePlacesController';

myApp.controller(controllerName, ['$scope', '$q', 'COM_CONFIG', function ($scope, $q, COM_CONFIG) {
    var ctrl = this;
    ctrl.activeTab = 'people';

}]).component('peoplePlaces', {
    template: require('../../includes/People-Places.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
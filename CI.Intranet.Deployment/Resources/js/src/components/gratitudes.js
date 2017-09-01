'use strict';
var ctrlName = "gratitudesCtrl";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'gratitudesService', 'COM_CONFIG', function ($scope, gratitudesService, COM_CONFIG) {
    var ctrl = this;
    ctrl.places = [];
    ctrl.activeTab = 'gratitudes';

    this.$onInit = function () {
        gratitudesService.getGratitudes().then(function (data) {
            ctrl.gratitudes = data;
        });
    }
}]).component('gratitudes', {
    template: require('../../includes/Gratitudes.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        gratitudelimit: '@'
}
});
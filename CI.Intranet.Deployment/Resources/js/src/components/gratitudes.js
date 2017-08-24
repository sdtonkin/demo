'use strict';
var ctrlName = "gratitudes";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'gratitudesService', 'COM_CONFIG', function ($scope, gratitudesService, COM_CONFIG) {
    var ctrl = this;

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
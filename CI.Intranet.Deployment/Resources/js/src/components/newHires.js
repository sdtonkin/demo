'use strict';
var ctrlName = "newHires";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'newHireService', 'COM_CONFIG', function ($scope, newHireService, COM_CONFIG) {
    var ctrl = this;

    this.$onInit = function () {
        newHireService.getHire().then(function (data) {
            ctrl.getHire = data;
        });
    }


}]).component('getHire', {
    template: require('../../includes/newHires.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        hirelimit: '@'
}
});
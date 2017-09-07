'use strict';
var ctrlName = "gratitudesCtrl";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'gratitudesService', 'COM_CONFIG', function ($scope, gratitudesService, COM_CONFIG) {
    var ctrl = this;
    ctrl.gratitudes = [],
    ctrl.card1 = {},
    ctrl.card2 = {},
    ctrl.card3 = {},
    ctrl.card4 = {};
    this.$onInit = function () {
        gratitudesService.getGratitudes().then(function (data) {
            $scope.gratitudes = data;
            assignCards(data);
            
        });
    }
    function assignCards(grats) {
        if (grats.length > 0) {
            ctrl.card1 = grats[0];
        } else if (grats.length > 1) {
            ctrl.card2 = grats[1];
        } else if (grats.length > 2) {
            ctrl.card3 = grats[2];
        } else if (grats.length > 3) {
            ctrl.card4 = grats[3];
        }
    }
}]).component('gratitudes', {
    template: require('../../includes/Gratitudes.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        gratitudelimit: '@'
    }
});
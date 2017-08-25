'use strict';
var ctrlName = "anniversaryCardsCtrl";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'anniversaryService', 'COM_CONFIG', function ($scope, anniversaryService, COM_CONFIG) {
    var ctrl = this;

    this.$onInit = function () {
        anniversaryService.getAnniversary().then(function (data) {
            ctrl.anniversary = data;
        });
    }


}]).component('anniversaryCards', {
    template: require('../../includes/Anniversary-Card.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        anniversarylimit: '@'
}
});
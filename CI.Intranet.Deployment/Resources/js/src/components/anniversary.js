'use strict';
var ctrlName = "anniversaryCtrl";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'anniversaryService', 'COM_CONFIG', function ($scope, anniversaryService, COM_CONFIG) {
    var ctrl = this;

    this.$onInit = function () {
        anniversaryService.getAnniversary().then(function (data) {
            ctrl.anniversary = data;
        });
    }


}]).component('anniversary', {
    template: require('../../includes/Anniversary.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        anniversarylimit: '@'
}
});
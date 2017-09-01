'use strict';
var ctrlName = "anniversaryCardsCtrl";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'anniversaryService', 'COM_CONFIG', function ($scope, anniversaryService, COM_CONFIG) {
    var ctrl = this;
    ctrl.places = [];
    ctrl.activeTab = 'anniversary';

    this.$onInit = function () {
        anniversaryService.getAnniversary().then(function (data) {
            console.log('anniversary', data);
            $scope.events = data;
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
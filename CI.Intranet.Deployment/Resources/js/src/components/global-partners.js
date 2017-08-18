'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'globalPartnersController';

myApp.controller(controllerName, ['$scope', '$q', 'COM_CONFIG', 'taxonomyService', function ($scope, $q, COM_CONFIG, taxonomyService) {
    var ctrl = this;
    var delveUrl = '';

    ctrl.toggleVisibility = function () {
        return ctrl.activeTab == 'places';
    }
    $scope.$on('activeTab', function (event, arg) {
        ctrl.activeTab = arg;
    });

    this.$onInit = function () {
        taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.globalPartnersTermId).then(function (data) {
            ctrl.globalPartners = data;
        });
    }
    

}]).component('globalPartners', {
    template: require('../../includes/Global-Partners.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
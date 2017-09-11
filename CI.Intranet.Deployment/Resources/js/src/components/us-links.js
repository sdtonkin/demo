'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'UsLinksController';

myApp.controller(controllerName, ['$scope', '$q', 'taxonomyService', 'COM_CONFIG', function ($scope, $q, taxonomyService, COM_CONFIG) {
    var ctrl = this;
    ctrl.groups = [];
    ctrl.activeTab = 'US';

    this.$onInit = function () {
        taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.locationTermId).then(function (data) {
            ctrl.groups = _.reject(data, function (p) {
                return p.name == 'Benefits';
            });
            $scope.$apply();
        });
    }
}]).component('UsLinks', {
    template: require('../../includes/Us-Links.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
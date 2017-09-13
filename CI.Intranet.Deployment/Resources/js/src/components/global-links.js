'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'globalLinksController';

myApp.controller(controllerName, ['$scope', '$q', 'taxonomyService', 'COM_CONFIG', function ($scope, $q, taxonomyService, COM_CONFIG) {
    var ctrl = this;
    ctrl.groups = [];
    ctrl.activeTab = 'Global';

    this.$onInit = function () {
        taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.usEmployeeLifeTermId).then(function (data) {
            ctrl.groups = _.reject(data, function (p) {
                return p.name == 'Benefits';
            });
            $scope.$apply();
        });
    }
}]).component('globalLinks', {
    template: require('../../includes/Global-Links.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
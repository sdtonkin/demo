'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'usLinksController';

myApp.controller(controllerName, ['$scope', '$q', 'taxonomyService', 'COM_CONFIG', function ($scope, $q, taxonomyService, COM_CONFIG) {
    var ctrl = this;
    ctrl.groups = [];

    this.$onInit = function () {
        taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.usEmployeeLifeTermId).then(function (data) {
            $scope.groups = _.reject(data, function (p) {
                return p.name == 'Benefits';
            });
        });
    }
}]).component('usLinks', {
    template: require('../../includes/Us-Links.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
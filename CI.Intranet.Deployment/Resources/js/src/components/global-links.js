'use strict'; 
var myApp = angular.module('compassionIntranet'),
    controllerName = 'globalLinksController';

myApp.controller(controllerName, ['$scope', '$q', 'taxonomyService', 'COM_CONFIG', function ($scope, $q, taxonomyService, COM_CONFIG) {
    var ctrl = this;
    ctrl.globalGroups = [];
    ctrl.activeTab = 'Global';

    this.$onInit = function () {
        taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.globalEmployeeLifeTermId).then(function (data) {
            ctrl.globalGroups = _.reject(data, function (p) {
                return p.name == 'Benefits';
            });
        });
    }
}]).component('globalLinks', {
    template: require('../../includes/Global-Links.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
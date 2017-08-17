'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'locationPlacesController';

myApp.controller(controllerName, ['$scope', '$q', 'taxonomyService', 'COM_CONFIG', function ($scope, $q, taxonomyService, COM_CONFIG) {
    var ctrl = this;
    ctrl.places = [];
    ctrl.activeTab = 'people';

    this.$onInit = function () {
        taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.locationTermId).then(function (data) {
            ctrl.places = _.reject(data, function (p) {
                return p.name == 'US';
            });
            $scope.$apply();
        });
    }
}]).component('locationPlaces', {
    template: require('../../includes/Location-Places.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
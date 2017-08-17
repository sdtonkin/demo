'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'bookmarkPageController';

myApp.controller(controllerName, ['$scope', '$q', 'taxonomyService', 'COM_CONFIG', function ($scope, $q, taxonomyService, COM_CONFIG) {
    var ctrl = this;
    
    this.$onInit = function(){
        getLocations().then(function (data) {
            ctrl.places = data;
        });
    }

    function getLocations() {
        var defer = $q.defer();
        var termSetId = COM_CONFIG.termSets.locationTermId;

        taxonomyService.getTermSetAsTree(termSetId).then(function (response) {
            defer.resolve(response);
        });

        return defer.promise();
    }

}]).component('locationPlaces', {
    template: require('../../includes/Location-Places.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
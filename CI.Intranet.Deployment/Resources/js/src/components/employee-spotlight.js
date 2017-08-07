// import pnp from "sp-pnp-js";
var ctrlName = "employeeSpotlight";
var myApp = angular.module('');

myApp.controller(ctrlName, ['$scope', 'employeeSpotlightService', 'COM_CONFIG', function ($scope, employeeSpotlightService, COM_CONFIG) {

    // var cacheObj = pnp.storage.local;
    // if (!_CONFIG.useCaching) {
    //     cacheObj.delete(ctrlName);
    // }
    // cacheObj.getOrPut(ctrlName, relatedService.getData).then(function(data) {
    employeeSpotlightService.getSpotlight().then(function (data) {
        $scope.spotlight = data;
    });

}]).component('employeeSpotlight', {
    template: require('../../includes/Employee-Spotlight.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        spotlightlimit: '@'
}
});
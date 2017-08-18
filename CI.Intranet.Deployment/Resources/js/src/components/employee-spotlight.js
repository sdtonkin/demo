
var ctrlName = "employeeSpotlight";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'employeeSpotlightService', 'COM_CONFIG', function ($scope, employeeSpotlightService, COM_CONFIG) {

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
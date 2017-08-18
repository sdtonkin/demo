
var ctrlName = "employeeSpotlight";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'employeeSpotlightService', 'COM_CONFIG', function ($scope, employeeSpotlightService, COM_CONFIG) {

    try {
        employeeSpotlightService.getSpotlight().then(function (data) {
            $scope.spotlight = data;
        });
    }
    catch (ex) {
        console.error(ex);
    }

}]).component('employeeSpotlight', {
    template: require('../../includes/Employee-Spotlight.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        spotlightlimit: '@'
}
});
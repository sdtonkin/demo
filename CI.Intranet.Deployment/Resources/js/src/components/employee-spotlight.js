
var ctrlName = "employeeSpotlight";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'employeeSpotlightService', 'COM_CONFIG', function ($scope, employeeSpotlightService, COM_CONFIG) {
    var ctrl = this;

    this.$onInit = function () {
        employeeSpotlightService.getGratitudes().then(function (data) {
            ctrl.globalPartners = data;
        });
    }


}]).component('employeeSpotlight', {
    template: require('../../includes/Employee-Spotlight.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        spotlightlimit: '@'
}
});
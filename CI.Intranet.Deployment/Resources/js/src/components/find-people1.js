
var ctrlName = "findPeopleController";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'graphService', 'COM_CONFIG', function ($scope, graphService, COM_CONFIG) {
    var ctrl = this;
    ctrl.myPeople = [];
    $scope.currentPage = 0;
    $scope.pageSize = 4;

    this.$onInit = function () {
        graphService.getMyPeople().then(function (response) {
            ctrl.myPeople = response;
        });
    }


}]).component('findPeople', {
    template: require('../../includes/Find-People.html'),
    controller: ctrlName,
    controlleras: 'ctrl'
});
    /*
.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
*/
'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'resourceLinks';

myApp.controller(controllerName, ['$scope', '$q', 'common', 'resourceLinksService', 'COM_CONFIG', function ($scope, $q, common, resourceLinksService, COM_CONFIG) {
    var ctrl = this;
    $scope.searchText = '';

    this.$onInit = function () {
        resourceLinksService.getresourceLinks().then(function (data) {
            ctrl.resourceLinks = data;
        });
    }

    ctrl.searchTitle = 'Search';
    ctrl.goSearch = function () {
        window.location.href = COM_CONFIG.lists.workResources + '?k=' + $scope.searchText;
    }


}]).component('resourceLinks', {
    template: require('../../includes/Resource-Links.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

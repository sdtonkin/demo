'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'resourceLinks';

myApp.controller(controllerName, ['$scope', '$q', 'common', 'resourceLinksService', 'COM_CONFIG', function ($scope, $q, common, resourceLinksService, COM_CONFIG) {
    var ctrl = this;

    this.$onInit = function () {
        resourceLinksService.getresourceLinks().then(function (data) {
            ctrl.resourceLinks = data;
        });
    }
}]).component('resourceLinks', {
    template: require('../../includes/Resource-Links.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

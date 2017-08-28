'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'howDoICtrl';

myApp.controller(controllerName, ['$scope', '$q', 'common', 'howDoIService', 'COM_CONFIG', function ($scope, $q, common, howDoIService, COM_CONFIG) {
    var ctrl = this;

    this.$onInit = function () {
        howDoIService.gethowDoI().then(function (data) {
            ctrl.howDoI = data;
        });
    }
}]).component('howDoI', {
    template: require('../../includes/How-Do-I.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

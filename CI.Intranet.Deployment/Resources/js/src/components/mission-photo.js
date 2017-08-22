'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'missionPhotoController';

myApp.controller(controllerName, ['$scope', '$q', 'COM_CONFIG', 'missionPhotoService', function ($scope, $q, COM_CONFIG, missionPhotoService) {
    var ctrl = this;

    this.$onInit = function () {
        missionPhotoService.getMissionPhotos().then(function (data) {
            ctrl.missionPhoto = data;
        });
    }


}]).component('missionPhoto', {
    template: require('../../includes/Mission-Photos.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
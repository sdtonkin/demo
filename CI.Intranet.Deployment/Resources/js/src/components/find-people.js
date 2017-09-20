'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'findPeopleCtrl';

myApp.controller(controllerName, ['$scope', 'graphService', 'COM_CONFIG', function ($scope, graphService, COM_CONFIG) {
    var ctrl = this;
    ctrl.searchText;

    this.$onInit = function () {
        if (window.lowBandwidth) return;
        graphService.getMyPeople().then(function (data) {
            ctrl.myPeople = data;
        });

        $('#ci-find-people-search').on('keypress', function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            var txtVal = $('#ci-find-people-search').val();
            if (keycode == '13') {
                ctrl.searchUsers();
            }
        });
    }

    ctrl.searchUsers = function () {
        window.location.href = COM_CONFIG.delveSearchUrlPrefix + ctrl.searchText + COM_CONFIG.delveSearchUrlSuffix;
    }

}]).component('findPeople', {
    template: require('../../includes/Find-People.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'toolbarCtrl';

myApp.controller(controllerName, ['$scope', 'modalService', 'toolBarService', 'COM_CONFIG', function ($scope, modalService, toolBarService, COM_CONFIG) {
    var ctrl = this;
    ctrl.openModal = openModal;
    ctrl.closeModal = closeModal;
    ctrl.saveMyTools = saveMyTools;

    this.$onInit = function () {
        var userId = _spPageContextInfo.userId;
        toolBarService.getMyTools(userId).then(function (response) {
            $scope.myTools = response;
        });
        toolBarService.getAllTools().then(function (response) {
            $scope.allTools = response;
        });
    };
    function saveMyTools() {

    }
    function openModal(id) {
        modalService.Open(id);
    }
    function closeModal(id) {
        modalService.Close(id);
    }
}]).component('myToolBar', {
    template: require('../../includes/Tool-Bar.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'toolManagerCtrl';

myApp.controller(controllerName, ['$scope', 'toolBarService', 'COM_CONFIG', function ($scope, toolBarService, COM_CONFIG) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
        var userId = _spPageContextInfo.userId;
        toolBarService.getAllTools().then(function (tools) {
            toolBarService.getMyTools(userId).then(function (myTools) {
                $scope.myTools = myTools;
            });
        });
    };
    $ctrl.handleClose = function () {
        console.info("in handle close");
        $ctrl.modalInstance.close($ctrl.modalData);
    };
}]).component('myToolManager', {
    template: require('../../includes/Tool-Manager.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    bindings: {
        includedTools: "<"
    },
});

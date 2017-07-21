var myApp = angular.module('compassionIntranet'),
    controllerName = 'toolbarCtrl';

myApp.controller(controllerName, ['$scope', 'toolBarService', 'COM_CONFIG', function ($scope, toolBarService, COM_CONFIG) {
    this.$onInit = function () {
        var userId = _spPageContextInfo.userId;
        toolBarService.getMyTools(userId).then(function (response) {
            $scope.myTools = response;
        });
    };
}]).component('myToolBar', {
    template: require('../../includes/Tool-Bar.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

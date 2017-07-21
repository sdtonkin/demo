var myApp = angular.module('compassionIntranet'),
    controllerName = 'toolbarCtrl';

myApp.controller(controllerName, ['$scope', 'toolBarService', 'COM_CONFIG', function ($scope, toolBarService, COM_CONFIG) {
    this.$onInit = function () {
        
    };
}]).component('myToolBar', {
    template: require('../../includes/Tool-Bar.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

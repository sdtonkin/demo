'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'myAppsCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'appsService', 'COM_CONFIG', function ($scope, common, appsService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;    
    var isToolbarDirty = false;
    
    $scope.$parent.$watch('ctrl', function (newVal, oldVal, scope) {
        ctrl.myTools = newVal.myTools;
        ctrl.myToolsFromDb = newVal.myToolsFromDb;
    });
    this.$onInit = function () {
        ctrl.myTools = $scope.$parent.ctrl.myTools;
    };
}]).component('myApps', {
    template: require('../../includes/My-Apps.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    require: {
        parent: '^myToolbar'
    },
});

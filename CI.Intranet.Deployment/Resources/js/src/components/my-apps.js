'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'myAppsCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'appService', 'COM_CONFIG', function ($scope, common, appService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;    
    var isToolbarDirty = false;
    
    $scope.$parent.$watch('ctrl.myApps', function (newVal, oldVal, scope) {
        ctrl.myApps = newVal;
        ctrl.myAppsFromDb = scope.ctrl.myAppsFromDb;
    });
    this.$onInit = function () {
        ctrl.myApps = $scope.$parent.ctrl.myApps;
    };
}]).component('myApps', {
    template: require('../../includes/My-Apps.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    require: {
        parent: '^myToolbar'
    },
});

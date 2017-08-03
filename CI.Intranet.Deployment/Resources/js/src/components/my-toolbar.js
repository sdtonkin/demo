'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'toolbarCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'modalService', 'appService', 'bookmarkService', 'COM_CONFIG', function ($scope, common, modalService, appService, bookmarkService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;    
    var isToolbarDirty = false;
    ctrl.myTools = [];
    ctrl.myToolsFromDb = [];
    ctrl.toolbarSelectorId = 'ci-toolbar-selector',
        ctrl.toolbarContainerId = 'ci-toolbar-container',
        ctrl.toolbarContentClassName = 'toolbar-content';

    ctrl.selectedTabId = 'ci-apps';
    this.$onInit = function () {
        appService.getMyApps(userId).then(function (response) {
            ctrl.myAppsFromDb = response;
            ctrl.myApps = angular.copy(response);
        });
        bookmarkService.getMyBookmarks(userId).then(function (response) {
            ctrl.myBookmarks = angular.copy(response);
            ctrl.myBookmarksFromDb = response;
        });
    };
    ctrl.select = function (tabId) {
        if (ctrl.selectedTabId === tabId)
            return;
        ctrl.selectedTabId = tabId;
    }

}]).component('myToolbar', {
    template: require('../../includes/Toolbar.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

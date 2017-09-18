'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'toolbarCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'storage', 'modalService', 'appService', 'bookmarkService', 'graphService', 'COM_CONFIG', function ($scope, common, storage, modalService, appService, bookmarkService, graphService, COM_CONFIG) {
    var ctrl = this;
    var selectedTabCacheKey = 'navSelectedTab';
    var userId = _spPageContextInfo.userId;
    var userLoginName = _spPageContextInfo.userLoginName;
    var isToolbarDirty = false;
    ctrl.toolbarSelectorId = 'ci-toolbar-selector',
        ctrl.toolbarContainerId = 'ci-toolbar-container',
        ctrl.toolbarContentClassName = 'toolbar-content';

    
    this.$onInit = function () {
        var selectedTabId = storage.get(selectedTabCacheKey);
        ctrl.selectedTabId =  (selectedTabId == null ? 'ci-apps' : selectedTabId);
        
        appService.getMyAppsByName(userLoginName).then(function (response) {
            ctrl.myAppsFromDb = response;
            ctrl.myApps = angular.copy(response);
            console.log('getMyAppsByName', response);
        });
        bookmarkService.getMyBookmarksByName(userLoginName).then(function (response) {
            ctrl.myBookmarks = angular.copy(response);
            ctrl.myBookmarksFromDb = response;
        });
    };
    ctrl.isSelected = function (tabId) {
        return ctrl.selectedTabId == tabId;
    }
    ctrl.select = function (tabId) {
        storage.set(selectedTabCacheKey, tabId);
        if (ctrl.selectedTabId === tabId)
            return;
        ctrl.selectedTabId = tabId;
    }

}]).component('myToolbar', {
    template: require('../../includes/Toolbar.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

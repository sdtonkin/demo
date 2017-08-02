﻿'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'toolbarManagerCtrl';

myApp.controller(controllerName, ['$scope', '$q', 'common', 'modalService', 'appService', 'bookmarkService', 'COM_CONFIG', function ($scope, $q, common, modalService, appService, bookmarkService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;
    ctrl.isToolbarDirty = false;
    ctrl.manageBookmarkId = 'ci-bookmarks-manage',
        ctrl.confirmDeleteBookmarkId = 'ci-bookmarks-confirm-delete';

    $scope.$parent.$watch('ctrl.myApps', function (newVal, oldVal, scope) {
        if (newVal == null) return;
        ctrl.myApps = newVal;
        ctrl.myAppsFromDb = scope.ctrl.myAppsFromDb;
        getSortOrderLimits();
    });
    $scope.$parent.$watch('ctrl.myBookmarks', function (newVal, oldVal, scope) {
        if (newVal == null) return;
        ctrl.myBookmarks = newVal;
        ctrl.myBookmarksFromDb = scope.ctrl.myBookmarksFromDb;
    });
    ctrl.enableSaveBookmarkButton = enableSaveBookmarkButton;
    ctrl.newBookmark = {};
    ctrl.openModal = openModal;
    ctrl.closeModal = closeModal;
    ctrl.saveMyTools = saveMyTools;
    ctrl.openManageModal = openManageModal;
    ctrl.saveMyAppsSortOrder = saveMyAppsSortOrder;
    ctrl.updateSortOrder = updateSortOrder;
    ctrl.saveMyNewBookmark = saveMyNewBookmark;
    ctrl.saveMyBookmarks = saveMyBookmarks;
    ctrl.removeMyBookmark = removeMyBookmark;
    ctrl.confirmDeletion = confirmDeletion;
    ctrl.enableAddNew = false;
    ctrl.addMyBookmark = function () {
        ctrl.enableAddNew = true;
        $scope.systemMessage = '';
    };
    ctrl.enableSaveButton = function () {
        if (ctrl.isToolbarDirty)
            $scope.systemMessage = '';
        return !ctrl.isToolbarDirty;
    };
    
    this.$onInit = function () {
        ctrl.myApps = $scope.$parent.ctrl.myApps;
        appService.getAllApps().then(function (response) {
            ctrl.allApps = response;
        });
    };
    $scope.myAppsSortList = [];
    $scope.existsAppInMyApps = function (appId) {
        if (!appId) return false;
        var item = _.find(ctrl.myApps, function (i) {
            return i.appId == appId;
        });
        return item != null;
    };
    $scope.toggleSelection = function (id) {
        ctrl.isToolbarDirty = true;
        var item = _.find(ctrl.myApps, function (i) {
            return i.toolId == id;
        });
        if (item == null) {
            var tool = _.find(ctrl.allApps, function (i) {
                return i.id == id;
            });
            tool.toolId = tool.id;
            tool.id = -1;
            ctrl.myApps.push(tool);
        }
        else {
            var currentTools = ctrl.myApps;
            ctrl.myApps = _.without(currentTools, _.findWhere(currentTools, {
                toolId: id
            }));
        }
    };
    function confirmDeletion(bookmark) {
        $scope.bookmarkIdToDelete = bookmark.id;
        closeModal(ctrl.manageBookmarkId);
        openModal(ctrl.confirmDeleteBookmarkId);
    }
    function enableSaveBookmarkButton() {
        var isBookmarkValid = (ctrl.newBookmark.url != null ? common.isUrl(ctrl.newBookmark.url) : false);
        var isTitleValid = false;
        if (ctrl.newBookmark.title)
            isTitleValid = ctrl.newBookmark.title !== '';

        return !(ctrl.isToolbarDirty && (isBookmarkValid && isTitleValid));
    }
    function updateSortOrder(tool, oldOrder) {
        ctrl.isToolbarDirty = true;
        var tools = ctrl.myApps;
        var newOrder = tool.sortOrder;
        if (oldOrder < newOrder) {
            for (var i = oldOrder - 1; i < newOrder; i++) {
                var t = tools[i];
                if (i == oldOrder - 1) {
                    tools[i].sortOrder = tool.sortOrder;
                }
                else if (i == newOrder - 1) {
                    tools[i].sortOrder = t.sortOrder - 1
                }
                else {
                    tools[i].sortOrder = t.sortOrder - 1;
                }
            }
        }
        else if (newOrder < oldOrder) {
            for (var i = newOrder - 1; i < oldOrder; i++) {
                var t = tools[i];
                if (i == newOrder - 1) {
                    tools[i].sortOrder = t.sortOrder + 1;
                }
                else if (i == oldOrder - 1) {
                    tools[i].sortOrder = tool.sortOrder;
                }
                else {
                    tools[i].sortOrder = t.sortOrder + 1;
                }
            }
        }
        ctrl.myApps = _.sortBy(tools, 'sortOrder');
    }
    function saveMyAppsSortOrder() {
        for (var i = 0; i < ctrl.myApps.length; i++) {
            var bk = ctrl.myApps[i];
            appService.updateUserApp(bk);
        }
        ctrl.myAppsFromDb = angular.copy(ctrl.myBookmarks);
        isToolbarDirty = false;
        $scope.systemMessage = 'Success';
    }
    function removeMyBookmark() {
        if (!$scope.bookmarkIdToDelete) {
            return;
        }
        var bookmarkId = $scope.bookmarkIdToDelete;
        bookmarkService.removeMyBookmark(bookmarkId).then(function (response) {
            var myBookmarks = _.filter(ctrl.myBookmarks, function (bk) { return bk.id !== bookmarkId; });
            ctrl.myBookmarks = angular.copy(myBookmarks);
            ctrl.myBookmarksFromDb = myBookmarks;
            $scope.$parent.ctrl.myBookmarks = ctrl.myBookmarks;
            $scope.$parent.ctrl.myBookmarksFromDb = ctrl.myBookmarksFromDb;

            getSortOrderLimits();
            $scope.bookmarkIdToDelete = null;
            closeModal(ctrl.confirmDeleteBookmarkId);
            openModal(ctrl.manageBookmarkId);
            $scope.systemMessage = 'Successfully deleted the bookmark';
        });
    }
    function saveMyNewBookmark() {
        var title = ctrl.newBookmark.title;
        var url = ctrl.newBookmark.url;
        bookmarkService.addMyBookmark(userId, title, url).then(function (data) {
            ctrl.enableAddNew = false;
            ctrl.isToolbarDirty = false;
            ctrl.systemMessage = 'Success adding bookmark';
            /*
            var newBookmark = {};
            newBookmark.title = title;
            newBookmark.url = url;
            newBookmark.id = 
            */
            $scope.$parent.ctrl.myBookmarks.push(data);
            ctrl.newBookmark = null;
        });
        
    }
    function saveMyBookmarks() {
        var promises = [];
        for (var i = 0; i < ctrl.myBookmarks.length; i++)
        {
            var p = bookmarkService.updateUserBookmark(ctrl.myBookmarks[i]);
            promises.push(p);
        }
        $q.all(promises).then(function (response) {
            bookmarkService.getMyBookmarks(userId).then(function (data) {
                ctrl.isToolbarDirty = false;
                $scope.systemMessage = 'Success updating bookmarks';
                $scope.$parent.ctrl.myBookmarks = data;
            });
        });
    }
    function saveMyTools() {
        var tools = ctrl.myApps;
        var dbTools = ctrl.myAppsFromDb;
        var toolsToAdd = _.where(tools, { id: -1 });
        var fullTools = _.filter(tools, function (t) { return t.id != -1; });
        var toolsToDelete = _.difference(fullTools, tools);

        for (var i = 0; i < toolsToAdd.length; i++) {
            var tool = toolsToAdd[i];
            appService.addMyTool(userId, tool.toolId);
        }
        for (var i = 0; i < toolsToDelete.length; i++) {
            var tool = toolsToDelete[i];
            appService.removeMyTool(tool.id);
        }
        appService.getMyTools(userId).then(function (response) {
            ctrl.myAppsFromDb = response;
            ctrl.myApps = angular.copy(response);
            getSortOrderLimits();
            ctrl.isToolbarDirty = false;
            ctrl.systemMessage = 'Success';
        });
    }
    function getSortOrderLimits() {
        if (ctrl.myApps == null) return;
        var myAppsCount = ctrl.myApps.length;
        var response = [];
        for (var i = 1; i <= myAppsCount; i++) {
            response.push(i);
        }
        $scope.myAppsSortList = response;
    }
    function openManageModal() {
        var selectedTablId = $scope.$parent.ctrl.selectedTabId;
        modalService.Open(selectedTablId + '-manage');
    }
    function openModal(id) {
        modalService.Open(id);
    }
    function closeModal(id) {
        modalService.Close(id);
    }
}]).component('toolbarManager', {
    template: require('../../includes/Toolbar-Manager.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    require: {
        parent: '^myToolbar'
    },
});

﻿'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'toolbarManagerCtrl';

myApp.controller(controllerName, ['$scope', '$q', 'common', 'modalService', 'appService', 'bookmarkService', 'COM_CONFIG', function ($scope, $q, common, modalService, appService, bookmarkService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;
    ctrl.isToolbarDirty = false;
    ctrl.isAddNewDirty = false;
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
    $scope.$parent.$watch('ctrl.selectedTabId', function (newVal, oldVal, scope) {
        if (newVal == null) return;
        if (!COM_CONFIG.isProduction) { console.log('selecteed tab id', newVal); }
        ctrl.selectedTabId = newVal;
    });
    ctrl.enableSaveBookmarkButton = enableSaveBookmarkButton;
    ctrl.newBookmark = {};
    ctrl.openModal = openModal;
    ctrl.closeModal = closeModal;
    ctrl.saveMyApps = saveMyApps;
    ctrl.openManageModal = openManageModal;
    ctrl.saveMyAppsSortOrder = saveMyAppsSortOrder;
    ctrl.updateSortOrder = updateSortOrder;
    ctrl.saveMyNewBookmark = saveMyNewBookmark;
    ctrl.saveMyBookmarks = saveMyBookmarks;
    ctrl.removeMyBookmark = removeMyBookmark;
    ctrl.confirmDeletion = confirmDeletion;
    ctrl.enableAddNew = false;
    ctrl.addMyBookmark = function () {
        ctrl.isAddNewDirty = true;
        ctrl.enableAddNew = true;
        $scope.systemMessage = '';
    };
    ctrl.enableSaveButton = function () {
        if (ctrl.isToolbarDirty)
            $scope.systemMessage = '';
        return !ctrl.isToolbarDirty;
    };
    ctrl.enableAddNewButton = function () {
        if (!ctrl.isAddNewDirty)
            $scope.systemMessage = '';
        return ctrl.isAddNewDirty;
    };
    ctrl.enableAddNewSaveButton = function () {
        if (!ctrl.isAddNewDirty)
            $scope.systemMessage = '';
        return !ctrl.isAddNewDirty;
    };
    
    this.$onInit = function () {
        ctrl.myApps = $scope.$parent.ctrl.myApps;
        appService.getAllApps().then(function (response) {
            ctrl.allApps = response;
        });
        ctrl.viewAllDocumentsUrl = ($scope.$parent.ctrl.viewAllDocumentsUrl == null ? '#' : $scope.$parent.ctrl.viewAllDocumentsUrl)
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
            return i.appId == id;
        });
        if (item == null) {
            var app = _.find(ctrl.myAppsFromDb, function (i) {
                return i.appId == id;
            });
            if (app == null) {
                app = _.clone(_.find(ctrl.allApps, function (i) {
                    return i.id == id;
                }));
                app.appId = app.id;
                app.id = -1;
                app.sortOrder = getMaxSortValue() + 1;
            } 
            ctrl.myApps.push(app);
            ctrl.myApps = _.sortBy(ctrl.myApps, 'sortOrder');
            $scope.$parent.ctrl.myApps = ctrl.myApps;
        }
        else {
            var currentTools = ctrl.myApps;
            ctrl.myApps = _.without(currentTools, _.findWhere(currentTools, {
                appId: id
            }));
            $scope.$parent.ctrl.myApps = ctrl.myApps;
        }
    };
    function getMaxSortValue() {
        return _.max($scope.myAppsSortList);
    }
    function confirmDeletion(bookmark) {
        $scope.bookmarkIdToDelete = bookmark.id;
        closeModal(ctrl.manageBookmarkId);
        openModal(ctrl.confirmDeleteBookmarkId);
    }
    function enableSaveBookmarkButton() {
        var isBookmarkValid = (ctrl.newBookmark != null ? common.isUrl(ctrl.newBookmark.url) : false);
        var isTitleValid = false;
        if (ctrl.newBookmark.title)
            isTitleValid = ctrl.newBookmark.title !== '';

        return !(ctrl.isToolbarDirty && (isBookmarkValid && isTitleValid));
    }
    function updateSortOrder(app, oldOrder) {
        ctrl.isToolbarDirty = true;
        var apps = ctrl.myApps;
        var newOrder = app.sortOrder;
        if (oldOrder < newOrder) {
            for (var i = oldOrder - 1; i < newOrder; i++) {
                var t = apps[i];
                if (i == oldOrder - 1) {
                    apps[i].sortOrder = app.sortOrder;
                }
                else if (i == newOrder - 1) {
                    apps[i].sortOrder = t.sortOrder - 1
                }
                else {
                    apps[i].sortOrder = t.sortOrder - 1;
                }
            }
        }
        else if (newOrder < oldOrder) {
            for (var i = newOrder - 1; i < oldOrder; i++) {
                var t = apps[i];
                if (i == newOrder - 1) {
                    apps[i].sortOrder = t.sortOrder + 1;
                }
                else if (i == oldOrder - 1) {
                    apps[i].sortOrder = app.sortOrder;
                }
                else {
                    apps[i].sortOrder = t.sortOrder + 1;
                }
            }
        }
        ctrl.myApps = _.sortBy(apps, 'sortOrder');
    }
    function saveMyAppsSortOrder() {
        for (var i = 0; i < ctrl.myApps.length; i++) {
            var bk = ctrl.myApps[i];
            appService.updateUserApp(bk);
        }
        ctrl.myAppsFromDb = angular.copy(ctrl.myApps);
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
            ctrl.isAddNewDirty = false;
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
        ctrl.isToolbarDirty = false;
        var promises = [];
        for (var i = 0; i < ctrl.myBookmarks.length; i++)
        {
            var p = bookmarkService.updateUserBookmark(ctrl.myBookmarks[i]);
            promises.push(p);
        }
        $q.all(promises).then(function (response) {
            bookmarkService.getMyBookmarks(userId).then(function (data) {                
                $scope.systemMessage = 'Success updating bookmarks';
                $scope.$parent.ctrl.myBookmarks = data;
            });
        });
    }
    function getAppsToDelete(master, apps) {
        var response = [];
        for (var i = 0; i < master.length; i++) {
            var app = master[i];
            var item = _.filter(apps, function (x) { return x.appId == app.appId; });
            if (item.length == 0)
                response.push(app);
        }

        return response;
    }
    function saveMyApps() {
        ctrl.isToolbarDirty = false;
        var apps = ctrl.myApps;
        var dbApps = ctrl.myAppsFromDb;
        var appsToAdd = _.where(apps, { id: -1 });
        //var fullTools = _.filter(apps, function (t) { return t.id != -1; });
        var appsToDelete = getAppsToDelete(dbApps, apps);

        if (apps.length == 0) {
            for (var i = 0; i < ctrl.myAppsFromDb.length; i++) {
                var app = ctrl.myAppsFromDb[i];
                var totalIndex = i;
                appService.removeMyApp(app.id).then(function () {
                    if (totalIndex + 1 == ctrl.myAppsFromDb.length) {
                        appService.getMyApps(userId).then(function (response) {
                            ctrl.parent.myAppsFromDb = response;
                            ctrl.parent.myApps = angular.copy(response);
                            getSortOrderLimits();
                            $scope.systemMessage = 'Success';
                        });
                    }
                });
            }
        } else {
            for (var i = 0; i < appsToAdd.length; i++) {
                var app = appsToAdd[i];
                var addIndex = i;
                appService.addMyApp(userId, app.appId).then(function () {
                    if (addIndex + 1 == appsToAdd.length) {
                        appService.getMyApps(userId).then(function (response) {
                            ctrl.parent.myAppsFromDb = response;
                            ctrl.parent.myApps = angular.copy(response);
                            getSortOrderLimits();
                            $scope.systemMessage = 'Success';
                        });
                    }
                });
            }
            for (var i = 0; i < appsToDelete.length; i++) {
                var app = appsToDelete[i];
                var deleteIndex = i;
                appService.removeMyApp(app.id).then(function () {
                    if (deleteIndex + 1 == appsToDelete.length) {
                        appService.getMyApps(userId).then(function (response) {
                            ctrl.parent.myAppsFromDb = response;
                            ctrl.parent.myApps = angular.copy(response);
                            getSortOrderLimits();
                            $scope.systemMessage = 'Success';
                        });
                    }
                });
            }
        }
    }
    function setUpdateStatus(message) {
        ctrl.isToolbarDirty = false;
        ctrl.systemMessage = message;
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

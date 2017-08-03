'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'bookmarkCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'modalService', 'bookmarkService', 'COM_CONFIG', function ($scope, common, modalService, bookmarkService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;    
    var isDirty = false;

    ctrl.enableSaveButton = function () {
        if (isDirty)
            $scope.systemMessage = '';
        return !isDirty;
    };
    this.$onInit = function () {
        bookmarkService.getMyBookmarks(userId).then(function (response) {
            ctrl.myBookmarks = angular.copy(response);
            ctrl.myBookmarksFromDb = response;
            getSortOrderLimits();
        });        
    };
    $scope.$parent.$watch('ctrl.myBookmarks', function (newVal, oldVal, scope) {
        if (newVal == null) return;
        ctrl.myBookmarks = newVal;
        ctrl.myBookmarksFromDb = scope.ctrl.myBookmarksFromDb;
    });
    /*
    function updateSortOrder(bookmark, oldOrder) {
        isDirty = true;
        var bookmarks = ctrl.myBookmarks;
        var newOrder = bookmark.sortOrder;
        if (oldOrder < newOrder) {
            for (var i = oldOrder - 1; i < newOrder; i++) {
                var t = bookmarks[i];
                if (i == oldOrder - 1) {
                    bookmarks[i].sortOrder = bookmark.sortOrder;
                }
                else if (i == newOrder - 1) {
                    bookmarks[i].sortOrder = t.sortOrder - 1
                }
                else {
                    bookmarks[i].sortOrder = t.sortOrder - 1;
                }
            }
        }
        else if (newOrder < oldOrder) {
            for (var i = newOrder - 1; i < oldOrder; i++) {
                var t = bookmarks[i];
                if (i == newOrder - 1) {
                    bookmarks[i].sortOrder = t.sortOrder + 1;
                }
                else if (i == oldOrder - 1) {
                    bookmarks[i].sortOrder = bookmark.sortOrder;
                }
                else {
                    bookmarks[i].sortOrder = t.sortOrder + 1;
                }
            }
        }
        ctrl.myBookmarks = _.sortBy(bookmarks, 'sortOrder');
    }
    function saveMyBookmarksSortOrder() {
        for (var i = 0; i < ctrl.myBookmarks.length; i++) {
            var bk = $scctrlope.myBookmarks[i];
            bookmarkService.updateUserBookmark(bk);
        }
        ctrl.myBookmarksFromDb = angular.copy(ctrl.myBookmarks);
        isDirty = false;
        $scope.systemMessage = 'Success';
    }
    
    function saveMyBookmarks() {
        var bookmarks = ctrl.myBookmarks;
        var dbBookmarks = ctrl.myBookmarksFromDb;
        var bookmarksToAdd = _.where(bookmarks, { id: -1 });
        var fullBookmarks = _.filter(bookmarks, function (t) { return t.id != -1; });
        var bookmarksToDelete = _.difference(fullBookmarks, bookmarks);

        for (var i = 0; i < bookmarksToAdd.length; i++) {
            var bk = bookmarksToAdd[i];
            bookmarkService.addMyBookmark(bk);
        }
        for (var i = 0; i < bookmarksToDelete.length; i++) {
            var bk = bookmarksToDelete[i];
            bookmarkService.removeMyBookmark(bk.id);
        }
        bookmarkService.getMyBookmarks(userId).then(function (response) {
            ctrl.myBookmarks = response;
            ctrl.myBookmarksFromDb = angular.copy(response);
            getSortOrderLimits();
            isDirty = false;
            $scope.systemMessage = 'Success';
        });
    }
    */
    function getSortOrderLimits() {
        var count = ctrl.myBookmarks.length;
        var response = [];
        for (var i = 1; i <= count; i++) {
            response.push(i);
        }
        $scope.myBookmarksSortList = response;
    }
    /*
    function openModal(id) {
        modalService.Open(id);
    }
    function closeModal(id) {
        modalService.Close(id);
    }
    */
}]).component('myBookmarks', {
    template: require('../../includes/My-Bookmarks.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'bookmarkCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'modalService', 'bookmarkService', 'COM_CONFIG', function ($scope, common, modalService, bookmarkService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;    
    var isDirty = false;

    ctrl.openModal = openModal;
    ctrl.closeModal = closeModal;
    ctrl.saveMyBookmarks = saveMyBookmarks;
    ctrl.removeMyBookmark = removeMyBookmark;
    ctrl.enableSaveButton = function () {
        if (isDirty)
            $scope.systemMessage = '';
        return !isDirty;
    };
    ctrl.updateSortOrder = updateSortOrder;
    this.$onInit = function () {
        bookmarkService.getMyBookmarks(userId).then(function (response) {
            $scope.myBookmarks = angular.copy(response);
            $scope.myBookmarksFromDb = response;
            getSortOrderLimits();
        });        
    };
    function updateSortOrder(bookmark, oldOrder) {
        isDirty = true;
        var bookmarks = $scope.myBookmarks;
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
        $scope.myBookmarks = _.sortBy(bookmarks, 'sortOrder');
    }
    function saveMyBookmarksSortOrder() {
        for (var i = 0; i < $scope.myBookmarks.length; i++) {
            var bk = $scope.myBookmarks[i];
            bookmarkService.updateUserBookmark(bk);
        }
        $scope.myBookmarksFromDb = angular.copy($scope.myBookmarks);
        isDirty = false;
        $scope.systemMessage = 'Success';
    }
    function removeMyBookmark(bookmark) {
        bookmarkService.removeMyBookmark(bookmark.id).then(function (response) {
            console.log(response);
            $scope.myBookmarks = angular.copy(response);
            $scope.myBookmarksFromDb = response;
            getSortOrderLimits();
        });
    }
    function saveMyBookmarks() {
        var bookmarks = $scope.myBookmarks;
        var dbBookmarks = $scope.myBookmarksFromDb;
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
            $scope.myBookmarks = response;
            $scope.myBookmarksFromDb = angular.copy(response);
            getSortOrderLimits();
            isDirty = false;
            $scope.systemMessage = 'Success';
        });
    }
    function getSortOrderLimits() {
        var count = $scope.myBookmarks.length;
        var response = [];
        for (var i = 1; i <= count; i++) {
            response.push(i);
        }
        $scope.myBookmarksSortList = response;
    }
    function openModal(id) {
        modalService.Open(id);
    }
    function closeModal(id) {
        modalService.Close(id);
    }
}]).component('myBookmarks', {
    template: require('../../includes/My-Bookmarks.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});

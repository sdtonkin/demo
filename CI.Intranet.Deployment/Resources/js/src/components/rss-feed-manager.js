'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'rssFeedManagerCtrl';

myApp.controller(controllerName, ['$scope', '$q', 'common', 'modalService', 'rssFeedService', 'COM_CONFIG', function ($scope, $q, common, modalService, rssFeedService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;
    ctrl.isToolbarDirty = false;
    ctrl.manageBookmarkId = 'ci-rss-feed-manage';

    ctrl.existsFeedInMyFeeds = existsFeedInMyFeeds;
    ctrl.saveMyFeeds = saveMyFeeds;
    ctrl.enableSaveButton = enableSaveButton;
    ctrl.openManageModal = openManageModal;
    ctrl.closeModal = closeModal;

    $scope.$parent.$watch('ctrl.myFeeds', function (newVal, oldVal, scope) {
        if (newVal == null) return;
        ctrl.myFeeds = newVal;
        ctrl.myFeedsFromDb = angular.copy(newVal);
    });
    $scope.$parent.$watch('ctrl.showManager', function (newVal, oldVal, scope) {
        if (newVal != true) return;
        openManageModal();
    });
    this.$onInit = function () {
        rssFeedService.getAllRssFeeds().then(function (response) {
            ctrl.allFeeds = response;
        });
    };
    $scope.toggleSelection = function (id) {
        ctrl.isToolbarDirty = true;
        var item = _.find(ctrl.myFeeds, function (i) {
            return i.feedId == id;
        });
        if (item == null) {
            var feed = _.find(ctrl.myFeedsFromDb, function (i) {
                return i.feedId == id;
            });
            if (feed == null) {
                feed = _.find(ctrl.allFeeds, function (i) {
                    return i.id == id;
                });
                feed.feedId = feed.id;
                feed.id = -1;
            }
            
            ctrl.myFeeds.push(feed);
            ctrl.myFeeds = _.sortBy(ctrl.myFeeds, 'sortOrder');
        }
        else {
            var currentFeeds = ctrl.myFeeds;
            ctrl.myFeeds = _.reject(currentFeeds, function (f) {
                return f.id == item.id;
            });
        }
    };
    function saveMyFeeds() {
        ctrl.isToolbarDirty = true;
        var feeds = ctrl.myFeeds;
        var dbFeeds = ctrl.myFeedsFromDb;
        var feedsToAdd = _.where(feeds, { id: -1 });
        var feedsToDelete;
        if (feeds.length == 0) {
            feedsToDelete = dbFeeds;
        } else {
            feedsToDelete = _.filter(dbFeeds, function (a) {
                return !_.findWhere(feeds, { id: a.id });
            });
        }
        var promises = [];
        for (var i = 0; i < feedsToAdd.length; i++) {
            var feed = feedsToAdd[i];
            promises.push(rssFeedService.addMyFeed(userId, feed.feedId));
        }
        for (var i = 0; i < feedsToDelete.length; i++) {
            var feed = feedsToDelete[i];
            promises.push(rssFeedService.removeMyFeed(feed.id));
        }
        $q.all(promises).then(function (response) {
            rssFeedService.getMyRssFeeds(userId, $scope.$parent.ctrl.articleLimit).then(function (feeds) {
                $scope.$parent.ctrl.myFeeds = angular.copy(feeds);
                ctrl.isToolbarDirty = false;
                ctrl.systemMessage = 'Success';
            });
        });
    }
    function enableSaveButton() {
        return !ctrl.isToolbarDirty;
    }
    function openManageModal() {
        modalService.Open(ctrl.manageBookmarkId);
    }
    function closeModal(id) {
        modalService.Close(id);
    }
    function existsFeedInMyFeeds(feedId) {
        if (!feedId) return false;
        var item = _.find(ctrl.myFeeds, function (i) {
            return i.feedId == feedId;
        });
        return item != null;
    }
}]).component('rssFeedManager', {
    template: require('../../includes/RSS-Feed-Manager.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    require: {
        parent: '^myRssFeeds'
    },
});

'use strict';
var serviceName = 'bookmarkService';
angular.module('compassionIntranet').service(serviceName, ['$http', '$q', 'COM_CONFIG', 'storage', 'common', function ($http, $q, COM_CONFIG, storage, common) {
    var ctrl = this;
    var store = _.find(COM_CONFIG.storage, function (s) {
        return s.service = serviceName;
    });

    var userBookmarkKey = store.key;

    // clear local storage if url param is detected
    common.checkForClearStatement(store.clearCommand, userBookmarkKey);
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    // set default expiration at 24 hours
    ctrl.expirationDuration = store.expire;
    ctrl.getMyBookmarks = function (userId) {
        var defer = $q.defer();
        getUserBookmarkItems(userId).then(function (bookmarks) {
            var bks = [];
            for (var i = 0; i < bookmarks.length; i++) {
                var b = bookmarks[i];
                var bk = {};
                bk.id = b.Id;
                bk.title = b.Title;
                bk.url = b.COM_BookmarkUrl;
                bk.userId = b.COM_ToolbarUserId;
                bks.push(bk);
            }
            defer.resolve(bks);
        });
        return defer.promise;
    };
    ctrl.getMyBookmarksByName = function (userName) {
        var defer = $q.defer();
        getUserBookmarkItemsByName(userName).then(function (bookmarks) {
            var bks = [];
            for (var i = 0; i < bookmarks.length; i++) {
                var b = bookmarks[i];
                var bk = {};
                bk.id = b.Id;
                bk.title = b.Title;
                bk.url = b.COM_BookmarkUrl;
                bk.userId = b.COM_ToolbarUserId;
                bks.push(bk);
            }
            defer.resolve(bks);
        });
        return defer.promise;
    };
    ctrl.addMyBookmark = function (userId, pageId, url, siteUrl) {
        var defer = $q.defer();
        addUserBookmark(userId, pageId, url, siteUrl).then(function (bookmark) {
            storage.remove(userBookmarkKey);
            defer.resolve(bookmark);
        });
        return defer.promise;
    };
    ctrl.updateUserBookmark = function (userTool) {
        var defer = $q.defer();
        updateUserTool(userTool).then(function (data) {
            storage.remove(userBookmarkKey);
            defer.resolve(data);
        });
        return defer.promise;
    };
    ctrl.removeMyBookmark = function (id) {
        var defer = $q.defer();
        deleteUserTool(id).then(function (tools) {
            storage.remove(userBookmarkKey);
            defer.resolve(tools);
        });
        return defer.promise;
    };
    function getUserBookmarkItems(userId) {
        var defer = $q.defer();
        var local = storage.get(userBookmarkKey);
        if (local == null) {
            local = {};
            local.isExpired = true;
        }
        if (!local.isExpired)
            defer.resolve(local);
        else {
            let web = new $pnp.Web(COM_CONFIG.rootWeb);
            web.lists.getByTitle(COM_CONFIG.lists.userBookmarks).items
                .filter("COM_ToolbarUser eq '" + userId + "'")
                .get()
                .then(function (data) {
                    defer.resolve(data);
                });
        }
        return defer.promise;
    }
    function getUserBookmarkItemsByName(userName) {
        var defer = $q.defer();
        var local = storage.get(userBookmarkKey);
        if (local == null) {
            local = {};
            local.isExpired = true;
        }
        if (!local.isExpired)
            defer.resolve(local);
        else {
            let web = new $pnp.Web(COM_CONFIG.rootWeb);
            web.lists.getByTitle(COM_CONFIG.lists.userBookmarks).items
                .select('Id','COM_ToolbarUser/SipAddress', 'Title', 'COM_BookmarkUrl', 'COM_ListSortOrder')
                .filter("COM_ToolbarUser/SipAddress eq '" + userName + "'")
                .expand('COM_ToolbarUser')
                .get()
                .then(function (data) {
                    data.map(function (item) {
                        if (item.Title)
                            item.title = item.Title;
                        if (item.COM_BookmarkUrl)
                            item.url = item.COM_BookmarkUrl;
                    });
                    console.log('getUserBookmarkItemsByName', data);
                    defer.resolve(data);
                });
        }

        return defer.promise;
    }
    function addUserBookmark(userId, pageId, url, siteUrl) {
        var defer = $q.defer();
        if (siteUrl == null) {
            let web = new $pnp.Web(COM_CONFIG.rootWeb);
            web.lists.getByTitle(COM_CONFIG.lists.userBookmarks).items
                .add({
                    COM_ToolbarUserId: userId,
                    COM_BookmarkUrl: url,
                    Title: pageId
                })
                .then(function (item) {
                    var bk = {};
                    bk.id = item.data.Id;
                    bk.title = item.data.Title;
                    bk.url = item.data.COM_BookmarkUrl;
                    bk.userId = item.data.COM_ToolbarUserId;
                    defer.resolve(bk);
                });
        } else {
            getPage(pageId, siteUrl).then(function (item) {
                let web = new $pnp.Web(COM_CONFIG.rootWeb);
                web.lists.getByTitle(COM_CONFIG.lists.userBookmarks).items
                    .add({
                        COM_ToolbarUserId: userId,
                        COM_BookmarkUrl: url,
                        Title: item.Title
                    })
                    .then(function (item) {
                        var bk = {};
                        bk.id = item.data.Id;
                        bk.title = item.data.Title;
                        bk.url = item.data.COM_BookmarkUrl;
                        bk.userId = item.data.COM_ToolbarUserId;
                        defer.resolve(bk);
                    });
            });
        }
        

        return defer.promise;
    }
    function getPage(pageId, siteUrl) {
        var defer = $q.defer();
        let web = new $pnp.Web(siteUrl);
        web.lists.getByTitle('Pages').items
            .select('Title')
            .getById(pageId)
            .get()
            .then(function (item) {                
                defer.resolve(item);
            });

        return defer.promise;
    }
    function updateUserTool(userBookmark) {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        $pnp.sp.web.lists.getByTitle(COM_CONFIG.lists.userBookmarks).items.getById(userBookmark.id).update({
            COM_ToolbarUserId: userBookmark.userId,
            COM_BookmarkUrl: userBookmark.url,
            Title: userBookmark.title
        }).then(r => {
            defer.resolve(r);
        });
        return defer.promise;
    }
    function deleteUserTool(userBookmarkId) {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.userBookmarks).items
            .getById(userBookmarkId)
            .delete()
            .then(function (item) {
                defer.resolve(true);
            });
        return defer.promise;
    }
    function formatAppTools(apps) {
        var nullSortOrder = (_.findIndex(apps, function (a) { return a.sortOrder == null; }) != -1);
        for (var i = 0; i < apps.length; i++) {
            var app = apps[i];
            if (app.sortOrder == null) {
                nullSortOrder = true;
                apps[i].sortOrder = i + 1;
            } else if (nullSortOrder)
                apps[i].sortOrder = i + 1;
        }
        return _.sortBy(apps, 'sortOrder');
    }
}]);
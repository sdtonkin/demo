'use strict';
var serviceName = 'appService';
angular.module('compassionIntranet').service(serviceName, ['$http', '$q', 'COM_CONFIG', 'storage', 'common', function ($http, $q, COM_CONFIG, storage, common) {
    var ctrl = this;
    var store = _.find(COM_CONFIG.storage, function (s) {
        return s.service = serviceName;
    });
    var userAppsKey = store.key;
    ctrl.expirationDuration = store.expire;
    
    // clear local storage if url param is detected
    common.checkForClearStatement(store.clearCommand, userAppsKey);
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();
    
    ctrl.getMyApps = function (userId) {
        var defer = $q.defer();
        getUserAppItems(userId).then(function (apps) {
            defer.resolve(apps);
        });
        return defer.promise;
    };
    ctrl.getMyAppsByName = function (userName) {
        var defer = $q.defer();
        getUserAppItemsByName(userName).then(function (apps) {
            defer.resolve(apps);
        });
        return defer.promise;
    };
    ctrl.getAllApps = function () {
        var defer = $q.defer();
        getApps().then(function (apps) {
            defer.resolve(apps);
        });
        return defer.promise;
    };
    ctrl.addMyApp = function (userId, appId) {
        var defer = $q.defer();
        addUserApp(userId, appId).then(function (apps) {
            storage.remove(userAppsKey);
            defer.resolve(apps);
        });
        return defer.promise;
    };
    ctrl.updateUserApp = function (userApp) {
        var defer = $q.defer();
        updateUserApp(userApp).then(function (data) {
            storage.remove(userAppsKey);
            defer.resolve(data);
        });
        return defer.promise;
    };
    ctrl.removeMyApp = function (id) {
        var defer = $q.defer();
        deleteUserApp(id).then(function (apps) {
            storage.remove(userAppsKey);
            defer.resolve(apps);
        });
        return defer.promise;
    };
    function getUserAppItems(userId) {
        var defer = $q.defer();        
        var local = storage.get(userAppsKey);
        if (local == null) {
            local = {};
            local.isExpired = true;
        }   
        if(!local.isExpired)
            defer.resolve(local);
        else {
            let web = new $pnp.Web(COM_CONFIG.rootWeb);
            web.lists.getByTitle(COM_CONFIG.lists.userApps).items
                .filter("COM_ToolbarUser eq '" + userId + "'")
                .get()
                .then(function(data){
                    var promises = new Array();
                    for(var i = 0; data.length > i; i++)
                    {
                        var p = getUserApp(data[i]);
                        promises.push(p)
                    }
                    $q.all(promises).then(function(response){
                        response = formatAppApps(response);
                        storage.set(userAppsKey, response, 0);
                        defer.resolve(response);
                    });                
                });
        }

        return defer.promise;
    }
    function getUserAppItemsByName(userName) {
        var defer = $q.defer();
        var local = storage.get(userAppsKey);
        if (local == null) {
            local = {};
            local.isExpired = true;
        }
        if (!local.isExpired)
            defer.resolve(local);
        else {
            let web = new $pnp.Web(COM_CONFIG.rootWeb);
            web.lists.getByTitle(COM_CONFIG.lists.userApps).items
                .select('COM_ToolbarUser/SipAddress', 'Title', 'COM_UserToolbarId','COM_ListSortOrder', 'ID')
                .filter("COM_ToolbarUser/SipAddress eq '" + userName + "'")
                .expand('COM_ToolbarUser')
                .get()
                .then(function (data) {
                    var promises = new Array();
                    for (var i = 0; data.length > i; i++) {
                        var p = getUserApp(data[i]);
                        promises.push(p)
                    }
                    $q.all(promises).then(function (response) {
                        response = formatAppApps(response);
                        storage.set(userAppsKey, response, 0);
                        defer.resolve(response);
                    });
                });
        }

        return defer.promise;
    }
    function getUserApp(userApp) {
        var defer = $q.defer();
        getApp(userApp.COM_UserToolbarId).then(function(t){
            t.appId = t.id;
            t.id = userApp.Id;
            t.sortOrder = userApp.COM_ListSortOrder;
            defer.resolve(t);
        });
        return defer.promise;
    }
    function getApp(appId) {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.toolbarApps).items
            .getById(appId)
            .get()
            .then(function (item) {
                var iconUrl = (item.COM_ToolbarIconUrl == null ? '' : item.COM_ToolbarIconUrl.Url);
                var f = {};
                f.id = item.Id;
                f.title = item.Title;
                f.url = item.COM_ToolbarUrl.Url;
                f.iconUrl = iconUrl + (iconUrl.indexOf('?') != -1 ? '&' : '?') + 'RenditionId=6';
                f.sortOrder = item.COM_ListSortOrder;
                defer.resolve(f); 
            });

        return defer.promise;
    }
    function getApps() {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.toolbarApps).items
            .get()
            .then(function(items){ 
                var apps = [];
                for(var i = 0; items.length > i; i++)
                {
                    var item = items[i];
                    var t = {};
                    t.id = item.Id;
                    t.title = item.Title;
                    t.url = item.COM_ToolbarUrl.Url;
                    t.iconUrl = item.COM_ToolbarIconUrl.Url;
                    t.sortOrder = item.COM_ListSortOrder;

                    apps.push(t);
                }                
                defer.resolve(apps); 
            });

        return defer.promise;
    }
    function addUserApp(userId, appId) {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.userApps).items
            .add({
                COM_ToolbarUserId: userId,
                COM_UserToolbarId: appId
            })
            .then(function(item){ 
                defer.resolve(item.Id);
            });

        return defer.promise;
    }
    function updateUserApp(userApp) {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        $pnp.sp.web.lists.getByTitle(COM_CONFIG.lists.userApps).items.getById(userApp.id).update({
            COM_ListSortOrder: userApp.sortOrder
        }).then(r => {
            defer.resolve(r);
        });
        return defer.promise;
    }
    function deleteUserApp(userAppId) {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.userApps).items
            .getById(userAppId)
            .delete()
            .then(function(item){ 
                defer.resolve(true);
            });

        return defer.promise;
    }
    
    function formatAppApps(apps) {
        var nullSortOrder = (_.findIndex(apps, function(a){ return a.sortOrder == null; }) != -1);
        for(var i = 0; i < apps.length; i++) {
            var app = apps[i];

            
            if (app.sortOrder == null) {
                nullSortOrder = true;
                apps[i].sortOrder = i + 1;
            } else if (nullSortOrder)
                apps[i].sortOrder = i + 1;
        }
        var response = _.sortBy(apps, 'sortOrder');
        if (response == null || response.length == 0) return response;
        if (response[0].sortOrder != 1) {
            for (var i = 0; i < response.length; i++) {
                response[i].sortOrder = i + 1;
            }
        }
        return response;
    }
}]);
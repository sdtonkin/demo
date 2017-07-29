import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js/lib/sharepoint/webs";
'use strict';
angular.module('compassionIntranet').service('bookmarkService', ['$http', '$q', 'COM_CONFIG', 'storage','common', function ($http, $q, COM_CONFIG, storage, common) {
    var ctrl = this;
    var userbookmarkKey = 'F6FC1D32-0D5B-4FA3-A283-4F0839B34FF8' + _spPageContextInfo.userId;    
    
    // clear local storage if url param is detected
    checkForClearStatement();
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();  

    // set default expiration at 24 hours
    ctrl.expirationDuration = 24;
    ctrl.getMyTools = function (userId) {
        var defer = $q.defer();
        getUserToolItems(userId).then(function (tools) {
            defer.resolve(tools);
        });
        return defer.promise;
    };
    ctrl.getAllTools = function () {
        var defer = $q.defer();
        getTools().then(function (tools) {
            defer.resolve(tools);
        });
        return defer.promise;
    };
    ctrl.addMyTool = function (userId, toolId) {
        var defer = $q.defer();
        addUserTool(userId, toolId).then(function (tools) {
            storage.remove(userToolsKey);
            defer.resolve(tools);
        });
        return defer.promise;
    };
    ctrl.updateUserTool = function (userTool) {
        var defer = $q.defer();
        updateUserTool(userTool).then(function (data) {
            storage.remove(userToolsKey);
            defer.resolve(data);
        });
        return defer.promise;
    };
    ctrl.removeMyTool = function (id) {
        var defer = $q.defer();
        deleteUserTool(id).then(function (tools) {
            storage.remove(userToolsKey);
            defer.resolve(tools);
        });
        return defer.promise;
    };
    function getUserToolItems(userId) {
        var defer = $q.defer();        
        var local = storage.get(userToolsKey);
        if (local == null) {
            local = {};
            local.isExpired = true;
        }   
        if(!local.isExpired)
            defer.resolve(local);
        else {
            let web = new Web(COM_CONFIG.rootWeb);
            web.lists.getByTitle(COM_CONFIG.lists.userTools).items
                .filter("COM_ToolbarUser eq '" + userId + "'")
                .get()
                .then(function(data){
                    var promises = new Array();
                    for(var i = 0; data.length > i; i++)
                    {
                        var p = getUserTool(data[i]);
                        promises.push(p)
                    }
                    $q.all(promises).then(function(response){
                        response = formatAppTools(response);
                        storage.set(userToolsKey, response, 0);
                        defer.resolve(response);
                    });                
                });
        }

        return defer.promise;
    }
    function getUserTool(userTool) {
        var defer = $q.defer();
        getTool(userTool.COM_UserToolbarId).then(function(t){
            t.toolId = t.id;
            t.id = userTool.Id;
            t.sortOrder = userTool.COM_ListSortOrder;
            defer.resolve(t);
        });
        return defer.promise;
    }
    function getTool(toolId) {
        var defer = $q.defer();
        let web = new Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.toolbarTools).items
            .getById(toolId)
            .get()
            .then(function(item){ 
                var f = {};
                f.id = item.Id;
                f.title = item.Title;
                f.url = item.COM_ToolbarUrl.Url;
                f.iconUrl = item.COM_ToolbarIconUrl.Url;
                f.sortOrder = item.COM_ListSortOrder;
                defer.resolve(f); 
            });

        return defer.promise;
    }
    function getTools() {
        var defer = $q.defer();
        let web = new Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.toolbarTools).items
            .get()
            .then(function(items){ 
                var tools = [];
                for(var i = 0; items.length > i; i++)
                {
                    var item = items[i];
                    var t = {};
                    t.id = item.Id;
                    t.title = item.Title;
                    t.url = item.COM_ToolbarUrl.Url;
                    t.iconUrl = item.COM_ToolbarIconUrl.Url;
                    t.sortOrder = item.COM_ListSortOrder;

                    tools.push(t);
                }                
                defer.resolve(tools); 
            });

        return defer.promise;
    }
    function addUserTool(userId, toolId) {
        var defer = $q.defer();
        let web = new Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.userTools).items
            .add({
                COM_ToolbarUserId: userId,
                COM_UserToolbarId: toolId
            })
            .then(function(item){ 
                defer.resolve(item.Id);
            });

        return defer.promise;
    }
    function updateUserTool(userTool) {
        var defer = $q.defer();
        let web = new Web(COM_CONFIG.rootWeb);
        pnp.sp.web.lists.getByTitle(COM_CONFIG.lists.userTools).items.getById(userTool.id).update({
            COM_ListSortOrder: userTool.sortOrder
        }).then(r => {
            defer.resolve(r);
        });
        return defer.promise;
    }
    function deleteUserTool(userToolId) {
        var defer = $q.defer();
        let web = new Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.userTools).items
            .getById(userToolId)
            .delete()
            .then(function(item){ 
                defer.resolve(true);
            });

        return defer.promise;
    }
    function checkForClearStatement() {
        if (common.getUrlParamByName('clearMyTools') == 'true')
            storage.remove(userToolsKey);
    }
    function formatAppTools(apps) {
        var nullSortOrder = (_.findIndex(apps, function(a){ return a.sortOrder == null; }) != -1);
        for(var i = 0; i < apps.length; i++) {
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
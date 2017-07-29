import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js/lib/sharepoint/webs";
'use strict';
angular.module('compassionIntranet').service('toolBarService', ['$http', '$q', 'COM_CONFIG', 'storage', function ($http, $q, COM_CONFIG, storage) {
    var ctrl = this;
    var userToolsKey = 'F6FC1D32-0D5B-4FA3-A283-4F0839B34FF8';
    var toolsKey = '01E261B8-5FB3-41B0-99E6-B1206A9EB65E';

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
                        var p = getUserTool(data[i].Id, data[i].COM_UserToolbarId);
                        promises.push(p)
                    }
                    $q.all(promises).then(function(response){
                        storage.set(userToolsKey, response, 0);
                        defer.resolve(response);
                    });                
                });
        }

        return defer.promise;
    }
    function getUserTool(userToolId, toolId) {
        var defer = $q.defer();
        getTool(toolId).then(function(tool){
            tool.toolId = toolId;
            tool.id = userToolId;
            defer.resolve(tool);
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
}]);
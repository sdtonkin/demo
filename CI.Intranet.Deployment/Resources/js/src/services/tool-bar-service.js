import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js/lib/sharepoint/webs";

angular.module('compassionIntranet').service('toolBarService', ['$http', '$q', 'COM_CONFIG', function ($http, $q, COM_CONFIG) {
    function getUserToolItems(userId) {
        var defer = $q.defer();
        let web = new Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.userTools).items
            .filter("COM_ToolbarUser eq '" + userId + "'")
            .get()
            .then(function(data){
                var promises = new Array();
                for(var i = 0; data.length > i; i++)
                {
                    var p = getTool(data[i].Id);
                    promises.push(p)
                }
                $q.all(promises).then(function(response){
                    defer.resolve(response);
                });                
            });

        return defer.promise;
    }
    function getTool(toolId) {
        var defer = $q.defer();
        let web = new Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.toolbarTools).items
            .getById(id)
            .get()
            .then(function(item){ 
                var f = {};
                f.title = item.Title;
                f.url = item.COM_ToolbarUrl.Url;
                f.iconUrl = item.COM_ToolbarIconUrl;
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
                    t.title = item.Title;
                    t.url = item.COM_ToolbarUrl.Url;
                    t.iconUrl = item.COM_ToolbarIconUrl;

                    tools.push(t);
                }                
                defer.resolve(f); 
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
    this.getMyTools = function (userId) {
        var defer = $q.defer();
        getUserToolItems(userId).then(function (tools) {
            defer.resolve(tools);
        });
        return defer.promise;
    };
    this.getAllTools = function () {
        var defer = $q.defer();
        getTools().then(function (tools) {
            defer.resolve(tools);
        });
        return defer.promise;
    };
}]);
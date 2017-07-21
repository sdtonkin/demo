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
    this.getMyTools = function (userId) {
        var defer = $q.defer();
        

        return defer.promise;
    };
    this.getAllTools = function () {
        var defer = $q.defer();
        

        return defer.promise;
    };
}]);
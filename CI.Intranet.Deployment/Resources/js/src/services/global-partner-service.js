'use strict';
angular.module('compassionIntranet').service('globalPartnerService', ['$http', '$q', 'COM_CONFIG', 'storage','common', function ($http, $q, COM_CONFIG, storage, common) {
    var ctrl = this;
    var globalPartnerKey = 'DB61A9E9-6805-4388-8271-4C2F8BB48EF9';
    
    // clear local storage if url param is detected
    common.checkForClearStatement('clearGlobalPartners', globalPartnerKey);
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();  

    // set default expiration at 0 hours
    ctrl.expirationDuration = 0;
    ctrl.getGlobalPartners = function () {
        var defer = $q.defer();
        getGlobalPartners().then(function (partners) {
            defer.resolve(partners);
        });
        return defer.promise;
    };
    function getGlobalPartners() {
        var defer = $q.defer();        
        var local = storage.get(globalPartnerKey);
        if (local == null) {
            local = {};
            local.isExpired = true;
        }   
        if(!local.isExpired)
            defer.resolve(local);
        else {
            let web = new $pnp.Web(COM_CONFIG.rootWeb);
            web.lists.getByTitle(COM_CONFIG.lists.globalPartners).items
                .get()
                .then(function(data){
                    var partners = data;
                    var response = [];
                    for (var i = 0; i < partners.length; i++) {
                        var d = partners[i];
                        var p = {};
                        p.title = d.Title;
                        p.iconUrl = (d.COM_ToolbarIconUrl != null ? d.COM_ToolbarIconUrl.Url : '');
                        p.siteUrl = (d.COM_LinkUrl != null ? d.COM_LinkUrl.Url : '');
                        response.push(p);
                    }
                    defer.resolve(response);
                });
        }

        return defer.promise;
    }
    
}]);
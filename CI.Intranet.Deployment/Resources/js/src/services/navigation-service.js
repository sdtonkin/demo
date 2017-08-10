'use strict';
angular.module('compassionIntranet').service('navigationService', ['$http', '$q', 'COM_CONFIG', 'common', 'storage', function ($http, $q, COM_CONFIG, common, storage) {
    var ctrl = this;
    var navKey = 'DE783DB7-A21E-4372-BB64-B193DEB85CD3';
    var delveUrl = '';
    // clear local storage if url param is detected
    common.checkForClearStatement('clearNavNodes', navKey);

    // set default expiration at 0 hours
    ctrl.expirationDuration = 0;
    ctrl.getAllNodes = function () {
        var defer = $q.defer();
        var local = storage.get(navKey);
        if (local == null) {
            local = {};
            local.isExpired = true;
        }
        if (!local.isExpired)
            defer.resolve(local);
        else {
            defer.resolve(getNavigationNodes());
        }

        return defer.promise;
    };
    function getNavigationNodes() {
        // ensure Promise for pnp is loaded prior to using pnp module
        ES6Promise.polyfill();
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.navigation).items
            .get()
            .then(function (data) {
                var nodes = [];
                for (var i = 0; i < data.length; i++) {
                    var node = {};
                    var n = data[i];
                    node.url = n.COM_NavNodeUrl.Url;
                    node.title = n.Title;
                    nodes.push(node);
                }
                storage.set(navKey, nodes, 0);
                defer.resolve(nodes);
            });

        return defer.promise;
    }
    
}]);